import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkOrderService } from './workorder/workorder.service';
import { PrismaService } from './prisma/prisma.service';
import { WorkOrderController } from './workorder/workorder.controller';
import { WorkOrderModule } from './workorder/workorder.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [WorkOrderModule, ScheduleModule.forRoot()],
  controllers: [AppController, WorkOrderController],
  providers: [AppService, WorkOrderService, PrismaService],
})
export class AppModule {}
