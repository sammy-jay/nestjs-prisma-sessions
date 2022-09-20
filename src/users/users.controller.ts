import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  //   @Get(':id')
  //   getPostById(@Param('id') id: number) {
  //     return this.usersService.getUserById(Number(id));
  //   }

  @Post()
  async createPost(@Body() post: CreateUserDto) {
    return this.usersService.createUser(post);
  }
}
