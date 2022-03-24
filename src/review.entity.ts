import {
  AfterInsert,
  AfterUpdate,
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Entity({ name: 'review' })
export class ReviewEntity extends BaseEntity {
  //ON DELETE RESTAURANT DELETE ENTRIES
  @AfterInsert()
  @AfterUpdate()
  async onAddOrUpdate() {
    // console.log(this)
    const resId = this.restaurantId;
    const res = await RestaurantEntity.findOne(resId);
    const reviews = await ReviewEntity.find({
      where: { restaurantId: this.restaurantId },
    });

    // console.log(reviews, '===================')
    const totalRating = reviews.reduce(
      (totalRating, review) => review.rating + totalRating,
      0,
    );

    const avgRating =
      reviews.length === 0
        ? 0
        : Number(Number(totalRating / reviews.length).toFixed(2));
    res.averageRating = avgRating;
    await res.save();
  }

  @PrimaryGeneratedColumn() id: number;
  @Column() restaurantId: number;
  @Column() name: string;
  @Column() userId: number;
  @Column() comment: string;
  @Column() rating: number;
  @Column() dateOfVisit: string;
}
