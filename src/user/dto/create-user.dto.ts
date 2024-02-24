import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNumber, IsString, Max, Min } from "class-validator";
import { Post } from "src/post/entities/post.entity";

export class CreateUserDto {
    @ApiProperty({ description: 'Nombre completo del usuario' })
    @IsString()
    fullname: string;
  
    @ApiProperty({ description: 'Edad del usuario' })
    @IsNumber()
    @Min(0)
    @Max(120)
    age: number;
  
    @ApiProperty({ description: 'Correo electrónico del usuario' })
    @IsEmail()
    email: string;
  
    @ApiProperty({ description: 'Contraseña del usuario' })
    @IsString()
    password: string;

}
