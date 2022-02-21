import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantEntity } from 'src/restaurant.entity';
import { Restaurant } from './restaurant.model';

@Injectable()
export class RestaurantService {
  private restaurants: Restaurant[] = [];

  // insertRestaurant(
  //   title: string,
  //   description: string,
  //   location: string,
  //   averageRating: number,
  // ) {
  //   const restaurantId = new Date().toString();
  //   const newRestaurant = new Restaurant(
  //     restaurantId,
  //     title,
  //     description,
  //     location,
  //     averageRating,
  //   );

  //   this.restaurants.push(newRestaurant);
  //   return restaurantId;
  // }

  async insertRestaurant(title, description, location, averageRating) {
    const restaurantId = new Date().toString();
    const newRestaurant = new RestaurantEntity();
    // newRestaurant.id = restaurantId; no need of this since id is auto-increment
    newRestaurant.title = title;
    newRestaurant.description = description;
    newRestaurant.location = location;
    newRestaurant.averageRating = averageRating;

    await newRestaurant.save();
    return newRestaurant;
  }

  async getRestaurants(): Promise<Array<any>> {
    const restaurants = await RestaurantEntity.find();

    const data = restaurants.map((restaurant) => restaurant);

    return data;
  }

  // getRestaurants() {
  //   return [...this.restaurants]; //sends copy
  // }

  async getRestaurantsById(restaurantId: string) {
    const restaurant = await RestaurantEntity.findOne(restaurantId);
    return { ...restaurant };
  }

  // getRestaurantsById(restaurantId: string) {
  //   const restaurant = this.findRestaurant(restaurantId);
  //   return { ...restaurant };
  // }

  async updateRestaurant(
    restaurantId,
    title,
    description,
    location,
    averageRating,
  ) {
    const restaurant = await RestaurantEntity.findOne(restaurantId);

    // const [restaurant, restaurantIndex] = this.findRestaurant(restaurantId);
    // const updatedRestaurant = { ...restaurant };
    if (title) {
      restaurant.title = title;
    }

    if (description) {
      restaurant.description = description;
    }

    if (location) {
      restaurant.location = location;
    }

    if (averageRating) {
      restaurant.averageRating = averageRating;
    }

    await restaurant.save();
    return { ...restaurant };

    // this.restaurants[restaurantIndex] = updatedRestaurant;
  }

  // updateRestaurant(
  //   restaurantId: string,
  //   title: string,
  //   description: string,
  //   location: string,
  //   averageRating: number,
  // ) {
  //   const [restaurant, restaurantIndex] = this.findRestaurant(restaurantId);
  //   const updatedRestaurant = { ...restaurant };
  //   if (title) {
  //     updatedRestaurant.title = title;
  //   }

  //   if (description) {
  //     updatedRestaurant.description = description;
  //   }

  //   if (location) {
  //     updatedRestaurant.location = location;
  //   }

  //   if (averageRating) {
  //     updatedRestaurant.averageRating = averageRating;
  //   }

  //   this.restaurants[restaurantIndex] = updatedRestaurant;
  // }

  async deleteRestaurants(restaurantId: string) {
    const restaurant = await RestaurantEntity.findOne(restaurantId);
    // const restaurantIndex = this.findRestaurant(restaurantId)[1];
    return restaurant.remove();
  }

  // deleteRestaurants(restaurantId: string) {
  //   const restaurantIndex = this.findRestaurant(restaurantId)[1];

  //   this.restaurants.splice(restaurantIndex, 1);
  // }

  private findRestaurant(id: string): [Restaurant, number] {
    const restaurantIndex = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    );
    const restaurant = this.restaurants[restaurantIndex];

    if (!restaurant) {
      throw new NotFoundException('Could not found any such restaurant!');
    }

    return [restaurant, restaurantIndex];
  }
}
