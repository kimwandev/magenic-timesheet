import _ from 'lodash';

function byDescription(a,b) {
  if (a.description < b.description)
    return -1;
  if (a.description > b.description)
    return 1;
  return 0;
}

function byPriority(a,b) {
  if (a.priority < b.priority)
    return -1;
  if (a.priority > b.priority)
    return 1;
  return 0;
}

function byStatus(a,b) {
  if (a.statusId < b.statusId)
    return -1;
  if (a.statusId > b.statusId)
    return 1;
  return 0;
}

function _getAllTasks(){
    let tasksString = localStorage.getItem('tasks');

    return JSON.parse(tasksString);
}

function _getTasks(skip, take, sortBy, sortOrder){
    const tasksString = localStorage.getItem('tasks');
    let tasks = JSON.parse(tasksString);

    if(sortBy == 'description'){
        tasks.sort(byDescription);
        if(sortOrder == 'desc'){
            tasks.reverse();
        }
    }
    else if(sortBy == 'priority'){
        tasks.sort(byPriority);
        if(sortOrder == 'desc'){
            tasks.reverse();
        }
    }
    else if(sortBy == 'status'){
        tasks.sort(byStatus);
        if(sortOrder == 'desc'){
            tasks.reverse();
        }
    }

    // tasks = _.filter(tasks, (task) => {
    //     return task.statusId == 'Todo' || task.statusId == 'Inprogress';
    // })

    if(skip != null && take != null){
        tasks.splice(0, skip)
        let lastItemIndex = tasks.length - 1;
        tasks.splice(take, lastItemIndex);
    }


    return tasks;
}

function _addNewTask(task){
    const tasksString = localStorage.getItem('tasks');
    let tasks = JSON.parse(tasksString);

    task.id = tasks[tasks.length - 1].id + 1;
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function _deleteTask(taskId){
    const tasksString = localStorage.getItem('tasks');
    let tasks = JSON.parse(tasksString);
    
    let taskIndexToRemove = _.findIndex(tasks, {id: taskId});

    if(taskIndexToRemove >= 0){
        tasks.splice(taskIndexToRemove, 1);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function _updateTaskItem(taskItem){
    const tasksString = localStorage.getItem('tasks');
    let tasks = JSON.parse(tasksString);
    
    let taskIndexToUpdate = _.findIndex(tasks, {id: taskItem.id});

    if(taskIndexToUpdate >= 0){
        tasks[taskIndexToUpdate] = taskItem;
    }
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function _getTaskById(taskId){
    const tasksString = localStorage.getItem('tasks');
    let tasks = JSON.parse(tasksString);
    return _.find(tasks, {id: taskId});
}

function _getTasksByPriorityId(priorityId){
    let tasks = _getAllTasks();
    return _.filter(tasks, {priority: priorityId});
}

export default {
    getAllTasks: _getAllTasks,
    getTasks: _getTasks,
    addNewTask: _addNewTask,
    deleteTaskById: _deleteTask,
    updateTaskItem: _updateTaskItem,
    getTaskById: _getTaskById,
    getTasksByPriorityId: _getTasksByPriorityId
}