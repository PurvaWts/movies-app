import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users } from './users.schema';

@Schema({
  timestamps: true,
})
export class Movies extends Model {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ type: Types.ObjectId, ref: Users.name, required: true })
  added_by_id: Types.ObjectId | Users;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
