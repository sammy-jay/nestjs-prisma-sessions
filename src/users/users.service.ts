import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (user) return user;

    throw new BadRequestException('User with this email does not exist.');
  }

  async getById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (user) return user;

    throw new BadRequestException('User with this id does not exist.');
  }

  async createUser(user: CreateUserDto) {
    try {
      const newUser = await this.prismaService.user.create({
        data: user,
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2002')
        throw new BadRequestException('User with this email already exist.');
    }
  }

  async getUsers() {
    return await this.prismaService.user.findMany({});
  }
}
