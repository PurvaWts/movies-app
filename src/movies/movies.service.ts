import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movies } from 'src/database/schemas/movies.schema';
import { ConfigService } from '@nestjs/config';
import { AddMovieDTO } from './dto/addMovie.dto';
import { UpdateMovieDTO } from './dto/updateMovie.dto';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name) private readonly movies: Model<Movies>,
    private readonly configService: ConfigService,
  ) {}

  async add(addMovieDTO: AddMovieDTO, user_id: number) {
    try {
      const movie = await this.movies.create({
        added_by_id: user_id,
        ...addMovieDTO,
      });

      return movie;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllByUser(user_id) {
    const data = await this.movies.find({ added_by_id: user_id });

    if (!data || data.length === 0) return { message: 'No Movies found' };

    return data;
  }

  async getAll(query) {
    const { name, genre } = query;

    const filter: any = {};

    if (name) filter.title = { $regex: name, $options: 'i' };
    if (genre) filter.genre = { $regex: genre, $options: 'i' };

    const data = await this.movies.find(filter);
    if (!data || data.length === 0) return { message: 'No Movies found' };

    return data;
  }

  async get(id: any, user_id) {
    const data = await this.movies.findOne({ _id: id, added_by_id: user_id });

    if (!data) throw new NotFoundException('Movie not found');

    return data;
  }

  async update(id: any, updateMovieDTO: UpdateMovieDTO, user_id) {
    const movie = await this.movies.findOne({ _id: id, added_by_id: user_id });

    if (!movie) throw new NotFoundException('Invalid movie');
    try {
      await this.movies.updateOne({ _id: id }, updateMovieDTO);

      return movie;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: any, user_id: number) {
    const movie = await this.movies.findOne({ _id: id, added_by_id: user_id });

    if (!movie) throw new NotFoundException('Invalid movie');

    try {
      const deleted = await this.movies.deleteOne({ _id: id });

      if (deleted) return { message: 'Movie deleted' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
