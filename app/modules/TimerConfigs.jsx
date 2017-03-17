import React, {Component} from 'react';
import MainHeader from '../components/MainHeader.jsx';
import EditableTimer from '../components/Timer/EditableTimerConfig.jsx';
import TimerStore from '../store/TimerStore.js';
import NotificationStore from '../store/NotificationStore.js';
import * as TimerActions from '../actions/TimerActions.js';

class TimerConfigs extends Component{
    constructor(){
        super();
        this.state = {
            timers: [],
            currentTimer: {}
        }
    }

    componentWillMount(){
        TimerStore.on('change', () => {
            let timers = TimerStore.timerConfigs;

            if(!timers){
                timers = [];
            }

            this.setState({timers:timers, currentTimer: TimerStore.timerConfig});
        });

        NotificationStore.on('change', () => {
            alert(NotificationStore.notificationMessage);
        });

        TimerActions.getDefaultTimer();
        TimerActions.getAllTimerConfigs();
    }

    addNewTimeConfig(timerModel){
        TimerActions.addTimer(timerModel);
    }

    render(){
        return(
            <div>
                <MainHeader />
                <div className="container">
                    <div className="form-group">
                        <EditableTimer timerModel={this.state.currentTimer} handleSubmit={this.addNewTimeConfig}/>
                    </div>
                    <div className="list-group">
                        <a href="#" className="list-group-item disabled">
                                <div>Pomodoro Timer (Default) </div>
                                <div>Pomodoro: 1500 | Short Break: 300 | Long Break: 900</div>
                        </a>
                        {this.state.timers.map((timer) => {
                            return (<a href="#" className="list-group-item">
                                <div>{timer.timerName} </div>
                                <div>Pomodoro: {timer.pomodoro} | Short Break: {timer.shortBreak} | Long Break: {timer.longBreak}</div>
                            </a>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default TimerConfigs;