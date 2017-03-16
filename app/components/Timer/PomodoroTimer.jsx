import React, {Component} from 'react';
import Clock from './Clock.jsx';


class PomodoroTimer extends Component{
    constructor(){
        super();
        this.state = {
            timerType : 'pomodoro',
            timeInSeconds: 0,
        }

        this.setTimerType = this.setTimerType.bind(this);
        this.timerTimeoutHandler = this.timerTimeoutHandler.bind(this);
    }

    componentWillMount(){
        this.setState({timeInSeconds: this.props.timerConfig.pomodoro});
    }

    componentWillReceiveProps(nextProps){
        this.setState({timerType:"pomodoro", timeInSeconds: nextProps.timerConfig.pomodoro});
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
                                <Clock initialTimeInSeconds={this.state.timeInSeconds} handleTimeout={this.timerTimeoutHandler}/>
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

        this.setState({timerType:value, timeInSeconds:timeInSeconds});
    }

    timerTimeoutHandler(){
        alert('from timer');
    }
}

PomodoroTimer.propType = {
    timerConfig: React.PropTypes.object.isRequired
}

export default PomodoroTimer;