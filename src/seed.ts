import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { RestaurantEntity } from './restaurant.entity';
import { UserEntity } from './users.entity';
import { ReviewEntity } from './review.entity';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as faker from 'faker';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // application logic...

  for (let i = 1; i < 25; i++) {
    let restaurant = new RestaurantEntity();
    restaurant.title = `Restaurants no. ${i}`;
    restaurant.description = `Restaurant Description no. ${i}`;
    restaurant.location = `Restaurant location no. ${i}`;
    await restaurant.save();
  }

  const adminUser = new UserEntity();
  adminUser.name = 'Admin';
  adminUser.email = 'admin@gmail.com';
  adminUser.password = 'adminAd24@';
  adminUser.isAdmin = true;
  await adminUser.save();

  const regularUser1 = new UserEntity();
  regularUser1.name = 'Amit';
  regularUser1.email = 'amit@gmail.com';
  regularUser1.password = 'amitAm24@';
  await regularUser1.save();

  const regularUser2 = new UserEntity();
  regularUser2.name = 'Rohan';
  regularUser2.email = 'rohan@gmail.com';
  regularUser2.password = 'rohanRo24@';
  await regularUser2.save();

  const regularUser3 = new UserEntity();
  regularUser3.name = 'Sumit';
  regularUser3.email = 'sumit@gmail.com';
  regularUser3.password = 'sumitSo24@';
  await regularUser3.save();

  for (let i = 1; i < 100; i++) {
    const review = new ReviewEntity();
    review.rating = _.random(1, 5, false);
    review.userId = _.random(2, 4, false);
    const name = await UserEntity.findOne(review.userId)
    review.name = name.name;
    review.comment = `Review at ${i}`;
    review.restaurantId = _.random(1, 24, false);
    const randomDay = _.random(0, 10, false);
    review.dateOfVisit = moment()
      .subtract(randomDay, 'day')
      .format('YYYY-MM-DD');
    await review.save();
  }
}
bootstrap();
