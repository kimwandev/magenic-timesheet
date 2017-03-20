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
            showValidation:false,
            message: '',
            messageAnimation: ''
            
        }

        this.showSuccess = this.showSuccess.bind(this); 
        this.getMessageAnimationClass = this.getMessageAnimationClass.bind(this);
        this.notificationStoreChangeCallback = this.notificationStoreChangeCallback.bind(this);
        this.timerStoreChangeCallback = this.timerStoreChangeCallback.bind(this);
    }

    componentWillMount(){
        TimerStore.on('change', this.timerStoreChangeCallback);

        NotificationStore.on('change', this.notificationStoreChangeCallback);

        TimerActions.getDefaultTimer();
    }

    componentWillUnmount(){
        TimerStore.removeListener('change', this.timerStoreChangeCallback);
        NotificationStore.removeListener('change', this.notificationStoreChangeCallback);
    }

    timerStoreChangeCallback(){
        this.setState({currentTimer: TimerStore.timerConfig});
    }

    notificationStoreChangeCallback(){
        this.setState(
            {
                message: NotificationStore.notificationMessage, 
                showSuccess: NotificationStore.shouldShowSuccess, 
                showValidation: NotificationStore.shouldShowValidation,
                messageAnimation: 'fadeIn'
            });

        setTimeout(() => {
            this.setState(
                {
                    messageAnimation: 'fadeOut'
                });
        }, 4000);
    }

    handleReset(){
        TimerActions.resetConfigToDefault();
    }

    getMessageAnimationClass(){
        return 'animated ' + this.state.messageAnimation;
    }

    addNewTimeConfig(timerModel){
        TimerActions.setCustomTimerConfig(timerModel);
    }

    showSuccess(){
        if(this.state.showSuccess){
            return (
                 <div className={this.getMessageAnimationClass()}>
                    <div className="alert alert-dismissible alert-success animated">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Well done!</strong> {this.state.message}
                    </div>
                </div>
            )
        }
    }

    showValidation(){
        if(this.state.showValidation){
            return (
                <div className={this.getMessageAnimationClass()}>
                    <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Validation Error!</strong> {this.state.message}
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
                    <div className="form-group">
                        <EditableTimer timerModel={this.state.currentTimer} handleSubmit={this.addNewTimeConfig} handleReset={this.handleReset}/>
                    </div>
                    {this.showSuccess()}
                    {this.showValidation()}
                </div>
            </div>
        )
    }
}

export default TimerConfigs;