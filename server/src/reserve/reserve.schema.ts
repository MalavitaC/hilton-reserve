import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';

export type ReserveDocument = Reserve & Document;

@Schema({
  collection: 'reserve',
  timestamps: true,
})
export class Reserve extends Document {
  @Prop({
    required: true,
  })
  guestName: string;

  @Prop({
    type: MSchema.Types.String,
    required: true,
  })
  guestPhone: string;

  @Prop({
    type: MSchema.Types.Date,
    required: true,
  })
  reserveDateTime: Date;

  @Prop({
    type: MSchema.Types.Number,
    min: 1,
    required: true,
  })
  tableSize: number;

  @Prop({
    type: MSchema.Types.ObjectId,
    required: true,
  })
  createdUserId: MSchema.Types.ObjectId;

  @Prop({
    default: 0,
  })
  isUsed: 0 | 1;

  @Prop({
    default: 0,
  })
  status: 0 | 1;
}

export const ReserveSchema = SchemaFactory.createForClass(Reserve);
