import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hash} from 'bcrypt';


@Entity({name: 'users'})
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    email: string;

    @Column()
    username: string;

    @Column({default: ''})
    bio:string;

    @Column({default: ''})
    image: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword(){
        // salt of 10
        this.password = await hash(this.password, 10);
    }
}