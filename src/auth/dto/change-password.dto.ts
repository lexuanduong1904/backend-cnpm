import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Current password is not empty!' })
  password: string;

  @IsNotEmpty({ message: 'New password is not empty!' })
  newPassword: string;

  @IsNotEmpty({ message: 'Repeat password is not empty!' })
  rePassword: string;
}
