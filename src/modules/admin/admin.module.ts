import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { admin, admin_schema } from './adminschema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/middleware/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ErrorInterceptor } from 'src/interceptor/error.interceptor';
ConfigModule.forRoot()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: admin.name, schema: admin_schema }]),
    JwtModule.register({
      secret:process.env.JWT,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy,ErrorInterceptor],
})
export class AdminModule {
  constructor() {
    console.log('This is Admin module');
  }
}
