import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';
import { Movies, MoviesSchema } from './movies.schema';
import { Tokens, TokensSchema } from './tokens.schema';
import { Reviews, ReviewsSchema } from './reviews.schema';

const MODELS = [
  { name: Users.name, schema: UsersSchema },
  { name: Movies.name, schema: MoviesSchema },
  { name: Tokens.name, schema: TokensSchema },
  { name: Reviews.name, schema: ReviewsSchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}
