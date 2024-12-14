// import { AppModule } from './app.module';
import { SupportRequestsModule } from './models/support-requests/support-requests.module';
import { CheckoutsModule } from './models/checkouts/checkouts.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './models/users/users.module';
import { User } from './models/users/model/users.model';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './core/transform.interceptor';
import { ToursModule } from './models/tours/tours.module';
import { Tour } from './models/tours/model/tours.model';
import { BookingsModule } from './models/bookings/bookings.module';
import { Booking } from './models/bookings/model/bookings.model';
import { ImagesModule } from './models/images/images.module';
import { Image } from './models/images/model/images.model';
import { ReviewsModule } from './models/reviews/reviews.module';
import { Review } from './models/reviews/model/reviews.model';
import { Sequelize } from 'sequelize-typescript';
import { Checkout } from './models/checkouts/model/checkouts.model';
import { SupportRequest } from './models/support-requests/model/support-requests.model';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ToursModule,
    BookingsModule,
    ImagesModule,
    ReviewsModule,
    CheckoutsModule,
    SupportRequestsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        query: {
          raw: true,
        },
        dialectOptions: {
          options: {
            // Your tedious options here
            useUTC: false,
            dateFirst: 1,
          },
        },
        timezone: '+07:00',
        models: [User, Tour, Booking, Image, Review, Checkout, SupportRequest],
        autoLoadModels: true,
        synchronize: true,
        extra: {
          trustServerCertificate: true,
        },
        options: {
          encrypt: false,
          trustServerCertificate: true,
          enableArithAbort: true,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
// export class AppModule implements OnModuleInit {
//   constructor(private readonly sequelize: Sequelize) {}

//   async onModuleInit() {
//     try {
//       await this.sequelize.sync({ force: true }); // Xóa tất cả bảng và tạo lại
//       console.log('Database synchronized (force: true)');
//     } catch (error) {
//       console.error('Database synchronization failed:', error);
//     }
//   }
// }
