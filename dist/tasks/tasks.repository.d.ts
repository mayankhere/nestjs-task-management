import { User } from "src/auth/user.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from './task.entity';
export declare class TaskRepository extends Repository<Task> {
    private logger;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
}