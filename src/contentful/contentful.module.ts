import { Module } from '@nestjs/common';
import { ContentfulController } from './contentful.controller';
import { ContentfulService } from './contentful.service';

@Module({
  controllers: [ContentfulController],
  providers: [ContentfulService],
})
export class ContentfulModule {}