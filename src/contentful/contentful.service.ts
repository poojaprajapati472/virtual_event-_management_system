import { Injectable } from '@nestjs/common';
import { Entry, Space, createClient } from 'contentful';
import { ContentfulEntryDto } from './dto';

@Injectable()
export class ContentfulService {
  private client1 = createClient({
    space: 'f3xzw1fnmvq5',
    accessToken: 'DAUyLFn00LhkfL6o2xf3ehrUm6aNCEtNJ5uyJSijGNU',
  });
  private cma_client = createClient({
    space: 'f3xzw1fnmvq5',
    accessToken: 'CFPAT-wcr_pY1O9anGHODKV1CcMw4d87bRfg4OZDUBNE9xr_8',
  });
  private spaceclient = createClient({
    space: 'omc4ajgyf9fs',
    accessToken: 'gsoxLctw_vdCxS7jrGNr_kw6b7Xecj5kmVTHz6TlKM4',
  });
  
  async getEntries(contentTypeId: string) {
    try {
      const response = await this.client1.getEntries({
        content_type: contentTypeId,
      });
      return response.items;
    } catch (error) {
      throw new Error(`Error fetching Contentful entries: ${error.message}`);
    }
  }
  // async getEntries1(contentTypeId: string) {
  //   try {
  //     const response = await this.cma_client.getEntries({
  //       content_type: contentTypeId,
  //     });
  //     return response.items;
  //   } catch (error) {
  //     throw new Error(`Error fetching Contentful entries: ${error.message}`);
  //   }
  // }
  async getEntriesFromTargetSpace(contentTypeId: string) {
    try {
      const response = await this.spaceclient.getEntries({
        content_type: contentTypeId,
      });
      return response.items;
    } catch (error) {
      throw new Error(`Error fetching Contentful entries from the target space: ${error.message}`);
    }
  }

  // async deleteContentfulEntry(entryId: string): Promise<void> {
  //   try {
  //     // Fetch the entry
  //     console.log(entryId)
  //     const entry:any = await this.client2.getEntry(entryId);
  //     console.log(entry)

  //     await entry.fields.test.deleteEntry();
  //     console.log("-------")
  //   } catch (error) {
  //     throw new Error(`Error deleting Contentful entry: ${error.message}`);
  //   }
  // }
 
  // async deleteContentfulEntry(entryId: string): Promise<void> {
  //   try {
  //     // Fetch the entry
  //     const entry: any = await this.client2.getEntry(entryId);
  
  //     // Omit the 'test' field from the entry's fields
  //     delete entry.fields.test;
  
  //     // Save the updated entry
  //     await entry.updateEntry();
  
  //     console.log("Entry updated successfully");
  //   } catch (error) {
  //     throw new Error(`Error deleting Contentful entry: ${error.message}`);
  //   }
  // }
  
}