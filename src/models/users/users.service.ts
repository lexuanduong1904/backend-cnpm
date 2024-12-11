import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './model/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ChangePasswordDto } from '@/auth/dto/change-password.dto';
import { comparePasswordHelper, hashPasswordHelper } from '@/helpers/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly usersModel: typeof User,
  ) {}

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

  async findAll(
    current: string,
    pageSize: string,
    filter: string,
    sort: string,
  ) {
    const page = +pageSize || 10;
    const order = sort
      ? [sort.replace('-', ''), sort.startsWith('-') ? 'DESC' : 'ASC']
      : ['createdAt', 'DESC'];
    const offset = ((parseInt(current, 10) || 1) - 1) * page; // Tính offset
    const where = filter
      ? { ...JSON.parse(filter), isAdmin: false }
      : { isAdmin: false }; // Mặc định sort theo `createdAt`
    const data = await this.usersModel.findAndCountAll({
      where: where,
      limit: page,
      offset,
      order: [[order[0], order[1]]],
      attributes: ['id', 'username', 'email', 'phoneNumber'],
    });
    const users = data?.rows;
    const totalItems = data.count;
    const totalPages = Math.ceil(totalItems / page);
    return { users, totalItems, totalPages };
  }

  async findOne(id: string) {
    return await this.usersModel.findByPk(id, {
      attributes: ['id', 'username', 'email', 'phoneNumber'],
    });
  }

  async update(id: string, values: UpdateUserDto) {
    await this.usersModel.update(values, {
      where: { id: id },
    });
    return await this.usersModel.findByPk(id, {
      attributes: ['id', 'username', 'email', 'phoneNumber'],
    });
  }

  async remove(id: string) {
    return await this.usersModel.destroy({
      where: { id: id },
    });
  }

  async handleChangePassword(id: string, values: ChangePasswordDto) {
    const currUser = await this.usersModel.findByPk(id);
    if (!currUser) throw new BadRequestException('User is not exist!');
    if (values.newPassword !== values.rePassword)
      throw new BadRequestException(
        'New password and repeat password must be the same!',
      );
    if (!comparePasswordHelper(values.password, currUser.password))
      throw new BadRequestException('Password is incorrect!');
    return await this.usersModel.update(
      {
        password: await hashPasswordHelper(values.newPassword),
      },
      {
        where: { id: id },
      },
    );
  }
}
