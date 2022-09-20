import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends CreatePostDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
