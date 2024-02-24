import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty({ description: 'Título de la publicación', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ description: 'Contenido de la publicación', required: false })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiProperty({ description: 'Cantidad de "me gusta" de la publicación', required: false })
    @IsInt()
    @Min(0)
    @IsOptional()
    likes?: number;
}
