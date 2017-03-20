import React, {Component} from 'react';

class DigitalTImer extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <span>
                    {this.getTimerMinutes()} {this.props.shouldShowTimerColon ? <span>:</span> : <span>&nbsp;</span>} {this.getTimerSeconds()}
            </span>
        )
    }

    getTimerMinutes(){
        let minutes = parseInt(Math.floor(this.props.totalSeconds / 60));
        
        if(minutes < 10){
            return '0' + minutes.toString();
        }
        else{
            return minutes;
        }
    }
    
    getTimerSeconds(){
        let seconds = Math.round(((this.props.totalSeconds / 60) % 1) * 60);
        if(seconds < 10){
            return '0' + seconds.toString();
        }
        else{
            return seconds;
        }
    }
}

DigitalTImer.propType = {
    totalMilliseconds: React.PropTypes.number.isRequired,
    shouldShowTimerColon: React.PropTypes.bool
}

DigitalTImer.defaultProps = {
    shouldShowTimerColon: true
}

export default DigitalTImer;