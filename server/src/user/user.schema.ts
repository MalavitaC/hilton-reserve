import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from './constants';

export type UserDocument = User & Document;

@Schema({
  collection: 'user',
  timestamps: true,
})
export class User extends Document {
  @Prop({
    required: true,
  })
  account: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    enum: UserRole,
  })
  role: 0 | 1;
}

export const UserSchema = SchemaFactory.createForClass(User);
