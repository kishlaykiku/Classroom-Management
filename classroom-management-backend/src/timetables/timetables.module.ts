import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Timetable, TimetableSchema } from './timetable.schema';
import { TimetablesService } from './timetables.service';
import { TimetablesController } from './timetables.controller';
import { ClassroomsModule } from '../classrooms/classrooms.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Timetable.name, schema: TimetableSchema }]), ClassroomsModule],
  providers: [TimetablesService],
  controllers: [TimetablesController],
})
export class TimetablesModule {}