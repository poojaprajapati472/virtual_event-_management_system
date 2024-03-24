import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './modules/event/event.module';
import { BookingModule } from './modules/booking/booking.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import path from 'path';
import { ConfigModule } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { RabbitMQService } from './modules/rabbitmq/rabbitmq.service';
import { PassportModule } from '@nestjs/passport';
import { ContentfulModule } from './contentful/contentful.module';
import { WebhookModule } from './webhook/webhook.module';
import { AtlassearchModule } from './atlassearch/atlassearch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.DB_LINK,
    ),
    UserModule,
    AdminModule,
    EventModule,
    BookingModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 200000,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: '/home/admin96/Videos/appinventive_projects/virtual_event_management_system/App_projects_/src/i18n/',
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    PassportModule.register({session:true}),
    ContentfulModule,
    WebhookModule,
    AtlassearchModule
  ],
  controllers: [AppController],
  providers: [AppService,RabbitMQService,],
})
export class AppModule {
  constructor() {
    console.log('This is app module');
    
  }
}
ConfigModule.forRoot()
