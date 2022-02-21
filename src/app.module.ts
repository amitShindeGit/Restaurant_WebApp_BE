import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurants/restaurants.module';
import config from '../orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Module({
  imports: [RestaurantModule, TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([RestaurantEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
