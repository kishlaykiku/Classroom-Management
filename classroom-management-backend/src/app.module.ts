import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { TimetablesModule } from './timetables/timetables.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        UsersModule,
        ClassroomsModule,
        TimetablesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
