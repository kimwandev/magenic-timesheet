import dispatcher from '../dispatcher.js';
import taskService from '../_services/taskService.js';
export function createTask(task){
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
    taskService.updateTaskItem(task);
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

export function fetchTasksByPriority(priorityId){
    switch(priorityId){
        case 3:{
            const tasksByPriority = taskService.getTasksByPriorityId(priorityId);
            dispatcher.dispatch({
                type: 'FETCH_HIGH_PRIORITY_TASKS',
                payload: tasksByPriority
            })
        }
    }
}