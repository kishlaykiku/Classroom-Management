import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: any): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Put(':teacherId/assign-student')
  async assignStudentToTeacher(
    @Param('teacherId') teacherId: string,
    @Body('studentId') studentId: string
  ): Promise<User> {
    return this.usersService.assignStudentToTeacher(teacherId, studentId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}