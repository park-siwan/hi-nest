import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }
  /**
   * search 부분이 get보다 밑에 있으면 NestJS는 search를 id로 판단한다.
   * search === :id
   */
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are search for a movie with a title${searchingYear} `;
  }

  @Get(':id') //Route handler (method) Decorator
  //ParameterDecorator
  getOne(@Param('id') movieId: string): Movie {
    // return `This will return one movie with the id: ${movieId}`;
    return this.moviesService.getOne(movieId);
  }
  @Post()
  create(@Body() movieData) {
    // return movieData;
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    // return `This will delete a movie with the id: ${movieId}`;
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return this.moviesService.update(movieId, updateData);
  }
}
