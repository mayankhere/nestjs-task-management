import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-paylod.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository:UsersRepository,
        private jwtService : JwtService
    ){}

    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken : string}>{
        const { username,password}= authCredentialsDto;
        //finding out if the user exists

        const user= await this.usersRepository.findOne({username});

        if(user && (await bcrypt.compare(password,user.password))){
            // return 'success'
            //this is where we will create a JWToken, since the authentication is successfull.

            const payload : JwtPayload = {username};
            const accessToken : string= await this.jwtService.sign(payload);
            //next step is to return that token, but common practice is to return it using an object.
            return {accessToken};
        }
        else{
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
