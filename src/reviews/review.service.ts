import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { request } from 'http';
import * as Jwt from 'jsonwebtoken';
import { ReviewEntity } from '../review.entity'; //import correctly not include src/
import { UserEntity } from '../users.entity';

@Injectable()
export class ReviewService {
  async update(
    reviewId: number,
    rating,
    comment,
    dateOfVisit,
    authUser: UserEntity,
  ) {
    const review = await ReviewEntity.findOne(reviewId);
    if (review) {
      if (authUser.isAdmin) {
        //only admin can do ths operation
        if(comment){
          review.comment = comment;
        }
        if(rating){
          review.rating = rating;
        }

        if(dateOfVisit){
          review.dateOfVisit = dateOfVisit;
        }
        await review.save();
        return review;
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new NotFoundException('No such review found');
    }
  }

  async delete(reviewId: number, authUser: UserEntity) {
    const review = await ReviewEntity.findOne(reviewId);
    if (review) {
      // if (authUser.isAdmin || authUser.id === userId) {
        //only admin and reviewed user can do ths operation 
        await ReviewEntity.delete(reviewId);
        return 'DELETE SUCCESSFUL';
      // } else {
      //   throw new UnauthorizedException();
      // }
    } else {
      throw new NotFoundException('NO such review found.');
    }
  }
}
