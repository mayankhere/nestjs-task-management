import { userInfo } from "os";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status:TaskStatus

    //Many tasks for one user
    @ManyToOne(type => User,user => user.tasks,{eager:false})
    user: User;




}