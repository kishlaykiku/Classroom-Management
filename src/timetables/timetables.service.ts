import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timetable, TimetableDocument } from './timetable.schema';

@Injectable()
export class TimetablesService {
    constructor(@InjectModel(Timetable.name) private timetableModel: Model<TimetableDocument>) {}

    // Create a new timetable entry
    async createTimetable(createTimetableDto: any): Promise<Timetable> {
        const newTimetable = new this.timetableModel(createTimetableDto);
        return newTimetable.save();
    }

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
}