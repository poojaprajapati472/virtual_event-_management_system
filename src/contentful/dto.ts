import { IsNotEmpty } from "class-validator";

export class ContentfulEntryDto {
    @IsNotEmpty()
    field1: string;
    
    @IsNotEmpty()
    field2: number;
  }