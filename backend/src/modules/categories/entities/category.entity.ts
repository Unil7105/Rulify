import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Rule } from '../../rules/entities/rule.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index('categories_unique_name', { unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index('categories_unique_slug', { unique: true })
  slug: string;

  @OneToMany(() => Rule, (rule) => rule.category)
  rules: Rule[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}


