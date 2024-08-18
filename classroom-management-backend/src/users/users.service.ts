import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    // Create a new user
    async createUser(userDto: any): Promise<User> {
        const newUser = new this.userModel(userDto);
        return newUser.save();
    }

    // Find all existing users
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    // Find a user by ID
    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    // Find a user by email
    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }

    // Update a user by ID
    async updateUser(id: string, userDto: any): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, userDto, { new: true }).exec();
    }

    // Delete a user by ID
    async deleteUser(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    // Assign a student to a teacher
    async assignStudentToTeacher(teacherId: string, studentId: string): Promise<User> {
        const teacher = await this.userModel.findById(teacherId);
        teacher.students.push(studentId);
        await teacher.save();
    
        return teacher;
    }
}