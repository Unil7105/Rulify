import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('rules')
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id' })
  @Index('rules_idx_category_id')
  categoryId: number;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  slug: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @Index('rules_unique_url', { unique: true })
  url: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true, name: 'content_preview' })
  contentPreview: string | null;

  @ManyToOne(() => Category, (category) => category.rules)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}


