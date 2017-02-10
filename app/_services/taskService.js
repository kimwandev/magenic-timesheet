
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

    tasks.splice(0, skip)
    let lastItemIndex = tasks.length - 1;
    tasks.splice(take, lastItemIndex);

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
    
    var taskIndexToRemove = -1;
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id == taskId){
            taskIndexToRemove = i;
            break;
        }
    }

    if(taskIndexToRemove >= 0){
        tasks.splice(taskIndexToRemove, 1);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


module.exports = {
    getAllTasks: _getAllTasks,
    getTasks: _getTasks,
    addNewTask: _addNewTask,
    deleteTaskById: _deleteTask
}