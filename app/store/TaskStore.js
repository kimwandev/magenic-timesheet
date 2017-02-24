import {EventEmitter} from 'events';
import TaskDispatcher from '../dispatcher.js';
import _ from 'lodash';

class TaskStore extends EventEmitter{
    constructor(){
        super();
        this.tasks = [];
        this.highPriorityTasks = [];
        this.totalTasksCount = 0;
    }

    getById(id){
        return _.find(this.tasks, {id:id});
    }

    add(task){
        this.totalTasksCount++;
        this.tasks.push(task);
        if(task.priority == 3){
            this.highPriorityTasks.push(task);
        }
    }

    update(task){
        const index = _.findIndex(this.tasks, {id : task.id});
        this.tasks[index] = task;

        const pTaxkIndex = _.findIndex(this.highPriorityTasks, {id : task.id});
        if(pTaxkIndex >= 0){
            this.highPriorityTasks.splice(pTaxkIndex, 1);
        }
        else{
            this.highPriorityTasks.push(task);
        }

    }

    remove(taskId){
        this.totalTasksCount--;
        const index = _.findIndex(this.tasks, {id : taskId});
        this.tasks.splice(index, 1);

        const pTaxkIndex = _.findIndex(this.highPriorityTasks, {id : taskId});
        if(pTaxkIndex >= 0){
            this.highPriorityTasks.splice(pTaxkIndex, 1);
        }
    }

    handleActions(action){
        switch(action.type){
            case "CREATE_TASK":
                this.add(action.payload);
                this.emit('change');
                break;
            case "REMOVE_TASK":
                this.remove(action.payload);
                this.emit('change');
                break;
            case "UPDATE_TASK":
                this.update(action.payload);
                this.emit('change');
                break;
            case "FETCH_TASKS":
                this.tasks = action.payload.tasks;
                this.totalTasksCount = action.payload.totalCount
                this.emit('change');
                break;
            case "FETCH_HIGH_PRIORITY_TASKS":
                this.highPriorityTasks = action.payload;
                this.emit('change');
                break;
        }
    }
}

const taskStore = new TaskStore;
taskStore.dispacthId = TaskDispatcher.register(taskStore.handleActions.bind(taskStore));

export default taskStore;