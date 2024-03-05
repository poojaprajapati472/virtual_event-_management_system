import { Test, TestingModule } from '@nestjs/testing';
import { ContentfulService } from './contentful.service';

describe('ContentfulService', () => {
  let service: ContentfulService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentfulService],
    }).compile();

    service = module.get<ContentfulService>(ContentfulService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
