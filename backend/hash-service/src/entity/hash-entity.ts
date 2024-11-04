import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Hash {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "text", unique: true, nullable: false})
  hash!: string;

  @CreateDateColumn({type: "timestamp"})
  createdAt!: Date;
  
  @Column({nullable: false, unique:true})
  pasteId!: number;
}