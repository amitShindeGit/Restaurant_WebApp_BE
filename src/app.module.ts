import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '../orm.config'; //not use
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { UserEntity } from './users.entity';
import { RestaurantsController } from './restaurants/restaurants.controller';
import { UserController } from './users/users.controller';
import { RestaurantService } from './restaurants/restaurants.service';
import { UserService } from './users/users.service';
import { ReviewController } from './reviews/review.controller';
import { ReviewService } from './reviews/review.service';
import {ReviewEntity} from './review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite.db',
      synchronize: true,
      entities: [RestaurantEntity, UserEntity, ReviewEntity],
      // logging: true, 
    }),
    
  ],
  controllers: [RestaurantsController, UserController,  ReviewController],
  providers: [RestaurantService, UserService,  ReviewService],
})
export class AppModule {}
