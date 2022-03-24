import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() email: string;
  @Column() password: string;
  @Column({ default: false }) isAdmin: boolean;
  @Column() name: string;
}
