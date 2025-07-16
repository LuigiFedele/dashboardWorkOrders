import { Controller, Post, Get, HttpCode } from '@nestjs/common';
import { WorkOrderService } from './workorder.service';

@Controller('workorder')
export class WorkOrderController {
  constructor(private service: WorkOrderService) {}

  @Post('sync')
  @HttpCode(200)
  async sync() {
    await this.service.syncAllWorkOrders();
    return { message: 'Sincronização concluída' };
  }

  @Get('workorders')
  @HttpCode(200)
  async getWorkOrders() {
    return this.service.getAllWorkOrders();
  }
}
