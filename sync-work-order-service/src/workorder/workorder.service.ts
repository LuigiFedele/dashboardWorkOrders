import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WorkOrderService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async syncAllWorkOrders() {
    let cursor = 0;
    let finished = false;

    while (!finished) {
      try {
        const response = await axios.get(process.env['API-Base-URL']!, {
          headers: {
            'x-api-key': process.env['X-API-Key']!,
            'tenant': process.env['X-Tenant']!,
            'organization': process.env['X-Organization']!,
            'cursorposition': cursor.toString(),
          },
        });

        const data = response.data?.Result?.ResultData;
        const records = data?.DATARECORD || [];

        for (const item of records) {
          const jobNum = item.WORKORDERID?.JOBNUM ?? null;
          const organizationCode = item.WORKORDERID?.ORGANIZATIONID?.ORGANIZATIONCODE ?? null;
          const workOrderDescription = item.WORKORDERID?.DESCRIPTION ?? null;
          const statusCode = item.STATUS?.STATUSCODE ?? null;
          const equipamentCode = item.EQUIPMENTID?.EQUIPMENTCODE ?? null;
          const equipamentDescription = item.EQUIPMENTID?.DESCRIPTION ?? null;
          const departmentCode = item.DEPARTMENTID?.DEPARTMENTCODE ?? null;
          const classCode = item.CLASSID?.CLASSCODE ?? null;
          const problemCode = item.PROBLEMCODEID?.PROBLEMCODE ?? null;
          const schedgroupCode = item.SCHEDGROUP ?? null;
          const assignedToPersonCode = item.ASSIGNEDTO?.PERSONCODE ?? null;
          const assignedToPersonName = item.ASSIGNEDTO?.DESCRIPTION ?? null;

          if (!jobNum) continue;

          try {
            await this.prisma.workOrder.upsert({
              where: { jobNum },
              update: {
                organizationCode,
                workOrderDescription,
                statusCode,
                equipamentCode,
                equipamentDescription,
                departmentCode,
                classCode,
                problemCode,
                schedgroupCode,
                assignedToPersonCode,
                assignedToPersonName,
              },
              create: {
                jobNum,
                organizationCode,
                workOrderDescription,
                statusCode,
                equipamentCode,
                equipamentDescription,
                departmentCode,
                classCode,
                problemCode,
                schedgroupCode,
                assignedToPersonCode,
                assignedToPersonName,
              },
            });
          } catch (dbError) {
            console.error('Erro ao salvar no banco:', dbError, item);
          }
        }

        cursor = data.NEXTCURSORPOSITION;
        if (!cursor || records.length === 0) finished = true;
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        finished = true;
      }
    }
  }

  async getAllWorkOrders() {
    return this.prisma.workOrder.findMany();
  }
}