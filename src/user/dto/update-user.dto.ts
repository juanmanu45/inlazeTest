import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Min, Max, IsEmail, IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ description: 'Nombre completo del usuario', required: false })
    @IsString()
    @IsOptional()
    fullname?: string;
  
    @ApiProperty({ description: 'Edad del usuario', required: false })
    @IsNumber()
    @Min(0)
    @Max(120)
    @IsOptional()
    age?: number;
  
    @ApiProperty({ description: 'Correo electrónico del usuario', required: false })
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @ApiProperty({ description: 'Contraseña del usuario', required: false })
    @IsString()
    @IsOptional()
    password?: string;
}
