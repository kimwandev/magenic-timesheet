import tasks from '../_data/tasks.js';
import React, {Component}from 'react';
import MainHeader from '../components/MainHeader.jsx';
import Section from '../components/Section.jsx';
import TaskTable from '../components/TaskTable/TaskTable.jsx';
import NewTaskForm from '../components/NewTaskForm.jsx';
import Pagination from '../components/Pagination.jsx';
import taskService from '../_services/taskService.js';
import Confirm from '../components/Common/Confirm.jsx';

//data
import data from '../_data/tasks.js';

const taskList = JSON.parse(localStorage.getItem('tasks'));

if(!taskList){
    localStorage.setItem('tasks', JSON.stringify(data));
}

export default class TasksBoard extends Component{
    constructor(){
        super();

        this.state = {
            tasks: [],
            pageSize: 10,
            currentPage: 1,
            totalTaskCount: 0,
            shouldShowAddNewTaskForm: false,
            sortBy: null,
            sortOrder: null,
            taskIdToDelete: 0,
            shouldShowDeleteConfirm: false
        }

        this.getLastPage = this.getLastPage.bind(this);
        this.getSkipCount = this.getSkipCount.bind(this);
        this.handleSortTasks = this.handleSortTasks.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.handleAddNewTask = this.handleAddNewTask.bind(this);
        this.handleCancelAdd = this.handleCancelAdd.bind(this);
        this.handleAddNewTaskSubmit = this.handleAddNewTaskSubmit.bind(this);
        this.handleDeleteTaskItem = this.handleDeleteTaskItem.bind(this);
        this.handleSaveTaskItem = this.handleSaveTaskItem.bind(this);
        this.onDeleteTaskConfirm = this.onDeleteTaskConfirm.bind(this);
        this.onCancelDeleteTask = this.onCancelDeleteTask.bind(this);
        this.getConfirmDeleteMessage = this.getConfirmDeleteMessage.bind(this);
    }
    
    componentWillMount(){
        let tasksTotalCount = taskService.getAllTasks().length;
        let taskArray = taskService.getTasks(0, 10);
        this.setState({tasks: taskArray, totalTaskCount: tasksTotalCount});
    }

    getLastPage(){
        return Math.ceil(this.state.totalTaskCount / this.state.pageSize);
    }

    getSkipCount(page){
        return (page - 1) * this.state.pageSize;
    }

    handleSortTasks(sortBy, sortOrder){
         let tasks = taskService.getTasks(this.getSkipCount(this.state.currentPage), this.state.pageSize, sortBy, sortOrder);
         this.setState({sortBy: sortBy, sortOrder:sortOrder, tasks:tasks});
    }

    handlePageChange(page){
        let tasks = taskService.getTasks(this.getSkipCount(page), this.state.pageSize, this.state.sortBy, this.state.sortOrder);
        
        this.setState({currentPage:page, tasks:tasks});
    }

    handlePageSizeChange(event){
        let value = parseInt(event.target.value);
        let tasks = taskService.getTasks(this.getSkipCount(1), value, this.state.sortBy, this.state.sortOrder);
        this.setState({pageSize: value, tasks: tasks, currentPage: 1});
    }

    handleAddNewTask(){
        this.setState({shouldShowAddNewTaskForm: true});
    }

    handleCancelAdd(){
        this.setState({shouldShowAddNewTaskForm: false});
    }

    handleAddNewTaskSubmit(addNewTaskModel){
        taskService.addNewTask(addNewTaskModel);
        const data = taskService.getTasks(this.getSkipCount(this.state.currentPage), this.state.pageSize, this.state.sortBy, this.state.sortOrder);
        const totalTaskCount = taskService.getAllTasks().length;
        this.setState({shouldShowAddNewTaskForm: false, tasks : data, currentPage: 1, totalTaskCount: totalTaskCount});
    }

    onDeleteTaskConfirm(){
        taskService.deleteTaskById(this.state.taskIdToDelete);
        const totalTaskCount = taskService.getAllTasks().length;
        let currentPage = this.state.currentPage;
        let tasks =  taskService.getTasks(this.getSkipCount(currentPage), this.state.pageSize, this.state.sortBy, this.state.sortOrder);
        if(tasks.length == 0){
            currentPage--;
            if(currentPage < 0){
                currentPage = 0;
            }

            tasks =  taskService.getTasks(this.getSkipCount(currentPage), this.state.pageSize, this.state.sortBy, this.state.sortOrder);
        }
        this.setState({tasks:tasks, totalTaskCount:totalTaskCount, currentPage: currentPage, shouldShowDeleteConfirm: false, taskIdToDelete: 0});
    }

    handleDeleteTaskItem(taskId){
        this.setState({shouldShowDeleteConfirm: true, taskIdToDelete: taskId});
    }

    onCancelDeleteTask(){
        this.setState({shouldShowDeleteConfirm: false, taskIdToDelete: 0});
    }

    handleSaveTaskItem(task){
        taskService.updateTaskItem(task);
        let tasks =  taskService.getTasks(this.getSkipCount(this.state.currentPage), this.state.pageSize, this.state.sortBy, this.state.sortOrder);
        this.setState({tasks:tasks});
    }

    getConfirmDeleteMessage(){
        if(this.state.taskIdToDelete == 0)
            return;
        const task = taskService.getTaskById(this.state.taskIdToDelete);
        return (
            <div>
                <span>Task ID: {task.id}</span><br />
                <span>Name: {task.name}</span><br />
            </div>
        )
    }

    render() {
        return (
            <div>
                <MainHeader />
                <Section title="Tasks Table">
                     <TaskTable 
                        tasks={this.state.tasks} 
                        handleDeleteTaskItem={this.handleDeleteTaskItem} 
                        handleSaveEditTaskItem={this.handleSaveTaskItem} 
                        sortHandler={this.handleSortTasks}
                        sortBy={this.state.sortBy}
                        sortOrder={this.state.sortOrder} />
                     <Pagination 
                            lastPage={this.getLastPage()} 
                            currentPage={this.state.currentPage} 
                            pageSize={this.state.pageSize} 
                            totalItemCount={this.state.totalTaskCount} 
                            handlePageChange={this.handlePageChange}
                            onPagSizeChanged={this.handlePageSizeChange} />
                     <button className="btn btn-primary" onClick={this.handleAddNewTask} >Add New Task</button>
                </Section>
                <Confirm showAsModal={true} modalTitle="Are you sure you want to delete this item?" confirmMessage={this.getConfirmDeleteMessage()} show={this.state.shouldShowDeleteConfirm} onConfirm={this.onDeleteTaskConfirm} onCancel={this.onCancelDeleteTask} />
                <NewTaskForm show={this.state.shouldShowAddNewTaskForm} showAsModal={true} handleSubmit={this.handleAddNewTaskSubmit} handleCancelAdd={this.handleCancelAdd} modalTitle="Add New Task" />
            </div>
        )
    }
};