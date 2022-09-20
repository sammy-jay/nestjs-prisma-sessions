import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(regData: RegistrationDto) {
    const hashedPassword = await bcrypt.hash(regData.password, 10);
    try {
      return this.usersService.createUser({
        ...regData,
        password: hashedPassword,
      });
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided.');
    }
  }

  async verifyPassword(plainTextPassword: string, userHash: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      userHash,
    );
    if (!isPasswordMatching)
      throw new BadRequestException('Wrong credentials provided.');
  }
}
