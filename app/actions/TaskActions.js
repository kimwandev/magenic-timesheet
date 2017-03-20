import dispatcher from '../dispatcher.js';
import taskService from '../_services/taskService.js';
import _ from 'lodash';

export function createTask(task){
    task.duration = 0;
    taskService.addNewTask(task);
    dispatcher.dispatch({
        type: 'CREATE_TASK',
        payload: task
    })
}

export function removeTask(id, pageObj){
    taskService.deleteTaskById(id);
    dispatcher.dispatch({
        type: 'REMOVE_TASK',
        payload: id
    })

    fetchTasks(pageObj.skip, pageObj.take, pageObj.sortBy, pageObj.sortOrder);
}

export function updateTask(task){
    let taskToUpdate = taskService.getTaskById(task.id);
    taskToUpdate.name = task.name;
    taskToUpdate.priority = task.priority;
    taskToUpdate.statusId = task.statusId;
    taskToUpdate.description = task.description;

    if(task.duration){
        taskToUpdate.duration = task.duration;
    }

    taskService.updateTaskItem(taskToUpdate);
    dispatcher.dispatch({
        type: 'UPDATE_TASK',
        payload: task
    })
}

export function fetchTasks(skip, take, sortBy, sortOrder){
    const tasks = taskService.getTasks(skip, take, sortBy, sortOrder);
    const totalTasksCount = taskService.getAllTasks().length;

    dispatcher.dispatch({
        type: 'FETCH_TASKS',
        payload: {tasks: tasks, totalCount: totalTasksCount }
    })
}

export function fetchAllTasks(){
    const tasks = taskService.getAllTasks();

    dispatcher.dispatch({
        type: 'FETCH_TASKS',
        payload: {tasks: tasks }
    })
}

export function fetchTasksByPriority(priorityId){
    switch(priorityId){
        case 3:{
            let tasksByPriority = taskService.getTasksByPriorityId(priorityId);
            tasksByPriority = _.filter(tasksByPriority, (task) => {return task.statusId != 'Done'});
            dispatcher.dispatch({
                type: 'FETCH_HIGH_PRIORITY_TASKS',
                payload: tasksByPriority
            })
        }
    }
}

export function AddDurationToTask(taskId, duration){
    let taskItem = taskService.getTaskById(taskId);
    taskItem.duration += duration;
    updateTask(taskItem);
}

export function StartTask(taskId){
    let taskItem = taskService.getTaskById(taskId);
    taskItem.statusId = 'Inprogress';
    updateTask(taskItem);
}

export function StopTask(taskId){
    let taskItem = taskService.getTaskById(taskId);
    taskItem.statusId = 'Todo';
    updateTask(taskItem);
}

export function Complete(taskId){
    let taskItem = taskService.getTaskById(taskId);
    taskItem.statusId = 'Done';
    updateTask(taskItem);
}