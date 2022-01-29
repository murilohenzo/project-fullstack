import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("developers")
export class Developers {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  level: string

  @Column({ length: 500 })
  name: string

  @Column()
  sex: string;

  @Column('date')
  birthDate: Date

  @Column()
  age: number;

  @Column({ length: 1000 })
  hobby: string
}