import React, {Component} from 'react';
import Section from './Section.jsx';
import PriorityDropdown from './PriorityDropdown.jsx';
import StatusDropdown from './StatusDropdown.jsx';
import ModalHOC from './HOC/ModalHOC.jsx';
import {priorities, statuses} from '../_data/lookup.js';

class NewTaskForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
                addNewTaskModel: {
                    name: '',
                    description: '',
                    priority: 0,
                    statusId: ''
            },
            currentPriority: priorities[0],
            currentStatus: statuses[0]
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAddNewTaskModelNameChanged = this.onAddNewTaskModelNameChanged.bind(this);
        this.onAddNewTaskModelDetailsChanged = this.onAddNewTaskModelDetailsChanged.bind(this);
        this.onAddNewTaskModelPriorityChanged = this.onAddNewTaskModelPriorityChanged.bind(this);
        this.onAddNewTaskModelStatusChanged = this.onAddNewTaskModelStatusChanged.bind(this);
    }

    onAddNewTaskModelNameChanged(event){
        let addNewTaskModel = this.state.addNewTaskModel;
        addNewTaskModel.name = event.target.value;
        this.setState({addNewTaskModel: addNewTaskModel});
    }

    onAddNewTaskModelDetailsChanged(event){
        let addNewTaskModel = this.state.addNewTaskModel;
        addNewTaskModel.description = event.target.value;
        this.setState({addNewTaskModel: addNewTaskModel});
    }
    
    onAddNewTaskModelPriorityChanged(priority){
        this.setState({currentPriority: priority});
    }
    
    onAddNewTaskModelStatusChanged(status){
          this.setState({currentStatus: status});
    }

    handleSubmit(e){
        this.state.addNewTaskModel.priority = this.state.currentPriority.id;
        this.state.addNewTaskModel.statusId = this.state.currentStatus.id;
        this.props.handleSubmit(this.state.addNewTaskModel);
    }

    render(){

        return (
                <div className="form row">
                    <div className="col-sm-10 col-sm-offset-1">
                        <div className="row form-group">
                        <input type="text" className="form-control" placeholder="Name" value={this.state.addNewTaskModel.name} onChange={this.onAddNewTaskModelNameChanged} />
                    </div>
                    <div className="row form-group">
                        <input type="text" className="form-control" placeholder="Details" value={this.state.addNewTaskModel.details} onChange={this.onAddNewTaskModelDetailsChanged} />
                    </div>
                    <div className="row form-group">
                        <PriorityDropdown onPriorityChange={this.onAddNewTaskModelPriorityChanged} selectedPriority={this.state.currentPriority} />
                    </div>
                    <div className="row form-group">
                        <StatusDropdown onStatusChange={this.onAddNewTaskModelStatusChanged} selectedStatus={this.state.currentStatus} />
                    </div>
                    <div className="row form-group">
                        <div className="col-sm-6">
                            <button className="btn btn-warning btn-block" onClick={this.props.handleCancelAdd}>Cancel</button>
                        
                        </div>
                        <div className="col-sm-6">
                            <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Add</button>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    </div>
                </div>
        )
    }
}

NewTaskForm.propTypes = {
      handleSubmit : React.PropTypes.func.isRequired
}

export default ModalHOC(NewTaskForm);