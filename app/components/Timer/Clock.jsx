import React, {Component} from 'react';
import DigitalTimer from './DigitalTimer.jsx';

class Clock extends Component{
    constructor(){
        super();
        this.state = {
            timeInSeconds: 0,
            timer: null,
            shouldShowTimerColon: true,
            startTimerTime: 0
        }
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    render(){
        return(
            <div>
                <div className="text-center">
                        <DigitalTimer totalSeconds={this.state.timeInSeconds} shouldShowTimerColon={this.state.shouldShowTimerColon} />
                </div>
                <div className="row">
                    <div>
                        <button className="btn btn-success" onClick={this.startTimer}>Start</button>&nbsp;
                        <button className="btn btn-danger" onClick={this.stopTimer}>Stop</button>&nbsp;
                        <button className="btn btn-warning" onClick={this.resetTimer}>Reset</button> 
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.setState({timeInSeconds:this.props.initialTimeInSeconds});
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.initialTimeInSeconds != this.props.initialTimeInSeconds){
            clearInterval(this.state.timer);
            this.setState({timeInSeconds:nextProps.initialTimeInSeconds});
        }
    }

    componentWillUnmount(){
        clearInterval(this.state.timer);
    }

    startTimer(){
        clearInterval(this.state.timer);
        var timer = setInterval(() => {
            if(this.state.timeInSeconds == 0){
                this.stopTimer();

                if(this.props.handleTimeout){
                    this.props.handleTimeout();
                }
                
                this.setState({shouldShowTimerColon:true});
            } else{
                this.setState({timeInSeconds:this.state.timeInSeconds - 1,  shouldShowTimerColon:!this.state.shouldShowTimerColon});
            }

        }, 1000);

        this.setState({timer:timer, startTimerTime: this.state.timeInSeconds});

        if(this.props.handleTimerStart){
            this.props.handleTimerStart();
        }
    }

    stopTimer(){
        clearInterval(this.state.timer);

        if(this.props.handleStopTime && this.state.timer){
            let duration = this.state.startTimerTime - this.state.timeInSeconds;
            this.props.handleStopTime(duration);
        }

        this.setState({shouldShowTimerColon:true, timer:null});
    }

    resetTimer(){
        clearInterval(this.state.timer);
        this.setState({timeInSeconds: this.props.initialTimeInSeconds, shouldShowTimerColon:true});
    }
}

Clock.propType = {
    initialTimeInSeconds: React.PropTypes.number.isRequired,
    handleTimeout: React.PropTypes.func,
    handleStopTime: React.PropTypes.func,
    handleTimerStart: React.PropTypes.func
}

export default Clock;