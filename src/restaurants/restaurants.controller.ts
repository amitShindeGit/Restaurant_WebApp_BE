import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../Guards/auth.guard';
import { AdminGuard } from '../Guards/admin.guard';
import { RestaurantService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(AdminGuard)
  @Post()
  addRestaurant(
    @Body('title') restaurantTitle: string,
    @Body('description') restaurantDescription: string,
    @Body('location') restaurantLocation: string,
    // @Body('averageRating') averageRating: number,
  ) {
    return this.restaurantService.insertRestaurant(
      restaurantTitle,
      restaurantDescription,
      restaurantLocation,
      // averageRating,
    );

    // return { id: generatedId };
  }

  @Get()
  fetchRestaurant() {
    return this.restaurantService.getRestaurants();
  }

  @Get(':id')
  getRestaurantDetails(@Param('id') restaurantId: number) {
    return this.restaurantService.getRestaurantDetails(restaurantId);
  }

  // @Get(':id')
  // fetchRestaurantById(@Param('id') restaurantId: number) {
  //   return this.restaurantService.getRestaurantsById(restaurantId);
  // }

  @Patch(':id')
  updateRestaurant(
    @Param('id') restaurantId: number,
    @Body('title') restaurantTitle: string,
    @Body('description') restaurantDescription: string,
    @Body('location') restaurantLocation: string,
  ) {
    return this.restaurantService.updateRestaurant(
      restaurantId,
      restaurantTitle,
      restaurantDescription,
      restaurantLocation,
    );
  }

  @Delete(':id')
  deleteRestaurant(@Param('id') restaurantId: number) {
    return this.restaurantService.deleteRestaurants(restaurantId);
  }

  @UseGuards(AuthGuard)
  @Post('review/:restaurnt_id')
  addCommentReview(
    @Param('restaurnt_id') restaurant_id: number,
    @Body() body,
    @Req() req,
  ) {
    const { rating, comment} = body;
    return this.restaurantService.addCommentReview(
      restaurant_id,
     { 
      rating,
      comment,
      },
      req.user,
    );
  }
}
