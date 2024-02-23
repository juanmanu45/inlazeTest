import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, Min, IsOptional } from "class-validator";

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
  
}
