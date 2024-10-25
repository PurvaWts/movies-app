import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users } from './users.schema';
import { Movies } from './movies.schema';

@Schema({
  timestamps: true,
})
export class Reviews extends Model {
  @Prop({ type: Types.ObjectId, ref: Users.name, required: true })
  user_id: Types.ObjectId | Users;

  @Prop({ type: Types.ObjectId, ref: Movies.name, required: true })
  movie_id: Types.ObjectId | Movies;

  @Prop()
  ratings: number;

  @Prop()
  reviews: string;
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);
