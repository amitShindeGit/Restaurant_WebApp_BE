import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RestaurantService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  addRestaurant(
    @Body('title') restaurantTitle: string,
    @Body('description') restaurantDescription: string,
    @Body('location') restaurantLocation: string,
    @Body('averageRating') averageRating: number,
  ) {
    return this.restaurantService.insertRestaurant(
      restaurantTitle,
      restaurantDescription,
      restaurantLocation,
      averageRating,
    );

    // return { id: generatedId };
  }

  @Get()
  fetchRestaurant() {
    return this.restaurantService.getRestaurants();
  }

  @Get(':id')
  fetchRestaurantById(@Param('id') restaurantId: string) {
    return this.restaurantService.getRestaurantsById(restaurantId);
  }

  @Patch(':id')
  updateRestaurant(
    @Param('id') restaurantId: string,
    @Body('title') restaurantTitle: string,
    @Body('description') restaurantDescription: string,
    @Body('location') restaurantLocation: string,
    @Body('averageRating') averageRating: number,
  ) {
    return this.restaurantService.updateRestaurant(
      restaurantId,
      restaurantTitle,
      restaurantDescription,
      restaurantLocation,
      averageRating,
    );
  }

  @Delete(':id')
  deleteRestaurant(@Param('id') restaurantId: string) {
    return this.restaurantService.deleteRestaurants(restaurantId);
  }
}
