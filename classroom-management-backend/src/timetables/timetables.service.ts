import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timetable, TimetableDocument } from './timetable.schema';
import { Classroom, ClassroomDocument } from '../classrooms/classroom.schema';

@Injectable()
export class TimetablesService {
    constructor(
        @InjectModel(Timetable.name) private timetableModel: Model<TimetableDocument>,
        @InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>,
    ) {}

    async findAll(): Promise<Timetable[]> {
        return this.timetableModel.find().exec();
    }

    async findOne(id: string): Promise<Timetable> {
        return this.timetableModel.findById(id).exec();
    }

    async updateTimetable(id: string, updateTimetableDto: any): Promise<Timetable> {
        return this.timetableModel.findByIdAndUpdate(id, updateTimetableDto, { new: true }).exec();
    }

    async deleteTimetable(id: string): Promise<Timetable> {
        return this.timetableModel.findByIdAndDelete(id).exec();
    }

    async createTimetable(createTimetableDto: any): Promise<Timetable> {
        const classroom = await this.classroomModel.findById(createTimetableDto.classroomId);
        if (!classroom) {
            throw new BadRequestException("Classroom not found");
        }

        // Validate the timetable period within classroom hours
        const { startTime, endTime, classroomId, day } = createTimetableDto;

        // Ensure no overlapping periods in the same classroom on the same day
        const overlapping = await this.timetableModel.findOne({
            classroomId: classroomId,
            day: day,
            $or: [
                {
                    startTime: { $lt: endTime, $gte: startTime }
                },
                {
                    endTime: { $gt: startTime, $lte: endTime }
                },
                {
                    startTime: { $lte: startTime },
                    endTime: { $gte: endTime }
                }
            ],
        });

        if (overlapping) {
            throw new BadRequestException("Timetable period overlaps with another period in the same classroom.");
        }

        const newTimetable = new this.timetableModel(createTimetableDto);
        return newTimetable.save();
    }
}