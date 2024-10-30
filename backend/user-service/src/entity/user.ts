import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true, nullable: false })
    username!: string;

    @Column({ unique: true, nullable: false })
    email!: string;

    @Column({ nullable: false })
    password!: string;

    @CreateDateColumn({ type: 'timestamp'})
    createdAt!: Date;
}
