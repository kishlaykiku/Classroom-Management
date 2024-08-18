import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: ['Principal', 'Teacher', 'Student'] })
    role: string;

    @Prop({ type: String, ref: 'Classroom', default: null }) // Reference to Classroom
    classroomId: string | null;

    @Prop({ type: String, ref: 'Classroom', default: null })
    teacherClassroomId: string | null; // Classroom assigned to the teacher

    @Prop({ type: [String], ref: 'User', default: [] })
    students: string[]; // Students assigned to the teacher
}

export const UserSchema = SchemaFactory.createForClass(User);