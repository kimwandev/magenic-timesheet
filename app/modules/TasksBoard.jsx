import React, {Component}from 'react';
import MainHeader from '../components/MainHeader.jsx';
import Section from '../components/Section.jsx';
import TaskTable from '../components/TaskTable/TaskTable.jsx';
import NewTaskForm from '../components/NewTaskForm.jsx';
import Pagination from '../components/Pagination.jsx';
import Confirm from '../components/Common/Confirm.jsx';
import TaskStore from '../store/TaskStore.js';
import * as TaskActions from '../actions/TaskActions.js';

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
        this.taskStoreChangeCallback = this.taskStoreChangeCallback.bind(this);
    }
    
    componentWillMount(){
        
        TaskStore.on('change', this.taskStoreChangeCallback);

        TaskActions.fetchTasks(this.getSkipCount(this.state.currentPage), this.state.pageSize);
    }

    componentWillUnmount(){
        TaskStore.removeListener('change', this.taskStoreChangeCallback);
    }

    taskStoreChangeCallback(){
        this.setState({tasks: TaskStore.tasks, totalTaskCount: TaskStore.totalTasksCount});
    }

    getLastPage(){
        return Math.ceil(this.state.totalTaskCount / this.state.pageSize);
    }

    getSkipCount(page){
        return (page - 1) * this.state.pageSize;
    }

    handleSortTasks(sortBy, sortOrder){
         TaskActions.fetchTasks(this.getSkipCount(this.state.currentPage), this.state.pageSize, sortBy, sortOrder);
         this.setState({sortBy: sortBy, sortOrder:sortOrder });
    }

    handlePageChange(page){
        TaskActions.fetchTasks(this.getSkipCount(page), this.state.pageSize, this.state.sortBy, this.state.sortOrder);
        this.setState({currentPage:page});
    }

    handlePageSizeChange(event){
        let value = parseInt(event.target.value);
        TaskActions.fetchTasks(this.getSkipCount(1), value, this.state.sortBy, this.state.sortOrder);
        this.setState({pageSize: value, currentPage: 1});
    }

    handleAddNewTask(){
        this.setState({shouldShowAddNewTaskForm: true});
    }

    handleCancelAdd(){
        this.setState({shouldShowAddNewTaskForm: false});
    }

    handleAddNewTaskSubmit(addNewTaskModel){
        TaskActions.createTask(addNewTaskModel);
        this.setState({shouldShowAddNewTaskForm :false});
    }

    onDeleteTaskConfirm(){
        let currentPage = this.state.currentPage;
        if(this.state.tasks.length == 1 && currentPage > 1){
            currentPage--;
        }
        TaskActions.removeTask(this.state.taskIdToDelete, {skip:this.getSkipCount(currentPage), take: this.state.pageSize, sortBy: this.state.sortBy, sortOrder: this.state.sortOrder});
        this.setState({shouldShowDeleteConfirm :false, currentPage: currentPage});
    }

    handleDeleteTaskItem(taskId){
        this.setState({shouldShowDeleteConfirm: true, taskIdToDelete: taskId});
    }

    onCancelDeleteTask(){
        this.setState({shouldShowDeleteConfirm: false, taskIdToDelete: 0});
    }

    handleSaveTaskItem(task){
        TaskActions.updateTask(task);
    }

    getConfirmDeleteMessage(){
        if(this.state.taskIdToDelete == 0)
            return;
            const task = TaskStore.getById(this.state.taskIdToDelete);
            if(task){
                return (
                <div>
                    <span>Task ID: {task.id}</span><br />
                    <span>Name: {task.name}</span><br />
                </div>
            )
        }
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