import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from './user.entity'
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User>
{
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        //hash
        //generating the salt first
        const salt= await bcrypt.genSalt();
        const hashedPassword= await bcrypt.hash(password,salt);

        // console.log('Salt',salt);
        // console.log('HashedPassword',hashedPassword);
        const user = this.create({ username, password : hashedPassword });

        try {
            await this.save(user);
        }
        catch(error){
            
            if (Number(error.code) === 23505)//duplicate username
                throw new ConflictException('Username Already Exists');
            else    
                {
                    
                throw new InternalServerErrorException();
                }
        }
    }
}