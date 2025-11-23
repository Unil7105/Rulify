import { IsString, IsNotEmpty, IsInt, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRuleDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ example: 'Rule Title', maxLength: 500 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  title: string;

  @ApiProperty({ example: 'rule-title', maxLength: 500 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  slug: string;

  @ApiProperty({ example: 'https://example.com/rule', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @MaxLength(100)
  url: string;

  @ApiProperty({ example: 'Full content of the rule...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ example: 'Preview text...' })
  @IsString()
  @IsOptional()
  contentPreview?: string;
}


