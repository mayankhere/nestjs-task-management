
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "src/tasks/task.entity";
import { takeCoverage } from "v8";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})
    username: string;

    @Column()
    password:string

    @OneToMany(type => Task, task => task.user,{eager:true})
    tasks: Task[];

}