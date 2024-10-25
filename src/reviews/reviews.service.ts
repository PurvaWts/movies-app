import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reviews } from 'src/database/schemas/reviews.schema';
import { Movies } from '../database/schemas/movies.schema';
import { ConfigService } from '@nestjs/config';
import { AddReviewDTO } from './dto/addReview.dto';
import { UpdateReviewDTO } from './dto/updateReview.dto';
import { Model } from 'mongoose';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name) private readonly reviews: Model<Reviews>,
    @InjectModel(Movies.name) private readonly movies: Model<Movies>,
    private readonly configService: ConfigService,
  ) {}

  async add(addReviewDTO: AddReviewDTO, user_id: number) {
    try {
      const movie = await this.movies.findOne({
        _id: addReviewDTO.movie_id,
      });

      if (!movie) {
        throw new BadRequestException('Invalid review');
      }

      const review = await this.reviews.create({
        user_id: user_id,
        ...addReviewDTO,
      });

      return review;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllByUser(user_id: number) {
    const data = await this.reviews.find({ user_id });

    if (!data || data.length === 0) return { message: 'No reviews found' };

    return data;
  }

  async getAll() {
    const data = await this.reviews.find();

    if (!data || data.length === 0) return { message: 'No reviews found' };

    return data;
  }

  async get(id: string, user_id: number) {
    const data = await this.reviews.findOne({ _id: id, user_id });

    if (!data) throw new NotFoundException('Review not found');

    return data;
  }

  async update(id: string, updateReviewDTO: UpdateReviewDTO, user_id: number) {
    const movie = await this.reviews.findOne({ _id: id, user_id });

    if (!movie) throw new NotFoundException('Invalid review');
    try {
      await this.reviews.updateOne({ _id: id }, updateReviewDTO);

      return movie;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string) {
    const movie = await this.reviews.findOne({ _id: id });

    if (!movie) throw new NotFoundException('Invalid review');

    try {
      const deleted = await this.reviews.deleteOne({ _id: id });

      if (deleted) return { message: 'Review deleted' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
