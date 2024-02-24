import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, Min, IsOptional, IsNumber } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreatePostDto {
    @ApiProperty({ description: 'Título de la publicación' })
    @IsString()
    title: string;
  
    @ApiProperty({ description: 'Contenido de la publicación' })
    @IsString()
    content: string;
  
    @ApiProperty({ description: 'Cantidad inicial de "me gusta" de la publicación', default: 0 })
    @IsInt()
    @Min(0)
    @IsOptional()
    likes?: number = 0;

    @ApiProperty({ description: 'Usuario dueño del post', default: 0 })
    @IsNumber()
    @IsOptional()
    user?: User ;
  
  
}
