import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(post: CreatePostDto) {
    return await this.prismaService.post.create({
      data: {
        ...post,
        author: {
          connect: { id: 1 },
        },
      },
    });
  }

  async getPosts() {
    return await this.prismaService.post.findMany({
      include: { categories: true },
    });
  }

  async getPostById(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post with id ' + id + ' not found');
    }
    return post;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    try {
      return await this.prismaService.post.update({
        where: {
          id,
        },
        data: { ...post },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Post with id ' + id + ' not found');
      }
      throw error;
    }
  }

  async deletePost(id: number) {
    try {
      const post = await this.prismaService.post.delete({
        where: {
          id,
        },
      });
      return;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Post with id ' + id + ' not found');
      }
      throw error;
    }
  }
}
