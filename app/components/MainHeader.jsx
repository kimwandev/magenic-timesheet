import React, {Component} from 'react';
import { Grid, Row, Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router';
import TaskStore from '../store/TaskStore.js';
import * as TaskActions from '../actions/TaskActions.js';
import NotificationStore from '../store/NotificationStore.js';
import NewTaskForm from '../components/NewTaskForm.jsx';

export default class MainHeader extends Component{
    constructor(){
        super();

        this.state = {
            hignPriorityTasks: [],
            shouldShowPriorityTasks:false,
            shouldShowAddNewTaskForm: false
        }

        this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
        this.showPriorityTaskDropdown = this.showPriorityTaskDropdown.bind(this);
        this.hidePriorityDropdown = this.hidePriorityDropdown.bind(this);
        this.handleCancelAddTask = this.handleCancelAddTask.bind(this);
        this.handleAddNewTaskSubmit = this.handleAddNewTaskSubmit.bind(this);
        this.showAddNewTaskModal = this.showAddNewTaskModal.bind(this);
        this.taskStoreChangeCallback = this.taskStoreChangeCallback.bind(this);
    }
    componentWillMount(){
        TaskStore.on('change', this.taskStoreChangeCallback)

        TaskActions.fetchTasksByPriority(3);
    }

    componentWillUnmount(){
         TaskStore.removeListener('change', this.taskStoreChangeCallback)
    }
    
    taskStoreChangeCallback(){
        this.setState({hignPriorityTasks: TaskStore.highPriorityTasks, shouldShowAddNewTaskForm: false});
    }

    toggleDropdownMenu(){
        this.setState({shouldShowPriorityTasks: !this.state.shouldShowPriorityTasks});
    }

    showPriorityTaskDropdown(){
         this.setState({shouldShowPriorityTasks: true});
    }

    hidePriorityDropdown(){
         this.setState({shouldShowPriorityTasks: false});
    }

    getDropdownClass(){

        let ddClass = 'dropdown';

        if(this.state.shouldShowPriorityTasks){
            ddClass+= ' open';
        }

        return ddClass;
    }

    handleCancelAddTask(){
        this.setState({shouldShowAddNewTaskForm:false});
    }

    handleAddNewTaskSubmit(task){
        TaskActions.createTask(task);
    }

    showAddNewTaskModal(){
        this.setState({shouldShowAddNewTaskForm:true});
    }
    
    getTaskLink(task){
        return '/PomodoroDashboard/' + task.id;
    }

    render(){
        return (
              <Grid fluid>
                <Row>
                    <Navbar collapseOnSelect>
                        <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/#/Home" className="text-italic">Magenic+</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                        <ul className="nav navbar-nav">
                        <li>
                            <Link activeClassName="active" to="/PomodoroDashboard">Pomodoro Dashboard</Link>
                        </li>
                        <li>
                            <Link activeClassName="active" to="/TasksBoard">Task Board</Link>
                        </li>
                        <li>
                            <Link activeClassName="active" to="/TimerConfig">Timer Config</Link>
                        </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right" onMouseLeave={this.hidePriorityDropdown}>
                             <li className={this.getDropdownClass()}>
                                <a className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false" onClick={this.toggleDropdownMenu} onMouseOver={this.showPriorityTaskDropdown}>
                                <i className="fa fa-tasks"></i> {this.state.hignPriorityTasks.length}<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li className="active"><a>HIGH PRIORITY TASKS</a></li>
                                    {this.state.hignPriorityTasks.map((task) => {
                                        return <li key={task.id}><Link to={this.getTaskLink(task)}><i className="fa fa-tag"></i> {task.name}</Link></li>
                                    })}
                                </ul>
                            </li>
                            <li>
                                <a role="button" onClick={this.showAddNewTaskModal}><i className="fa fa-plus"></i> Add New Task</a>
                            </li>
                            <NavItem href="#"><i className="fa fa-user-circle"></i> Hi User!</NavItem>
                        </ul>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
                 <NewTaskForm show={this.state.shouldShowAddNewTaskForm} showAsModal={true} handleSubmit={this.handleAddNewTaskSubmit} handleCancelAdd={this.handleCancelAddTask} modalTitle="Add New Task" />
              </Grid>
        )
    }
};