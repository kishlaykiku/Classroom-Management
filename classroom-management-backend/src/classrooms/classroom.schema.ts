import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClassroomDocument = Classroom & Document;

@Schema()
export class Classroom {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    startTime: string; // Consider using Date type for exact time management

    @Prop({ required: true })
    endTime: string; // Consider using Date type for exact time management

    @Prop({ required: true, type: [String] })
    days: string[];

    @Prop({ type: String, ref: 'User', default: null }) // Reference to Teacher
    teacherId: string | null;

    @Prop({ type: [String], ref: 'User', default: [] }) // Reference to Students
    students: string[];
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);