import { Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { user } from './user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, ResetPasswordDto } from './dto/createuserdetails';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { updateuserDto } from './dto/updatedto';
import * as speakeasy from 'speakeasy'; 
import { UserNotFoundException } from 'src/interceptor/user.interceptor';
import { google } from 'googleapis';
import * as fs from 'fs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  getUserById(user_id: any) {
    throw new NotImplementedException('Method not implemented.');
  }
  constructor(
    @InjectModel(user.name) private userModel: mongoose.Model<user>,
    @InjectModel(Event.name)
    private eventModel: mongoose.Model<Event>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

 
//   async findOrCreateGoogleUser(userName: string, fullName: string, email: string): Promise<any> {

//     let user = await this.userModel.findOne({ email }).exec();
//     if (!user) {

//         user = new this.userModel({
//             email,
//             username: userName,
//             name: fullName,
//             role: 'user'
//         });
//         await user.save();
//     }

//     const payload = { sub: user._id, email: user.email, role: user.roles };
//     const access_token = await this.jwtService.sign(payload);
//     const value = await this.cacheManager.set(JSON.stringify(user._id), payload, 1800);
//     // const newSession = await new this.SessionModel({
//     //     userId: user._id,
//     // })

//     // newSession.save()

//     return {
//         message: "Login successful ",
//         access_token,
//         user,
//     };
// }


  async findall(): Promise<user[]> {
    const users = await this.userModel.find();
    return users;
  }

  //signup
  async isUsernameTaken(username: string): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ username });
    return !!existingUser;
  }
  async isEmailTaken(email: string): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ email });
    return !!existingUser;
  }
  async createUser(user_details: CreateUserDto): Promise<user> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user_details.password, saltRounds);
    const createdUser = new this.userModel({
      ...user_details,
      password: hashedPassword,
    });
    return createdUser.save();
  }
  
  //login user
  async loginuser(email: string): Promise<user> {
    return this.userModel.findOne({ email }); // Use findOne to query for a user by username
  }

  async generateOtp(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    const OTP = Math.floor(1000 + Math.random() * 9000);
    await this.cacheManager.set(email, OTP);
    const mailOptions = {
      to: email,
      subject: 'Password Reset Request',
      text: `\n\nYOUR RESET PASSWORD OTP IS: ${OTP}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    await this.mailerService.sendMail(mailOptions);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string> {
    const { email, otp, newPassword } = resetPasswordDto;
    const admin = await this.userModel.findOne({ email });
    if (!admin) {
      throw new Error('Invalid User');
    }
    const redisOTP = await this.cacheManager.get(email);
    if (!redisOTP || JSON.stringify(redisOTP) !== otp) {
      throw new NotFoundException('Invalid OTP');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();
    return 'Password reset successfully';
  }

  async clearUserCache(email: string) {
    await this.cacheManager.del(`user:${email}`);
  }

  async recommendEventsForUser(userId: string): Promise<Event[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UserNotFoundException('User not found');
    }
    // Get all events that match user's interests
    const recommendedEvents = await this.eventModel
      .find({ topics: { $in: user.interest } })
      .exec();
    return recommendedEvents;
  }

  async updateUserProfile(id: string, updateUserDto: updateuserDto): Promise<user> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!user) {
      throw new UserNotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<user | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async verifyOTP(user: user, otp: string): Promise<boolean> {
    console.log(user,otp)
    const verified = speakeasy.totp.verify({
      secret: user.secretKey,
      encoding: 'ascii',
      token: otp,
    });
    return verified;
  }
  async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.refreshToken = refreshToken;
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7); // 7 days from now
    user.refreshTokenExpiresAt = refreshTokenExpiresAt;
    await user.save();
  }

//   async uploadFile(qrCodeFileName: any, mimeTypeVar: string,Token:string): Promise<any> {
//     console.log("qrNam" + qrCodeFileName)
//     try {
//         const drive = google.drive({
//             version: 'v3',
//             auth: this.oauth2Client,
//         });
//         console.log(drive)
//         console.log("========")

//         // const filePath = `/home/user/Desktop/daily-work/construction-management/${qrCodeFileName}`;
//         const filePath = `/home/admin96/Videos/appinventive_projects/virtual_event_management_system/App_projects_/src/modules/user/${qrCodeFileName}`;
         

//         const response = await drive.files.create({
//             requestBody: {
//                 name: qrCodeFileName,         // setting drive file name
//                 mimeType: mimeTypeVar,          // setting type
//             },
//             media: {
//                 mimeType: mimeTypeVar,
//                 body: fs.createReadStream(filePath), 
//                // reading the file from local file path and set to body
//             },
//         });
//         console.log("------")

//         return response.data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }
async uploadFile(qrCodeFileName: string, mimeTypeVar: string): Promise<void> {
  try {
    // Set up OAuth2 client
    const oauth2Client = new google.auth.OAuth2({
      clientId: process.env.DRIVE_CLIENT_ID,
      clientSecret:process.env.DRIVE_CLIENT_SECRET,
      redirectUri:process.env.DRIVE_REDIRECT_URL,
    });

    // Set credentials with the provided refreshToken
    // oauth2Client.setCredentials({ refresh_token: refreshToken });

    // Create a Google Drive client
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // Define the file metadata
    const fileMetadata = {
      name: qrCodeFileName,
      mimeType: mimeTypeVar,
    };
    const filePath = `/home/admin96/Videos/appinventive_projects/virtual_event_management_system/App_projects_/src/modules/user/${qrCodeFileName}`;
    console.log(filePath)

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: {
        mimeType: mimeTypeVar,
        body: fs.createReadStream(filePath),
      },
    });
    console.log('File uploaded:', response.data);

  } catch (error) {
    throw new Error(error.message);
  }
}

}
