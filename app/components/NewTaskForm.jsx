import React from 'react';
import Section from './Section.jsx';
import PriorityDropdown from './PriorityDropdown.jsx';
import StatusDropdown from './StatusDropdown.jsx';

import {priorities, statuses} from '../_data/lookup.js';

var NewTaskForm = React.createClass({
    propTypes:{
        handleSubmit : React.PropTypes.func.isRequired
    },
    getInitialState: function(){
            return {
                addNewTaskModel: {
                    name: '',
                    description: '',
                    priority: 0,
                    statusId: ''
            },
            currentPriority: priorities[0],
            currentStatus: statuses[0]
        }
    },
    onAddNewTaskModelNameChanged: function(event){
        var addNewTaskModel = this.state.addNewTaskModel;
        addNewTaskModel.name = event.target.value;
        this.setState({addNewTaskModel: addNewTaskModel});
    },
    onAddNewTaskModelDetailsChanged: function(event){
        var addNewTaskModel = this.state.addNewTaskModel;
        addNewTaskModel.description = event.target.value;
        this.setState({addNewTaskModel: addNewTaskModel});
    },
    onAddNewTaskModelPriorityChanged: function(priority){
        this.setState({currentPriority: priority});
    },
    onAddNewTaskModelStatusChanged: function(status){
          this.setState({currentStatus: status});
    },
    handleSubmit:function(e){
        this.state.addNewTaskModel.priority = this.state.currentPriority.id;
        this.state.addNewTaskModel.statusId = this.state.currentStatus.id;
        this.props.handleSubmit(this.state.addNewTaskModel);
    },
    render: function(){

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
});

module.exports = NewTaskForm;