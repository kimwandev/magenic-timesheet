import React, {Component} from 'react';

class EditableTimer extends Component{
    constructor(){
        super();
        this.state = {
            timerModel:{}
        }

        this.handleTimerNameChange = this.handleTimerNameChange.bind(this);
        this.handlePomodoroValueChange = this.handlePomodoroValueChange.bind(this);
        this.handleLongBreakValueChange = this.handleLongBreakValueChange.bind(this);
        this.handleShortBreakValueChange = this.handleShortBreakValueChange.bind(this);
    }

    componentWillMount(){
        this.setState({timerModel:this.props.timerModel})
    }

    handleTimerNameChange(event){
        let timerModel = this.state.timerModel;
        timerModel.timerName = event.target.value;
        this.setState({timerModel:timerModel});
    }

    handlePomodoroValueChange(event){
        let timerModel = this.state.timerModel;
        timerModel.pomodoro = event.target.value;
        this.setState({timerModel:timerModel});
    }

    handleShortBreakValueChange(event){
        let timerModel = this.state.timerModel;
        timerModel.shortBreak = event.target.value;
        this.setState({timerModel:timerModel});
    }

    handleLongBreakValueChange(event){
        let timerModel = this.state.timerModel;
        timerModel.longBreak = event.target.value;
        this.setState({timerModel:timerModel});
    }

    render(){
        return(
            <div className="form">
                <div className="form-group">
                    <label className="control-label">Timer Config Name</label>
                    <input type="text" className="form-control" value={this.state.timerModel.timerName} onChange={this.handleTimerNameChange} />
                </div>
                <div className="form-group">
                    <label className="control-label">Pomodoro</label>
                    <input type="number" className="form-control" value={this.state.timerModel.pomodoro} onChange={this.handlePomodoroValueChange} />
                </div>
                <div className="form-group">
                    <label className="control-label">Short Break</label>
                    <input type="number" className="form-control" value={this.state.timerModel.shortBreak} onChange={this.handleShortBreakValueChange} />
                </div>
                <div className="form-group">
                    <label className="control-label">Long Break</label>
                    <input type="number" className="form-control" value={this.state.timerModel.longBreak} onChange={this.handleLongBreakValueChange} />
                </div>
                <button className="btn btn-primary btn-block" onClick={this.props.handleSubmit.bind(null, this.state.timerModel)}>Submit</button>
            </div>
        )
    }
}

EditableTimer.propType = {
    handleSubmit: React.PropTypes.func.isRequired,
    timerModel: React.PropTypes.object.isRequired
}

EditableTimer.defaultProps = {

}

export default EditableTimer;