import tasks from '../_data/tasks.js';
import React from 'react';
import MainHeader from '../components/MainHeader.jsx';
import Section from '../components/Section.jsx';
import TaskTable from '../components/TaskTable/TaskTable.jsx';
import AddNewTaskModal from '../components/AddNewTaskModal.jsx';
import Pagination from '../components/Pagination.jsx';
import taskService from '../_services/taskService.js';
//data
import data from '../_data/tasks.js';

var taskList = JSON.parse(localStorage.getItem('tasks'));

if(!taskList){
    localStorage.setItem('tasks', JSON.stringify(data));
}

var TasksBoard = React.createClass({
    getInitialState: function(){
        return {
            tasks: [],
            pageSize: 10,
            currentPage: 1,
            totalTaskCount: 0,
            shouldShowAddNewTaskForm: false,
            sortBy: null,
            sortOrder: null
        }
    },
    getLastPage: function(){
        return Math.ceil(this.state.totalTaskCount / this.state.pageSize);
    },
    getSkipCount: function(page){
        return (page - 1) * this.state.pageSize;
    },
    componentWillMount: function(){
        let tasksTotalCount = taskService.getAllTasks().length;
        let taskArray = taskService.getTasks(0, 10);
        this.setState({tasks: taskArray, totalTaskCount: tasksTotalCount});
    },
    handleSortTasks:function(sortBy, sortOrder){
         let tasks = taskService.getTasks(this.getSkipCount(this.state.currentPage), this.state.pageSize, sortBy, sortOrder);
         this.setState({sortBy: sortBy, sortOrder:sortOrder, tasks:tasks});
    },
    handlePageChange: function(page){
        let tasks = taskService.getTasks(this.getSkipCount(page), this.state.pageSize, this.state.sortBy, this.state.sortOrder);
        
        this.setState({currentPage:page, tasks:tasks});
    },
    handlePageSizeChange: function(event){
        let value = parseInt(event.target.value);
        let tasks = taskService.getTasks(this.getSkipCount(1), value, this.state.sortBy, this.state.sortOrder);
        this.setState({pageSize: value, tasks: tasks, currentPage: 1});
    },
    handleAddNewTask: function(){
        this.setState({shouldShowAddNewTaskForm: true});
    },
    handleCancelAdd:function(){
        this.setState({shouldShowAddNewTaskForm: false});
    },
    handleAddNewTaskSubmit:function(addNewTaskModel){
        taskService.addNewTask(addNewTaskModel);
        const data = taskService.getTasks(this.getSkipCount(this.state.currentPage), this.state.pageSize, this.state.sortBy, this.state.sortOrder);
        const totalTaskCount = taskService.getAllTasks().length;
        this.setState({shouldShowAddNewTaskForm: false, tasks : data, currentPage: 1, totalTaskCount: totalTaskCount});
    },
    handleDeleteTaskItem:function(taskId){
        taskService.deleteTaskById(taskId);
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
        this.setState({tasks:tasks, totalTaskCount:totalTaskCount, currentPage: currentPage});
    },
    handleSaveTaskItem: function(task){
        taskService.updateTaskItem(task);
        let tasks =  taskService.getTasks(this.getSkipCount(this.state.currentPage), this.state.pageSize, this.state.sortBy, this.state.sortOrder);
        this.setState({tasks:tasks});
    },
    render: function() {
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
                
                <AddNewTaskModal showModal={this.state.shouldShowAddNewTaskForm} handleAddNewTaskSubmit={this.handleAddNewTaskSubmit} onCancel={this.handleCancelAdd} />
                
            </div>
        )
    }
});

module.exports = TasksBoard;