import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Rule } from './entities/rule.entity';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
  ) {}

  async create(createRuleDto: CreateRuleDto): Promise<Rule> {
    const rule = this.ruleRepository.create(createRuleDto);
    return await this.ruleRepository.save(rule);
  }

  async findAll(): Promise<Rule[]> {
    return await this.ruleRepository.find({
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByCategory(categoryId: number): Promise<Rule[]> {
    return await this.ruleRepository.find({
      where: { categoryId },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Rule> {
    const rule = await this.ruleRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!rule) {
      throw new NotFoundException(`Rule with ID ${id} not found`);
    }

    return rule;
  }

  async findBySlug(slug: string): Promise<Rule> {
    const rule = await this.ruleRepository.findOne({
      where: { slug },
      relations: ['category'],
    });

    if (!rule) {
      throw new NotFoundException(`Rule with slug ${slug} not found`);
    }

    return rule;
  }

  async update(id: number, updateRuleDto: UpdateRuleDto): Promise<Rule> {
    const rule = await this.findOne(id);
    Object.assign(rule, updateRuleDto);
    return await this.ruleRepository.save(rule);
  }

  async remove(id: number): Promise<void> {
    const rule = await this.findOne(id);
    await this.ruleRepository.remove(rule);
  }

  async search(query: string): Promise<Rule[]> {
    const searchTerm = `%${query}%`;
    return await this.ruleRepository.find({
      where: [
        { title: Like(searchTerm) },
        { slug: Like(searchTerm) },
        { content: Like(searchTerm) },
        { contentPreview: Like(searchTerm) },
      ],
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }
}


