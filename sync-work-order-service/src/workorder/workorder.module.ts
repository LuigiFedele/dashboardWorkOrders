import { Module } from '@nestjs/common';
import { WorkOrderService } from './workorder.service';
import { WorkOrderController } from './workorder.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WorkOrderController],
  providers: [WorkOrderService, PrismaService],
})
export class WorkOrderModule {}