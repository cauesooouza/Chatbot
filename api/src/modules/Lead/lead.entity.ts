import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Lead {
    @PrimaryColumn({ type: "int", unique: true })
    id: number;

    @Column({ type: "varchar" })
    firstName: string;

    @Column({ type: "varchar" })
    lastName: string;

    @Column({ type: "boolean" })
    isBot: boolean;

    @Column({ type: "varchar" })
    username: string;

    @Column({ type: "varchar" })
    languageCode: string;

    @Column({ type: "varchar", nullable: true })
    lastInteraction: string;

    @CreateDateColumn({ type: "datetime" })
    createdAt: Date;

    @UpdateDateColumn({ type: "datetime" })
    updateAt: Date;
} 
