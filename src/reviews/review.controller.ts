import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../Guards/auth.guard';
import { AdminGuard } from '../Guards/admin.guard';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(
    @Param('id') reviewId: number,
    @Body('rating') rating: number,
    @Body('comment') comment: string,
    @Body('dateOfVisit') dateOfVisit: string,
    @Req() req,
  ) {

    return this.reviewService.update(
      reviewId,
      rating,
      comment,
      dateOfVisit,
      req.user,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteReview(@Param('id') reviewId: number, @Req() req) {
    return this.reviewService.delete(reviewId, req.user);
  }

  
}
