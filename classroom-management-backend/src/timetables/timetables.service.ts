import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timetable, TimetableDocument } from './timetable.schema';

@Injectable()
export class TimetablesService {
    constructor(@InjectModel(Timetable.name) private timetableModel: Model<TimetableDocument>) {}

    // Create a new timetable entry
    // async createTimetable(createTimetableDto: any): Promise<Timetable> {
    //     const newTimetable = new this.timetableModel(createTimetableDto);
    //     return newTimetable.save();
    // }

    // Find all timetable entries
    async findAll(): Promise<Timetable[]> {
        return this.timetableModel.find().exec();
    }

    // Find a timetable entry by ID
    async findOne(id: string): Promise<Timetable> {
        return this.timetableModel.findById(id).exec();
    }

    // Update a timetable entry by ID
    async updateTimetable(id: string, updateTimetableDto: any): Promise<Timetable> {
        return this.timetableModel.findByIdAndUpdate(id, updateTimetableDto, { new: true }).exec();
    }

    // Delete a timetable entry by ID
    async deleteTimetable(id: string): Promise<Timetable> {
        return this.timetableModel.findByIdAndDelete(id).exec();
    }

    // Find all timetable entries for a classroom
    async createTimetable(createTimetableDto: any): Promise<Timetable> {
        const classroom = await this.classroomModel.findById(createTimetableDto.classroomId);
    
        // Validate the timetable period
        const { startTime, endTime } = createTimetableDto;
        if (startTime < classroom.startTime || endTime > classroom.endTime) {
            throw new Error("Timetable period must be within the classroom's start and end time.");
        }
    
        // Ensure no overlap
        const overlapping = await this.timetableModel.find({
            classroomId: createTimetableDto.classroomId,
            day: createTimetableDto.day,
            $or: [
                { startTime: { $lt: endTime, $gt: startTime } },
                { endTime: { $lt: endTime, $gt: startTime } },
            ],
        });
        
        if (overlapping.length > 0) {
            throw new Error("Timetable period overlaps with another period.");
        }
    
        const newTimetable = new this.timetableModel(createTimetableDto);
        return newTimetable.save();
    }
}