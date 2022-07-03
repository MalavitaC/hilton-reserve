import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserve, ReserveDocument } from './reserve.schema';
import { ObjectId } from 'mongodb';
import * as dayjs from 'dayjs';
import { ReserveStatus } from './constants';
import { AddReserveDto, ModifyReserveDto } from './dto';

@Injectable()
export class ReserveService {
  constructor(
    @InjectModel(Reserve.name)
    private readonly reserveModel: Model<ReserveDocument>,
  ) {}

  queryReserveById(id: string, guestId: null | string) {
    const where: any = { _id: new ObjectId(id) };
    if (guestId) where.guestId = new ObjectId(guestId);
    return this.reserveModel.findOne(where);
  }

  queryReserveByOwner(id: string) {
    return this.reserveModel.findOne({
      guestId: new ObjectId(id),
    });
  }

  createReserve(reserve: any) {
    return this.reserveModel.create(reserve);
  }

  queryReserveList(fileter: any) {
    const where: any = {};
    if (fileter.reserveDate) {
      where.reserveDateTime = {
        $gte: dayjs(fileter.reserveDate).toISOString(),
        $lt: dayjs(fileter.reserveDate).add(1, 'day').toISOString(),
      };
    }
    if (fileter.isUsed) {
      where.isUsed = fileter.isUsed;
    }
    if (fileter.status) {
      where.status = fileter.status;
    }
    return this.reserveModel.find(where);
  }

  modifyReserve(id: string, data: ModifyReserveDto, guestId: null | string) {
    const where: any = {
      _id: new ObjectId(id),
      isUsed: 0,
      status: ReserveStatus.Normal,
    };
    if (guestId) where.guestId = new ObjectId(guestId);
    return this.reserveModel.findOneAndUpdate(
      where,
      {
        $set: data,
      },
      { new: true },
    );
  }

  usedReserve(id: string, guestId: null | string) {
    const where: any = {
      _id: new ObjectId(id),
      isUsed: 0,
      status: ReserveStatus.Normal,
    };
    if (guestId) where.guestId = new ObjectId(guestId);
    return this.reserveModel.findOneAndUpdate(
      where,
      {
        $set: {
          isUsed: 1,
        },
      },
      { new: true },
    );
  }

  cancelReserve(id: string, guestId: null | string) {
    const where: any = {
      _id: new ObjectId(id),
      isUsed: 0,
      status: ReserveStatus.Normal,
    };
    if (guestId) where.guestId = new ObjectId(guestId);
    return this.reserveModel.findOneAndUpdate(
      where,
      {
        $set: {
          status: ReserveStatus.Cancel,
        },
      },
      { new: true },
    );
  }
}
