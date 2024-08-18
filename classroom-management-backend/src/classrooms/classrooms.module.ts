import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Classroom, ClassroomSchema } from './classroom.schema';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Classroom.name, schema: ClassroomSchema }]), UsersModule],
    providers: [ClassroomsService],
    controllers: [ClassroomsController],
    exports: [ClassroomsService, MongooseModule],
})
export class ClassroomsModule {}