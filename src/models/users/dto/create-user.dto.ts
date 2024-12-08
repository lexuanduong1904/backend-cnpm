import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is not empty!' })
  username: string;

  @IsNotEmpty({ message: 'Email is not empty!' })
  email: string;

  @IsNotEmpty({ message: 'Password is not empty!' })
  password: string;

  @IsNotEmpty({ message: 'Phone number is not empty!' })
  phoneNumber: string;
}
