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
            currentTimer: {},
            showSuccess: false,
            successMessage: ''
        }

        this.showSuccess = this.showSuccess.bind(this); 
    }

    componentWillMount(){
        TimerStore.on('change', () => {
            console.log(TimerStore.timerConfig);
            this.setState({currentTimer: TimerStore.timerConfig});
        });

        NotificationStore.on('change', () => {
            this.setState({successMessage: NotificationStore.notificationMessage, showSuccess: true});

            setTimeout(() => {
                this.setState({showSuccess: false});
            }, 2000);
        });

        TimerActions.getDefaultTimer();
    }

    handleReset(){
        TimerActions.resetConfigToDefault();
    }

    addNewTimeConfig(timerModel){
        TimerActions.setCustomTimerConfig(timerModel);
    }

    showSuccess(){
        if(this.state.showSuccess){
            return (
                <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Well done!</strong> {this.state.successMessage}
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                <MainHeader />
                <div className="container">
                    <div className="form-group">
                        <EditableTimer timerModel={this.state.currentTimer} handleSubmit={this.addNewTimeConfig} handleReset={this.handleReset}/>
                    </div>
                    {this.showSuccess()}
                </div>
            </div>
        )
    }
}

export default TimerConfigs;