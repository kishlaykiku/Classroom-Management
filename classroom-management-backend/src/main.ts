import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { UsersService } from './users/users.service';

import * as bcrypt from 'bcryptjs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const frontendUrl = configService.get<string>('FRONTEND_URL');

    app.enableCors({
        origin: frontendUrl,  // Replace with your frontend's URL and port
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,  // If you need to allow credentials (cookies, etc.)
    });

    const usersService = app.get(UsersService);
    const principalEmail = 'principal@classroom.com';
    const principalExists = await usersService.findByEmail(principalEmail);
    
    if (!principalExists) {
        const hashedPassword = await bcrypt.hash('Admin', 10);
        await usersService.createUser({
            name: 'Principal',
            email: principalEmail,
            password: hashedPassword,
            role: 'Principal'
        });
        console.log('Principal account created with hashed password.');
    } else {
        console.log('Principal account already exists.');
    }

    await app.listen(3000);
}
bootstrap();
