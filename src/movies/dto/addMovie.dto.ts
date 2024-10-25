import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddMovieDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  // @IsDate()
  @IsNotEmpty()
  releaseDate: Date;
}
