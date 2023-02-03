import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Date {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 20 })
  public date: string;

  @Column({ type: 'varchar', length: 120 })
  public description: string;

  @Column({ type: 'varchar', length: 10 })
  public start: string;

  @Column({ type: 'varchar', length: 10 })
  public end: string;
}
