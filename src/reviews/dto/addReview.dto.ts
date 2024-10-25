import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class AddReviewDTO {
  @IsNotEmpty()
  movie_id: number;

  @IsInt({ message: 'Rating must be an integer value' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  @IsOptional()
  ratings: number;

  @IsOptional()
  @IsString()
  reviews: string;
}
