import { Controller, Get, Param } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('/:id') //Route handler (method) Decorator
  //ParameterDecorator
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with the id: ${movieId}`;
  }
}
