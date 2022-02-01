import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Level } from "../../../../levels/infra/orm/entities/Level";

@Entity("developers")
export class Developer {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  level_id: number;

  @ManyToOne(() => Level)
  @JoinColumn({ name: "level_id", referencedColumnName: "id" })
  level: Level;

  @Column({ length: 500 })
  name: string;

  @Column()
  sex: string;

  @Column("date")
  birth_date: Date;

  @Column()
  age: number;

  @Column({ length: 1000 })
  hobby: string;
}
