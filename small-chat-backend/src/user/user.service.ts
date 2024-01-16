import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JoinInput } from './inputs/user.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async loginOrCreateUser(input: JoinInput) {
    const user = await this.userModel.findOne({ nickname: input.nickname });
    if (!!user) {
      const { userId, nickname } = user;
      return {
        userId,
        nickname,
      };
    }
    const savedUser = await new this.userModel({
      userId: uuid(),
      nickname: input.nickname,
    }).save();
    const { userId, nickname } = savedUser;
    return {
      userId,
      nickname,
    };
  }
}
