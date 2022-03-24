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
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  loginUser(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.loginUser(email, password);
  }


  @Post('/signup')
  signupUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('isAdmin') isAdmin: boolean
  ) {
    return this.userService.signupUser(name, email, password, isAdmin);
  }


  @Post('')
  addUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.addUser(name, email, password);
  }

  @UseGuards(AdminGuard)
  @Patch('/updateUser/:id')
  updateUser(
    @Param('id') userId: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Req() req
  ){
    return this.userService.updateUser(userId, name, email, password, req.user);
  }

  @Get('/allUsers')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
