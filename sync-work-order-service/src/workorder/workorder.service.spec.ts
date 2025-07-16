import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderService } from './workorder.service';

describe('WorkorderService', () => {
  let service: WorkOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkOrderService],
    }).compile();

    service = module.get<WorkOrderService>(WorkOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
