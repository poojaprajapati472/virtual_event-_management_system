import { Test, TestingModule } from '@nestjs/testing';
import { ContentfulController } from './contentful.controller';

describe('ContentfulController', () => {
  let controller: ContentfulController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentfulController],
    }).compile();

    controller = module.get<ContentfulController>(ContentfulController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
