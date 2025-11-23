import { ApiProperty } from '@nestjs/swagger';

export class McpServerResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ nullable: true, required: false })
  classification: string | null;

  @ApiProperty({ nullable: true, required: false })
  releaseDate: string | null;

  @ApiProperty({ nullable: true, required: false })
  provider: string | null;

  @ApiProperty({ nullable: true, required: false })
  githubRepo: string | null;

  @ApiProperty({ nullable: true, required: false })
  description: string | null;

  @ApiProperty()
  url: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}


