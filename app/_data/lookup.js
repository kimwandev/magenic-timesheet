let statuses = [
    {
        id: 'Todo',
        name: 'To Do'
    },
    {
        id: 'Inprogress',
        name: 'In Progress'
    },
    {
        id: 'Done',
        name: 'Done'
    }
]



let priorities = [
    {
        id: 1,
        name: 'Low'
    },
    {
        id: 2,
        name: 'Medium'
    },
    {
        id: 3,
        name: 'High'
    }
]

let defaultTimer = {
    timerName: 'Pomodoro Timer',
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900
}

export {priorities, statuses, defaultTimer }