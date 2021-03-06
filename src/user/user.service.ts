import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import {sign} from 'jsonwebtoken';
import { JWT_SECRET } from "src/config";
import { UserResposeInterface } from "./types/userResponse.interface";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity> ){}


    async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{
        const newUser = new UserEntity();
        Object.assign(newUser,createUserDto);
        return await this.userRepository.save(newUser);
    }
    
    buildUserResponse(user: UserEntity): UserResposeInterface{
        return {
            user:{
                ...user,
                token: this.generateJwt(user)
            }
        }
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email
        },
            JWT_SECRET
        );
    }

}