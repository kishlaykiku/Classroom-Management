import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Classroom, ClassroomDocument } from './classroom.schema';

@Injectable()
export class ClassroomsService {
    constructor(@InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>) {}

    // Create a new classroom
    async createClassroom(createClassroomDto: any): Promise<Classroom> {
        const newClassroom = new this.classroomModel(createClassroomDto);
        return newClassroom.save();
    }

    // Find all classrooms
    async findAll(): Promise<Classroom[]> {
        return this.classroomModel.find().exec();
    }

    // Find a classroom by ID
    async findOne(id: string): Promise<Classroom> {
        return this.classroomModel.findById(id).exec();
    }

    // Update a classroom by ID
    async updateClassroom(id: string, updateClassroomDto: any): Promise<Classroom> {
        return this.classroomModel.findByIdAndUpdate(id, updateClassroomDto, { new: true }).exec();
    }

    // Delete a classroom by ID
    async deleteClassroom(id: string): Promise<Classroom> {
        return this.classroomModel.findByIdAndDelete(id).exec();
    }
}