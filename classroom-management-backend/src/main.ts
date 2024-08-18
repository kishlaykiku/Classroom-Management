import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { UsersService } from './users/users.service';

import * as bcrypt from 'bcryptjs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
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
