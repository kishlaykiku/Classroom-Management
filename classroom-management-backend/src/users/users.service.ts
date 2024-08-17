import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(userDto: any): Promise<User> {
        const newUser = new this.userModel(userDto);
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async updateUser(id: string, userDto: any): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, userDto, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}