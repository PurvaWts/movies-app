import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AddReviewDTO } from './dto/addReview.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorators';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Roles('user')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async add(@Body() addReviewDTO: AddReviewDTO, @Req() req) {
    return this.reviewsService.add(addReviewDTO, req.userId);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  async getAll(@Req() req) {
    console.log('🚀 ~ ReviewsController ~ getAll ~ req:', req);
    return this.reviewsService.getAll();
  }

  @Roles('user')
  @UseGuards(JwtGuard, RolesGuard)
  @Get('get-all')
  async getAllByUser(@Req() req) {
    return this.reviewsService.getAllByUser(req.userId);
  }

  @Get(':id')
  async get(@Param('id') id, @Req() req) {
    return this.reviewsService.get(id, req.userId);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id) {
    return this.reviewsService.delete(id);
  }
}
