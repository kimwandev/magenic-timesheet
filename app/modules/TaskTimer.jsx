import React, {Component} from 'react';
import _ from 'lodash';
import MainHeader from '../components/MainHeader.jsx';
import PomodoroTimer from '../components/Timer/PomodoroTimer.jsx';
import * as TimerActions from '../actions/TimerActions.js';
import * as TaskActions from '../actions/TaskActions';
import TimerStore from '../store/TimerStore.js';
import TaskStore from '../store/TaskStore.js';
import DigitalTimer from '../components/Timer/DigitalTimer.jsx';
import { Link } from 'react-router';

class TaskTimer extends Component{
    constructor(){
        super();
        this.state = {
            timerConfig: null,
            notCompletedTasks : [],
            selectedTaskId : 0,
            selectedTask: null,
            shouldDisableComplete: false
        }
        
        this.getTaskLabel = this.getTaskLabel.bind(this);
        this.selectTask = this.selectTask.bind(this);
        this.getTaskItemClass = this.getTaskItemClass.bind(this);
        this.handleTimerStop = this.handleTimerStop.bind(this);
        this.handleTimerStart = this.handleTimerStart.bind(this);
        this.markTaskAsCompleted = this.markTaskAsCompleted.bind(this);
        this.renderSelectedTask = this.renderSelectedTask.bind(this);
        this.taskStoreChangeCallback = this.taskStoreChangeCallback.bind(this);
        this.timerStoreChangeCallback = this.timerStoreChangeCallback.bind(this);
    }

    componentWillMount(){
        
        if(this.props.params.taskId){
            let taskId = parseInt(this.props.params.taskId);
            this.setState({selectedTaskId:taskId});
        }

        TimerStore.on('change',this.timerStoreChangeCallback);

        TaskStore.on('change', this.taskStoreChangeCallback);

        TaskActions.fetchAllTasks();
        TimerActions.getDefaultTimer();
    }

    componentWillUnmount(){
        TaskStore.removeListener('change', this.taskStoreChangeCallback);
        TimerStore.removeListener('change', this.timerStoreChangeCallback);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.params.taskId){
            let taskId = parseInt(nextProps.params.taskId);
            let selectedTask = _.find(this.state.notCompletedTasks, {'id':taskId});
            this.setState({selectedTaskId:taskId, selectedTask:selectedTask});
        }
    }

    taskStoreChangeCallback(){
        let tasks = _.filter(TaskStore.tasks, (task) => {
            return task.statusId == 'Inprogress' || task.statusId == 'Todo';
        });

        let selectedTask = _.find(tasks, {'id':this.state.selectedTaskId});
        this.setState({notCompletedTasks:tasks, selectedTask:selectedTask})
    }

    timerStoreChangeCallback(){
         this.setState({timerConfig: TimerStore.timerConfig});
    }

    getTaskLabel(task){
        if(task.statusId == 'Todo'){
            return <span className="label label-warning">Pending</span>
        }
        else if(task.statusId == 'Inprogress'){
            return <span className="label label-success">In Progress</span>
        }
        else if(task.statusId == 'Done'){
            return <span className="label label-primary">Completed</span>
        }
    }

    selectTask(task){
        this.setState({selectedTaskId:task.id});
    }

    getTaskItemClass(task){
        let taskItemClassName = 'list-group-item';
        if(task.id == this.state.selectedTaskId){
            taskItemClassName += ' active';
        }
        return taskItemClassName;
    }

    markTaskAsCompleted(){
        TaskActions.Complete(this.state.selectedTaskId);
    }

    handleTimerStop(duration){
        TaskActions.AddDurationToTask(this.state.selectedTaskId, duration);
        this.setState({shouldDisableComplete:false});
    }

    handleTimerStart(){
        TaskActions.StartTask(this.state.selectedTaskId);
        this.setState({shouldDisableComplete:true});
    }

    getCompleteButtonClassName(){
        let className = 'btn btn-primary center-block';
        if(this.state.shouldDisableComplete){
            className += ' disabled';
        }
        return className;
    }

    renderPomodoroTimer(){
        if(this.state.selectedTaskId > 0){
            return (
                <div className="animated fadeInUp">
                    <PomodoroTimer timerConfig={this.state.timerConfig} handleTimerStop={this.handleTimerStop} handleTimerStart={this.handleTimerStart} />
                    <button className={this.getCompleteButtonClassName()} onClick={this.markTaskAsCompleted}>Complete</button>
                </div>
            )
        }
        else{
            return(
                <h1 className="text-center">Please select a task from the list</h1>
            )
        }
    }

    getTaskLink(task){
        return '/PomodoroDashboard/' + task.id;
    }

    renderSelectedTask(){
        if(this.state.selectedTask){
            return (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">{this.state.selectedTask.name}</h3>
                            </div>
                            <div className="panel-body">
                                {this.state.selectedTask.description}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                <MainHeader />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Task List</h4>
                                    <div className="list-group">
                                        {this.state.notCompletedTasks.map((task) => {
                                            return (
                                                <Link role="button" className={this.getTaskItemClass(task)} key={task.id} to={this.getTaskLink(task)}>
                                                    <span className="badge">
                                                        <DigitalTimer totalSeconds={task.duration} shouldShowTimerColon={true} />
                                                    </span>
                                                    {this.getTaskLabel(task)} &nbsp;
                                                    {task.name}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <h1></h1>
                            {this.renderSelectedTask()}
                            
                            <div className="row">
                                <div className="col-sm-8 col-sm-offset-2">
                                    {this.renderPomodoroTimer()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskTimer;