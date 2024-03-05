import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ContentfulService } from './contentful.service';
import { ContentfulEntryDto } from './dto';

@Controller('contentful')
export class ContentfulController {
  constructor(private readonly contentfulService: ContentfulService) {}

  // @Get('entries/:contentTypeId')
  // async getEntries(@Param('contentTypeId') contentTypeId: string) {
  //   return this.contentfulService.getEntries(contentTypeId);
  // }
  // @Get('/cont/entries/:contentTypeId')
  // async getEntries1(@Param('contentTypeId') contentTypeId: string) {
  //   return this.contentfulService.getEntries1(contentTypeId);
  // }
  @Get('entries/:contentTypeId')
 async getEntries(@Param('contentTypeId') contentTypeId: string) {
  // return this.contentfulService.getEntries(contentTypeId);
  return this.contentfulService.getEntriesFromTargetSpace(contentTypeId);

  
}
  // @Delete('delete-entry/:entryId')
  // async deleteContentfulEntry(@Param('entryId') entryId: string) {
  //   try {
  //     await this.contentfulService.deleteContentfulEntry(entryId);
  //     return { message: 'Entry deleted successfully' };
  //   } catch (error) {
  //     return { message: 'Error deleting entry', error: error.message };
  //   }
  // }
  // @Post('create-entry')
  // async createContentfulEntry() {
  //   try {
  //     const entry = await this.contentfulService.createEntry();
  //     return { message: 'Entry created successfully', entry };
  //   } catch (error) {
  //     return { message: 'Error creating entry', error: error.message };
  //   }
  // }
 
 
}