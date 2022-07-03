import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ReserveModule } from './reserve/reserve.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGO_USER')}:${configService.get(
          'MONGO_PASSWORD',
        )}@${configService.get('MONGO_HOST')}:${configService.get(
          'MONGO_PORT',
        )}/${configService.get('MONGO_DB_NAME')}?authSource=admin`,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ReserveModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
