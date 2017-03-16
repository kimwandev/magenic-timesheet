import React, {Component} from 'react';
import MainHeader from '../components/MainHeader.jsx';
import PomodoroTimer from '../components/Timer/PomodoroTimer.jsx';
import * as TimerActions from '../actions/TimerActions.js';
import TimerStore from '../store/TimerStore.js';

class TaskTimer extends Component{
    constructor(){
        super();
        this.state = {
            timerConfig: null
        }
    }

    componentWillMount(){
        TimerStore.on('change', () => {
            this.setState({timerConfig: TimerStore.timerConfig});
        });

        TimerActions.getDefaultTimer();
    }

    render(){
        return(
            <div>
                <MainHeader />
                <div className="container">
                    <PomodoroTimer timerConfig={this.state.timerConfig} />
                </div>
            </div>
        )
    }
}

export default TaskTimer;