import { IsString, IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMcpServerDto {
  @ApiProperty({ example: 'OpenAI MCP Server', maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'openai-mcp-server', maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  slug: string;

  @ApiPropertyOptional({ example: 'AI Assistant', maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  classification?: string;

  @ApiPropertyOptional({ example: '2024-01-15', maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  releaseDate?: string;

  @ApiPropertyOptional({ example: 'OpenAI', maxLength: 255 })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  provider?: string;

  @ApiPropertyOptional({ example: 'https://github.com/openai/mcp-server', maxLength: 100 })
  @IsString()
  @IsOptional()
  @IsUrl()
  @MaxLength(100)
  githubRepo?: string;

  @ApiPropertyOptional({ example: 'A powerful MCP server for AI interactions', maxLength: 255 })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @ApiProperty({ example: 'https://mcp.openai.com', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @MaxLength(100)
  url: string;
}


