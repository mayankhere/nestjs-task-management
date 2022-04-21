import { Query, Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    private logger = new Logger('Task Controller');
    //DependencyInjection Of Service Class
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(
        @Query() filterDto:GetTasksFilterDto,
        @GetUser() user : User
            ):Promise<Task[]>
        {
        this.logger.verbose(`User ${user.username}  all tasks Filter ${JSON.stringify(filterDto)}`);
        return this.tasksService.getTasks(filterDto,user);
        } 
    
    @Get('/:id')
    getTaskById(@Param('id') id:string,@GetUser() user: User) : Promise<Task>
    {
        return this.tasksService.getTaskByID(id,user);
    }

    @Post()
    createTask(
        @Body() CreateTaskDto:CreateTaskDto,
        @GetUser() user: User,
        ):Promise<Task>{
        this.logger.verbose(`Task created by ${user.username} Task ${JSON.stringify(CreateTaskDto)}`)
        return this.tasksService.createTask(CreateTaskDto,user);
        
    }

    @Delete('/:id')
    deleteTaskByID(
        @Param('id') id:string,
        @GetUser() user: User): Promise<void> {
       return this.tasksService.deleteTaskByID(id,user);
    }

    @Patch(':id/status')
    updateTaskStatus(
        @GetUser() user: User,
        @Param('id') id : string,
        @Body() updateTaskStatusDto:UpdateTaskStatusDto,
    ):Promise<Task> {
        
        console.log(id)
        const {status}=updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id,status,user);
    }
}