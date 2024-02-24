import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Usa bcrypt.hash para generar el hash de la contraseña
      const user = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword, // Asigna la contraseña hasheada
      });
      
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      console.error(error); // Mejora el manejo de errores
      throw new Error('Error al crear el usuario.');
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ userId: id });
      if (!user) {
        throw new Error(`Usuario con ID ${id} no encontrado`); // Considera usar NotFoundException
      }
      return user;
    } catch (error) {
      console.error(error); // Registro adecuado del error
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }

  async findOneEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ email: email });
      if (!user) {
        throw new Error(`Usuario con Email ${email} no encontrado`); // Considera usar NotFoundException
      }
      return user;
    } catch (error) {
      console.error(error); // Registro adecuado del error
      throw new NotFoundException(`Usuario con Email ${email} no encontrado`);
    }
  }

  

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      userId: id,
      ...updateUserDto,
    });
  
    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
  
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ userId: id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    user.deleteAt = new Date();
    await this.usersRepository.save(user);
  }
}
