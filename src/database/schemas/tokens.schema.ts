import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users } from './users.schema';
import { TOKENS } from '../../constants/app.constant';
@Schema({
  timestamps: true,
})
export class Tokens extends Model {
  @Prop({ type: Types.ObjectId, ref: Users.name, required: true })
  user_id: Types.ObjectId | Users;

  @Prop()
  token: string;

  @Prop({
    type: String,
    enum: Object.values(TOKENS),
  })
  type: string;
}

export const TokensSchema = SchemaFactory.createForClass(Tokens);
