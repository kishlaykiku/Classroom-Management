import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { UsersService } from './users/users.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    const usersService = app.get(UsersService);
    const principalEmail = 'principal@classroom.com';
    const principalExists = await usersService.findByEmail(principalEmail);
    
    if (!principalExists) {
        await usersService.createUser({
            name: 'Principal',
            email: principalEmail,
            password: 'Admin',
            role: 'Principal'
        });
    }

    await app.listen(3000);
}
bootstrap();
