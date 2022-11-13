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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
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
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with the id: ${movieId}`;
  }
  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return movieData;
  }

  @Delete()
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updateData: movieId,
      ...updateData,
    };
  }
}
