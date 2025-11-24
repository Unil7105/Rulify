import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { McpServersService } from './mcp-servers.service';
import { CreateMcpServerDto } from './dto/create-mcp-server.dto';
import { UpdateMcpServerDto } from './dto/update-mcp-server.dto';

@ApiTags('mcp-servers')
@Controller('mcp-servers')
export class McpServersController {
  constructor(private readonly mcpServersService: McpServersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new MCP server' })
  @ApiResponse({ status: 201, description: 'MCP server created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createMcpServerDto: CreateMcpServerDto) {
    return this.mcpServersService.create(createMcpServerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all MCP servers or search MCP servers' })
  @ApiQuery({ name: 'q', required: false, description: 'Search query' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page', type: Number })
  @ApiResponse({ status: 200, description: 'List of MCP servers' })
  findAll(
    @Query('q') query?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    if (query) {
      return this.mcpServersService.search(query);
    }
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 12;
    return this.mcpServersService.findAll(pageNum, limitNum);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search MCP servers' })
  @ApiQuery({ name: 'q', required: true, description: 'Search query' })
  @ApiResponse({ status: 200, description: 'Search results' })
  search(@Query('q') query: string) {
    return this.mcpServersService.search(query);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a single MCP server by slug' })
  @ApiResponse({ status: 200, description: 'MCP server found' })
  @ApiResponse({ status: 404, description: 'MCP server not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.mcpServersService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single MCP server by ID' })
  @ApiResponse({ status: 200, description: 'MCP server found' })
  @ApiResponse({ status: 404, description: 'MCP server not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mcpServersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an MCP server' })
  @ApiResponse({ status: 200, description: 'MCP server updated successfully' })
  @ApiResponse({ status: 404, description: 'MCP server not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMcpServerDto: UpdateMcpServerDto,
  ) {
    return this.mcpServersService.update(id, updateMcpServerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an MCP server' })
  @ApiResponse({ status: 204, description: 'MCP server deleted successfully' })
  @ApiResponse({ status: 404, description: 'MCP server not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mcpServersService.remove(id);
  }
}


