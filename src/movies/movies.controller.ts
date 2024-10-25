import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AddMovieDTO } from './dto/addMovie.dto';
import { UpdateMovieDTO } from './dto/updateMovie.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorators';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async add(@Body() addMovieDTO: AddMovieDTO, @Req() req) {
    return this.moviesService.add(addMovieDTO, req.userId);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  async getAllByUser(@Req() req) {
    return this.moviesService.getAllByUser(req.userId);
  }

  @Get('get-all')
  async getAll(@Req() req) {
    return this.moviesService.getAll(req.query);
  }

  @Get(':id')
  async get(@Param('id') id, @Req() req) {
    return this.moviesService.get(id, req.userId);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id,
    @Body() updateMovieDTO: UpdateMovieDTO,
    @Req() req,
  ) {
    return this.moviesService.update(id, updateMovieDTO, req.userId);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id, @Req() req) {
    return this.moviesService.delete(id, req.userId);
  }
}
