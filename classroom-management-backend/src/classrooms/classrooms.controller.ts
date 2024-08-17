import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { Classroom } from './classroom.schema';

@Controller('classrooms')
export class ClassroomsController {
    constructor(private readonly classroomsService: ClassroomsService) {}

    @Post()
    async create(@Body() createClassroomDto: any): Promise<Classroom> {
        return this.classroomsService.createClassroom(createClassroomDto);
    }

    @Get()
    async findAll(): Promise<Classroom[]> {
        return this.classroomsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Classroom> {
        return this.classroomsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateClassroomDto: any): Promise<Classroom> {
        return this.classroomsService.updateClassroom(id, updateClassroomDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Classroom> {
        return this.classroomsService.deleteClassroom(id);
    }
}