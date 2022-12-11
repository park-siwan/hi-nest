# Nest.js 스터디!

# Nest js

rest 클라이언트 설치

[Download](https://insomnia.rest/download)

npm i -g @nestjs/cli

NestJs를 사용할 때는 `@Module` 이라는 데코레이터가 중요하다.

데코레이터는 클래스에 함수 기능을 추가할 수 있기 때문이다.

데코레이터는 클래스 위의 함수이다. 클래스를 위해 움직인다.

# ARCHITECTURE OF NESTJS

## src 폴더구조

main.ts

```jsx
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

위 내용의 NestFactory.create() 안에 들어가는 `AppModule`는 app.module.ts에서 주는것이다.

모듈에서 컨트롤러로 들어가는 구조이다.

app.controller.ts

```jsx
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService ){}

@Get()
getHello(): string {
	return this.appService.getHello();
}
```

app.module.ts 의 controllers 배열에 AppController가 들어간다.

- providers에 AppService가 들어간다.
  - `AppService`에서 `getHello()` 를 통해 `npm run start:dev`로 실행했던 `localhost:3000` 으로 보였던 “Hello World” 가 리턴되고 있다.

## Controller

- **url을 가져오고 function을 리턴하는 역할이다.**
- 모든 url을 다 넣어놓는다.

main.ts 라는 하나의 모듈에서 어플리케이션을 생성한다.

모듈예시 : 인증용 유저모듈, 사진, 비디오 모듈

controllers 는 express의 라우터같은 것이다.(controller/router)

`@Get()`은 express의 get 라우터와 같은 역할이다.

```tsx
@Get('/hello')
  sayHello(): string {
    return 'Hello everyone';
  }
```

주의할 점은 데코레이터`@Get` 은 꾸며주는 함수나 클래스와 붙어있어야 한다. 빈칸도 안된다.

`@Post`도 가능하다.

## Service

- **서비스는 실제 function을 가지는 부분이다.**
- 비지니스 로직을 실행하는 역할이다.
- 서비스는 필요하다면 데이터베이스에 연락한다.

NestJS는 콘트롤러를 비지니스 로직과 구분 짓고 싶어한다.

컨트롤러는 url을 가져오거나, function 실행하는 역할일 뿐이다.

이에 비해 서비스는 실제 function을 가지는 부분이다.

app.service.ts에서 함수를 생성하고 **app.controller.ts** 에서 `@Get` 아래에 `return this.appService.function()` 으로 적용하고 있다.

root모듈 같은 app.module.ts의 AppModule은 하나만 있을 수 있다.

AppModule에서는 우리가 하는 모든걸 import 한다. 예를들어 심리테스트API, 아이디 중복검사API, 인증서비스 API 등이 있다.

모든 것이 결국 AppModule에 들어간다. 왜냐하면 NestJS가 우리의 애플리케이션을 만들기 위해 이용하는 코드가 `const app = await NestFactory.create(**AppModule**)` 이기 때문이다.

# REST API

## Movies Controller

### CLI활용

NestJS는 커맨드 라인으로 거의 모든걸 생성할 수 있다.

터미널에 `nest g co` 후 이름을 입력하면 컨트롤러를 생성할 수 있다.

실습코드 - src/movies/movies.controller.ts

```jsx
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

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
  @Post()
  create() {
    return 'This will create a movie';
  }

  @Delete()
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `This will patch a movie with the id ${movieId}`;
  }
}
```

실습 중간에 **Insomnia**라는 앱으로 `MethodDecorator`인 get post patch delete를 간편하게 테스트 해 볼 수 있었다.

**개념잡기**

어떤 리소스를 식별하고 싶으면 Path Variable을 사용

정렬이나 필터링을 원하면 query parameter를 사용

## More Routes

데코레터에 대해 더 알아보자

무언가를 원하면 example.controller.ts에 요청해야한다.

### query parameter 로 영화검색 예시

```jsx
@Get('search')
search(@Query('year') movieId:string) {
	return `검색된 영화 ID: ${movieId}`
}
```

### body decorators

```jsx
@Post()
create(@Body() movieData){
	return movieData;
}
```

가져오는 변수와 리턴값을 한눈에 볼 수 있어서 편하다.

## Movies Service part One

단일책임 원칙(Single-responsibility principle) 이란?

- 하나의 module, class 혹은 function이 하나의 동작만의 책임을 져야 한다는 것
- 컨트롤러는 url을 매핑하거나 리퀘스트를 받고, Query를 넘긴다.

### service만드는 방법

cli에 `nest g s` 를하면 movies.service.ts 가 생성된다.

app.module.ts를 보면 providers에 MovieService가 자동으로 추가 되어 있다는걸 알 수 있다.

```jsx
@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {}
```

# UNIT TESTING

학습예정...

# E2E TESTING

학습예정...
