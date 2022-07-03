import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReserveController } from './reserve.controller';
import { Reserve, ReserveSchema } from './reserve.schema';
import { ReserveService } from './reserve.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reserve.name, schema: ReserveSchema }]),
  ],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
