import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository, TypeORMError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {};

  async create(createPostDto: CreatePostDto) {
    try {
      const post = this.postRepo.create(createPostDto);
      await this.postRepo.save(post);
      return post;
    } catch (error) {
      console.log(TypeORMError,error)
      throw new Error('Error al crear el post');
    }
  }

  findAll(): Promise<Post[]> {
    return this.postRepo.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.postRepo.findOneBy({ postId: id });
      if (!user) {
        throw new Error(`Post con ID ${id} no encontrado`); // Considera usar NotFoundException
      }
      return user;
    } catch (error) {
      console.error(error); // Registro adecuado del error
      throw new NotFoundException(`Post con ID ${id} no encontrado`);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const user = await this.postRepo.preload({
      postId: id,
      ...updatePostDto,
    });
  
    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
  
    return this.postRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.postRepo.findOneBy({ postId: id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    user.deleteAt = new Date();
    await this.postRepo.save(user);
  }
}
