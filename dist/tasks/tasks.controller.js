"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const get_tasks_filter_dto_1 = require("./dto/get-tasks-filter.dto");
const update_task_status_dto_1 = require("./dto/update-task-status.dto");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
        this.logger = new common_1.Logger('Task Controller');
    }
    getTasks(filterDto, user) {
        this.logger.verbose(`User ${user.username}  all tasks Filter ${JSON.stringify(filterDto)}`);
        return this.tasksService.getTasks(filterDto, user);
    }
    getTaskById(id, user) {
        return this.tasksService.getTaskByID(id, user);
    }
    createTask(CreateTaskDto, user) {
        this.logger.verbose(`Task created by ${user.username} Task ${JSON.stringify(CreateTaskDto)}`);
        return this.tasksService.createTask(CreateTaskDto, user);
    }
    deleteTaskByID(id, user) {
        return this.tasksService.deleteTaskByID(id, user);
    }
    updateTaskStatus(user, id, updateTaskStatusDto) {
        console.log(id);
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_tasks_filter_dto_1.GetTasksFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTaskByID", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, update_task_status_dto_1.UpdateTaskStatusDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTaskStatus", null);
TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map