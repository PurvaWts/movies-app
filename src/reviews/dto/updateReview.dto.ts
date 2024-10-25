import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDTO {
  @IsNumber()
  @IsOptional()
  ratings: number;

  @IsOptional()
  @IsString()
  reviews: string;
}
