import React, {Component} from 'react';
import DigitalTimer from './DigitalTimer.jsx';

class Clock extends Component{
    constructor(){
        super();
        this.state = {
            timeInSeconds: 0,
            timer: null,
            shouldShowTimerColon: true
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
                    <div className="text-center">
                        <button className="btn btn-success" onClick={this.startTimer}>Start</button> &nbsp;
                        <button className="btn btn-danger" onClick={this.stopTimer}>Stop</button>  &nbsp;
                        <button className="btn btn-warning" onClick={this.resetTimer}>Reset</button>  &nbsp;
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.setState({timeInSeconds:this.props.initialTimeInSeconds});
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({timeInSeconds:nextProps.initialTimeInSeconds});
    }

    componentWillUnmount(){
        clearInterval(this.state.timer);
    }

    startTimer(){
        var timer = setInterval(() => {
            if(this.state.timeInSeconds == 0){
                clearInterval(this.state.timer);
                this.setState({shouldShowTimerColon:true});
                if(this.props.handleTimeout){
                    this.props.handleTimeout();
                }
            } else{
                this.setState({timeInSeconds:this.state.timeInSeconds - 1,  shouldShowTimerColon:!this.state.shouldShowTimerColon});
            }

        }, 1000);

        this.setState({timer:timer});
    }

    stopTimer(){
        clearInterval(this.state.timer);
        this.setState({shouldShowTimerColon:true});
    }

    resetTimer(){
        clearInterval(this.state.timer);
        this.setState({timeInSeconds: this.props.initialTimeInSeconds, shouldShowTimerColon:true});
    }
}

Clock.propType = {
    initialTimeInSeconds: React.PropTypes.number.isRequired,
    handleTimeout: React.PropTypes.func
}

export default Clock;