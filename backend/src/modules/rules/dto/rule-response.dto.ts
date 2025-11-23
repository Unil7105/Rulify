import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '../../categories/dto/category-response.dto';

export class RuleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ nullable: true, required: false })
  contentPreview: string | null;

  @ApiProperty({ type: CategoryResponseDto, required: false })
  category?: CategoryResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}


