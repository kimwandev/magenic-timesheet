import React, {Component} from 'react';
import Clock from './Clock.jsx';


class PomodoroTimer extends Component{
    constructor(){
        super();
        this.state = {
            timerType : 'pomodoro',
            timeInSecondss: 0,
        }

        this.setTimerType = this.setTimerType.bind(this);
        this.timerTimeoutHandler = this.timerTimeoutHandler.bind(this);
        this.handleTimerStop = this.handleTimerStop.bind(this);
    }

    componentWillMount(){
        this.setState({timeInSecondss: this.props.timerConfig.pomodoro});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.timerConfig.timerName != this.props.timerConfig.timerName){
             this.setState({timerType:"pomodoro", timeInSecondss: nextProps.timerConfig.pomodoro});
        }
    }

    handleTimerStop(duration){
        if(this.state.timerType != 'long'){
            this.props.handleTimerStop(duration);
        }
    }

    render(){
        return(
            <div>
                <h1 className="text-center">{this.props.timerConfig.timerName}</h1>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="btn-group btn-group-justified">
                                <a className={this.getButtonClass('pomodoro')} onClick={this.setTimerType.bind(null, 'pomodoro')}>Pomodoro</a>
                                <a className={this.getButtonClass('short')} onClick={this.setTimerType.bind(null, 'short')}>Short Break</a>
                                <a className={this.getButtonClass('long')} onClick={this.setTimerType.bind(null, 'long')}>Long Break</a>
                            </div>
                        </div>
                        <div className="row">
                            <h1 className="text-primary text-center">
                                <Clock initialTimeInSeconds={this.state.timeInSecondss} handleTimeout={this.timerTimeoutHandler} handleStopTime={this.handleTimerStop} handleTimerStart={this.props.handleTimerStart}/>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getButtonClass(value){
        if(value == this.state.timerType){
            return 'btn btn-primary active';
        }

        return 'btn btn-primary';
    }

    setTimerType(value){
        let timeInSeconds = 0;
        switch(value){
            case "pomodoro":
                timeInSeconds = this.props.timerConfig.pomodoro;
                break;
            case "short":
                timeInSeconds = this.props.timerConfig.shortBreak;
                break;
            case "long":
                timeInSeconds = this.props.timerConfig.longBreak;
                break;
        }

        this.setState({timerType:value, timeInSecondss:timeInSeconds});
    }

    timerTimeoutHandler(){
        alert(this.state.timerType + ' timer is Done!');
    }
}

PomodoroTimer.propType = {
    timerConfig: React.PropTypes.object.isRequired,
    handleTimerStop: React.PropTypes.func,
    handleTimerStart: React.PropTypes.func
}

export default PomodoroTimer;