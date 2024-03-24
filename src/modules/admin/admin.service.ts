import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateadminDto } from './dto';
import * as bcrypt from 'bcrypt';
import { admin } from './adminschema';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(admin.name)
    private adminModel: mongoose.Model<admin>,
  ) {}

  async createadmin(admin_details: CreateadminDto): Promise<admin> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      admin_details.password,
      saltRounds,
    );
    const createdadmin = new this.adminModel({
      ...admin_details,
      password: hashedPassword,
    });
    return createdadmin.save();
  }

  async loginadmin(email: string): Promise<admin> {
    return this.adminModel.findOne({ email }); // Use findOne to query for a admin by adminname
  }

  async findall(): Promise<admin[]> {
    const admins = await this.adminModel.find();
    return admins;
  }
  
}
