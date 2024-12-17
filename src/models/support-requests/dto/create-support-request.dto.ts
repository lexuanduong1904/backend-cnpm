import { IsNotEmpty } from 'class-validator';

export class CreateSupportRequestDto {
  @IsNotEmpty({ message: 'UserId is not empty!' })
  userId: string;

  @IsNotEmpty({ message: 'Message is not empty!' })
  message: string;
}
