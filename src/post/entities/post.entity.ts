import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { User } from "src/user/entities/user.entity"; // Asegúrate de que la ruta sea correcta
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "Identificador único de la publicación" })
    postId: number;

    @Column()
    @ApiProperty({ description: "Título de la publicación" })
    title: string;

    @Column('text')
    @ApiProperty({ description: "Contenido de la publicación" })
    content: string;

    @Column({ default: 0 })
    @ApiProperty({ description: "Cantidad de 'me gusta' de la publicación", default: 0 })
    likes: number;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: "userId" })
    @ApiProperty({ description: "Usuario que creó la publicación" })
    user: User;

    @CreateDateColumn()
    @ApiProperty({ description: "Fecha de creación de la publicación" })
    createAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: "Fecha de última actualización de la publicación" })
    updateAt: Date;

    @DeleteDateColumn()
    @ApiProperty({ description: "Fecha de última actualización del usuario" })
    deleteAt:Date

}