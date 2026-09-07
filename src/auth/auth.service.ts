import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    @Inject()
    private readonly userService: UserService;

    async signin(params: Prisma.UserCreateInput){
        const user = await this.userService.user({ email: params.email});
        if (!user){
            throw new NotFoundException('User not found');  
        }
        
        const passwordMatch = await bcrypt.compare(params.passwordHash, user.passwordHash);
        if (!passwordMatch) throw new UnauthorizedException('Invalid credentials') 

        const { passwordHash, ...result} = user;
        
        return result;
    }
}
