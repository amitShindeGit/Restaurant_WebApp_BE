import { Injectable, NotFoundException } from '@nestjs/common';
import { Restaurant } from './restaurant.model';

@Injectable()
export class RestaurantService {
  private restaurants: Restaurant[] = [];

  insertRestaurant(
    title: string,
    description: string,
    location: string,
    averageRating: number,
  ) {
    const restaurantId = new Date().toString();
    const newRestaurant = new Restaurant(
      restaurantId,
      title,
      description,
      location,
      averageRating,
    );

    this.restaurants.push(newRestaurant);
    return restaurantId;
  }

  getRestaurants() {
    return [...this.restaurants]; //sends copy
  }

  getRestaurantsById(restaurantId: string) {
    const restaurant = this.findRestaurant(restaurantId);
    return { ...restaurant };
  }

  updateRestaurant(
    restaurantId: string,
    title: string,
    description: string,
    location: string,
    averageRating: number,
  ) {
    const [restaurant, restaurantIndex] = this.findRestaurant(restaurantId);
    const updatedRestaurant = { ...restaurant };
    if (title) {
      updatedRestaurant.title = title;
    }

    if (description) {
      updatedRestaurant.description = description;
    }

    if (location) {
      updatedRestaurant.location = location;
    }

    if (averageRating) {
      updatedRestaurant.averageRating = averageRating;
    }

    this.restaurants[restaurantIndex] = updatedRestaurant;
  }

  deleteRestaurants(restaurantId: string) {
    const restaurantIndex = this.findRestaurant(restaurantId)[1];

    this.restaurants.splice(restaurantIndex, 1);
  }

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
