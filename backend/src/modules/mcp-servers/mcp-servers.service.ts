import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { McpServer } from './entities/mcp-server.entity';
import { CreateMcpServerDto } from './dto/create-mcp-server.dto';
import { UpdateMcpServerDto } from './dto/update-mcp-server.dto';

@Injectable()
export class McpServersService {
  constructor(
    @InjectRepository(McpServer)
    private readonly mcpServerRepository: Repository<McpServer>,
  ) {}

  async create(createMcpServerDto: CreateMcpServerDto): Promise<McpServer> {
    const mcpServer = this.mcpServerRepository.create(createMcpServerDto);
    return await this.mcpServerRepository.save(mcpServer);
  }

  async findAll(): Promise<McpServer[]> {
    return await this.mcpServerRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<McpServer> {
    const mcpServer = await this.mcpServerRepository.findOne({
      where: { id },
    });

    if (!mcpServer) {
      throw new NotFoundException(`MCP Server with ID ${id} not found`);
    }

    return mcpServer;
  }

  async update(
    id: number,
    updateMcpServerDto: UpdateMcpServerDto,
  ): Promise<McpServer> {
    const mcpServer = await this.findOne(id);
    Object.assign(mcpServer, updateMcpServerDto);
    return await this.mcpServerRepository.save(mcpServer);
  }

  async remove(id: number): Promise<void> {
    const mcpServer = await this.findOne(id);
    await this.mcpServerRepository.remove(mcpServer);
  }

  async findBySlug(slug: string): Promise<McpServer> {
    const mcpServer = await this.mcpServerRepository.findOne({
      where: { slug },
    });

    if (!mcpServer) {
      throw new NotFoundException(`MCP Server with slug ${slug} not found`);
    }

    return mcpServer;
  }

  async search(query: string): Promise<McpServer[]> {
    const searchTerm = `%${query}%`;
    return await this.mcpServerRepository.find({
      where: [
        { name: Like(searchTerm) },
        { slug: Like(searchTerm) },
        { description: Like(searchTerm) },
        { provider: Like(searchTerm) },
        { classification: Like(searchTerm) },
      ],
      order: { createdAt: 'DESC' },
    });
  }
}


