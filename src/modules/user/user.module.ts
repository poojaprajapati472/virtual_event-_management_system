import { Module } from '@nestjs/common';
import { user, user_schema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/middleware/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { EventSchema } from 'src/modules/event/eventschema';
import { AuthService } from 'src/middleware/basic_auth/basic.auth.guard';
import { BasicAuthGuard } from 'src/middleware/basic_auth/basic.auth.strategy';
import { ConfigModule } from '@nestjs/config';
import { ErrorInterceptor } from 'src/interceptor/error.interceptor';
import { Googlestrategy } from './googlestrategy';
// import { GoogleDriveService } from './googledriveservices';
// import { GoogleDriveService } from './googledriveservices';
ConfigModule.forRoot()

@Module({
  imports: [

    MongooseModule.forFeature([
      { name: user.name, schema: user_schema },
      { name: Event.name, schema: EventSchema },
    ]),

    JwtModule.register({
      secret: process.env.JWT,
      signOptions: { expiresIn: '1h' },
    }),
    JwtModule.register({
      secret: process.env.REFRESH_TOKEN_SECRET, // Refresh token secret key
      signOptions: { expiresIn: '7d' }, // Refresh token expiration (longer-lived)
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          auth: {
            user: process.env.EMAILSERVICE_USER,
            pass: process.env.EMAILSERVICE_SECRET_PASSCODE,
          },
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy,AuthService, BasicAuthGuard,ErrorInterceptor,Googlestrategy],
})
export class UserModule {
  constructor() {
    console.log('This is user module');
  }
}
