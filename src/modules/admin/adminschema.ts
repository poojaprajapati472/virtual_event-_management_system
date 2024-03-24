import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/modules/event/decorator/role.enum';
// import { Role } from './decorator/role.enum';
export type AdminDocument = admin & Document;
@Schema()
export class admin {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  username: string;

  // @Prop([String])
  // address:string[]
  @Prop({ required: true })
  password: string;
  @Prop([{ type: String }])
  roles: Role[];
}
export const admin_schema = SchemaFactory.createForClass(admin);
