import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  genre: string;

  @IsOptional()
  releaseDate: Date;
}
