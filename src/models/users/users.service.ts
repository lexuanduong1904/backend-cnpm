import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly usersModel: typeof User,
  ) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  // findAll() {
  //   return `This action returns all users`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async findByUsername(username: string): Promise<User> {
    return await this.usersModel.findOne({
      where: { username: username },
    });
  }

  async handleRegister(values: CreateUserDto) {
    //Check username
    if (await this.findByUsername(values.username))
      throw new BadRequestException(
        `${values.username} was used. Please use other username!`,
      );

    // Create new user
    const user = this.usersModel.build({
      ...values,
    });
    const newUser = await user.save();

    // Get info new user
    return await this.usersModel.findByPk(newUser.id, {
      attributes: {
        exclude: ['password', 'isAdmin', 'createdAt', 'updatedAt'],
      },
    });
  }

  async handleLogin(values) {}
}
