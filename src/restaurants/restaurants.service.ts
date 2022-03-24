import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ReviewEntity } from '../review.entity';
import { RestaurantEntity } from '../restaurant.entity'; //../restaurant.entity  this is correct way
import { UserEntity } from 'src/users.entity';
import * as _ from 'lodash';
import * as moment from 'moment';


@Injectable()
export class RestaurantService {
  async insertRestaurant(title: string, description: string, location: string) {
    const newRestaurant = new RestaurantEntity();
    newRestaurant.title = title;
    newRestaurant.description = description;
    newRestaurant.location = location;
    // newRestaurant.averageRating = averageRating;
    await newRestaurant.save();
    // console.log('---------------------', newRestaurant);
    return newRestaurant;
  }

  async getRestaurants(): Promise<Array<any>> {
    const restaurants = await RestaurantEntity.find();

    const data = restaurants.map((restaurant) => restaurant);

    return data;
  }

  async updateRestaurant(restaurantId: number, title, description, location) {
    const restaurant = await RestaurantEntity.findOne(restaurantId);

    if (title) {
      restaurant.title = title;
    }

    if (description) {
      restaurant.description = description;
    }

    if (location) {
      restaurant.location = location;
    }

    await restaurant.save();
    return restaurant;
  }

  async deleteRestaurants(restaurantId: number) {
    const restaurant = await RestaurantEntity.findOne(restaurantId);
    return restaurant.remove();
  }

  async getRestaurantDetails(restaurantId: number) {
    const restaurant = await RestaurantEntity.findOne(restaurantId);

    if (restaurant) {
      const lowestRating = await ReviewEntity.findOne({
        where: { restaurantId: restaurant.id },
        order: { rating: 'ASC' },
      });

      const highestRating = await ReviewEntity.findOne({
        where: { restaurantId: restaurant.id },
        order: { rating: 'DESC' },
      });

      const latestRating = await ReviewEntity.findOne({
        where: { restaurantId: restaurant.id },
        order: { dateOfVisit: 'DESC' },
      });

      return {
        restaurant,
        lowestRating,
        highestRating,
        latestRating,
      };
    }
  }

  async addCommentReview(
    restaurantId: number,
    { rating, comment },
    authUser: UserEntity,
  ) {
    const restaurant = await RestaurantEntity.findOne(restaurantId);

    if (restaurant) {
      const existingReview = await ReviewEntity.findOne({
        where: {
          restaurantId: restaurantId,
          userId: authUser.id,
        },
      }); //Check once again for usreIds

      if (!existingReview) {
        const newReview = new ReviewEntity();
        newReview.name = authUser.name;
        newReview.rating = rating;
        newReview.restaurantId = restaurantId;
        newReview.comment = comment;
        const randomDay = _.random(0, 10, false);
        newReview.dateOfVisit = moment()
          .subtract(randomDay, 'day')
          .format('YYYY-MM-DD'); //random dates
        newReview.userId = authUser.id;

        await newReview.save();
        return newReview;
      } else {
        throw new HttpException('Already rated.', 400);
      }
    } else {
      throw new NotFoundException('Restaurant not found!');
    }
  }

  // async getRestaurantsById(restaurantId: number) {
  //   const restaurant = await RestaurantEntity.findOne(restaurantId);
  //   return restaurant;
  // }
}
