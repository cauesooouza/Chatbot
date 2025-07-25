import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    name: string;

    @Column("varchar", { unique: true })
    email: string;

    @Column("varchar", { select: false })
    password: string;
}   