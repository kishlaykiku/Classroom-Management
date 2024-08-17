import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TimetableDocument = Timetable & Document;

@Schema()
export class Timetable {
    @Prop({ required: true })
    subject: string;

    @Prop({ required: true })
    startTime: string; // Consider using Date type for exact time management

    @Prop({ required: true })
    endTime: string; // Consider using Date type for exact time management

    @Prop({ required: true })
    day: string;

    @Prop({ type: String, ref: 'Classroom' }) // Reference to Classroom
    classroomId: string;
}

export const TimetableSchema = SchemaFactory.createForClass(Timetable);