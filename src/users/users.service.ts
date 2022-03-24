import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../users.entity';
import * as Jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  async signupUser(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
  ) {
    const user = new UserEntity();
    const existingUser = await UserEntity.findOne({ email });

    if (!existingUser) {
      user.name = name;
      user.email = email;
      user.password = password;
      user.isAdmin = isAdmin;
      await user.save();
      return user;
    } else {
      throw new NotFoundException('User already exists');
    }
  }

  async loginUser(email: string, password: string) {
    const user = await UserEntity.findOne({ email });
    if (user && user.password === password) {
      return {
        user,
        jwt: Jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' }),
      };
    } else {
      throw new NotFoundException('Could not found any such user!');
    }
  }

  async addUser(name: string, email: string, password: string) {
    const user = new UserEntity();
    const existingUser = await UserEntity.findOne({ email });

    if (!existingUser) {
      user.name = name;
      user.email = email;
      user.password = password;
      await user.save();
      return user;
    } else {
      throw new NotFoundException("User already exists, can't add");
    }
  }

  async updateUser(id: number, name: string, email: string, password: string, authUser: UserEntity) {
    const foundUser = await UserEntity.findOne({ id });
    
    if (foundUser) {
      if (email) {
        foundUser.email = email;
      }

      if (name) {
        foundUser.name = name;
      }

      if (password) {
        foundUser.password = password;
      }
    } else {
      throw new NotFoundException('No such user found');
    }

    await foundUser.save();
    return foundUser;
  }

  async deleteUser(userId: number) {
    const deleteUser = await UserEntity.findOne(userId);

    if (deleteUser) {
      await deleteUser.remove();
    } else {
      throw new NotFoundException('No such user found');
    }
  }

  async getAllUsers(): Promise<Array<any>> {
    const users = await UserEntity.find();

    const allUsers = users.map((user) => user);

    return allUsers;
  }
}
