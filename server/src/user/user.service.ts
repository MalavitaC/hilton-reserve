import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  queryUserByID(id: string) {
    return this.userModel.findById(new ObjectId(id), 'account role').exec();
  }

  addUser(user: any) {
    return this.userModel.create(user);
  }

  queryUserByAccount(account: string) {
    return this.userModel.findOne(
      {
        account,
      },
      'account password role',
    );
  }
}
