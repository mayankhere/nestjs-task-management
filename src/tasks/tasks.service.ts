import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { filter } from 'rxjs';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    //Injecting The repository class in here 

    constructor(
        @InjectRepository(TaskRepository)
        private tasksRepository: TaskRepository
    ) { }
    
    getTasks(filterDto:GetTasksFilterDto, user : User) : Promise<Task[]>{
        return this.tasksRepository.getTasks(filterDto,user);
    }
        
    async getTaskByID(id: string,user: User): Promise<Task> {

        const found = await this.tasksRepository.findOne({where: {id,user}})
        if (!found)
            throw new NotFoundException('ID not found')
            
        return found;
    }


    async createTask(createTaskDto: CreateTaskDto,user : User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto,user);
    }

    async deleteTaskByID(id : string,user:User):Promise<void>{
        const result=await this.tasksRepository.delete({id,user});
        if(result.affected === 0)
            throw new NotFoundException('ID Not Found');
    }

    async updateTaskStatus(id:string,status:TaskStatus,user:User):Promise<Task>{
        const task=await this.getTaskByID(id,user);
        console.log(task);
        task.status=status;
        console.log(task);
        await this.tasksRepository.save(task);
        return task;           
    }
}
