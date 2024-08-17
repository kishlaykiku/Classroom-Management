import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TimetablesService } from './timetables.service';
import { Timetable } from './timetable.schema';

@Controller('timetables')
export class TimetablesController {
    constructor(private readonly timetablesService: TimetablesService) {}

    @Post()
    async create(@Body() createTimetableDto: any): Promise<Timetable> {
        return this.timetablesService.createTimetable(createTimetableDto);
    }

    @Get()
    async findAll(): Promise<Timetable[]> {
        return this.timetablesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Timetable> {
        return this.timetablesService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTimetableDto: any): Promise<Timetable> {
        return this.timetablesService.updateTimetable(id, updateTimetableDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Timetable> {
        return this.timetablesService.deleteTimetable(id);
    }
}