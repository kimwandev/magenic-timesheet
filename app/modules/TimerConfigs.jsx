import React, {Component} from 'react';
import MainHeader from '../components/MainHeader.jsx';
import EditableTimer from '../components/Timer/EditableTimerConfig.jsx';
import TimerStore from '../store/TimerStore.js';
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
            console.log(TimerStore);
            this.setState({timers:TimerStore.timerConfigs, currentTimer: TimerStore.timerConfig});
        });

        TimerActions.getDefaultTimer();
    }

    addNewTimeConfig(timerModel){
        console.log(timerModel);
    }

    render(){
        return(
            <div>
                <MainHeader />
                <div className="container">
                    <div>
                        <EditableTimer timerModel={this.state.currentTimer} handleSubmit={this.addNewTimeConfig}/>
                    </div>
                    <div className="list-group">
                        {this.state.timers.map((timer) => {
                            <a href="#" className="list-group-item active">
                                {timer.timerName}
                            </a>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default TimerConfigs;