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
            console.log(TimerStore.timerConfig);
            this.setState({currentTimer: TimerStore.timerConfig});
        });

        NotificationStore.on('change', () => {
            alert(NotificationStore.notificationMessage);
        });

        TimerActions.getDefaultTimer();
    }

    handleReset(){
        TimerActions.resetConfigToDefault();
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
                        <EditableTimer timerModel={this.state.currentTimer} handleSubmit={this.addNewTimeConfig} handleRest={this.handleReset}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimerConfigs;