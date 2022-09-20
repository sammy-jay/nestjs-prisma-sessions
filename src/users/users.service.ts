import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import validate from 'deep-email-validator';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: CreateUserDto) {
    const address = user?.address;
    return this.prismaService.user.create({
      data: {
        ...user,
        address: {
          create: address,
        },
      },
      select: {
        name: true,
        email: true,
        address: {
          select: {
            street: true,
          },
        },
      },
    });
  }

  async getUsers() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        address: {
          select: {
            city: true,
            country: true,
          },
        },
        posts: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }
}
