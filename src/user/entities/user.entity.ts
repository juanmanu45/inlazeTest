import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Post } from "src/post/entities/post.entity"; // Asegúrate de que la ruta sea correcta
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "Identificador único del usuario" })
    userId: number;

    @Column({ type: "varchar" })
    @ApiProperty({ description: "Nombre completo del usuario" })
    fullName: string;

    @Column({ type: "int" })
    @ApiProperty({ description: "Edad del usuario" })
    age: number;

    @Column({ type: "varchar" })
    @ApiProperty({ description: "Correo electrónico del usuario" })
    email: string;

    @Column({ type: "varchar" })
    @ApiProperty({ description: "Contraseña del usuario" })
    password: string;

    @OneToMany(() => Post, post => post.user)
    @ApiProperty({ description: "Publicaciones del usuario", type: () => [Post] })
    posts: Post[];

    @CreateDateColumn()
    @ApiProperty({ description: "Fecha de creación del usuario" })
    createAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: "Fecha de última actualización del usuario" })
    updateAt: Date;

    @DeleteDateColumn()
    @ApiProperty({ description: "Fecha de última actualización del usuario" })
    deleteAt:Date

}