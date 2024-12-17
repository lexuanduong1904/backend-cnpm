import { IsOptional } from 'class-validator';

export class UpdateSupportRequestDto {
  @IsOptional()
  message: string;

  @IsOptional()
  readStatus: boolean;
}
