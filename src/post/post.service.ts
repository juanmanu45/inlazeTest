import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository, TypeORMError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    private readonly userService: UserService
  ) {};

  async create(createPostDto: CreatePostDto,user:any) {
    try {
     
      const userObj = await this.userService.findOneEmail(user.email);

      if(userObj!){
       createPostDto.user=userObj;
      }
      const post = this.postRepo.create(createPostDto);
      await this.postRepo.save(post);
      return post;
    } catch (error) {
      console.log(TypeORMError,error)
      throw new Error('Error al crear el post');
    }
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepo.createQueryBuilder('post')
    .innerJoinAndSelect('post.user', 'user')
    .select('post') 
    .addSelect('user.fullName') 
    .getMany();
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
