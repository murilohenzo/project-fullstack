import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("levels")
export class Level {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: "20", unique: true })
  level: string;
}
