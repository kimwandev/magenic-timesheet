import React from 'react';
import PriorityDropdown from '../PriorityDropdown.jsx';
import StatusDropdown from '../StatusDropdown.jsx';

import utils from '../../_utils/utils.js';

var EditableTaskTableRow = React.createClass({
    propTypes: {
        task: React.PropTypes.object.isRequired,
        handleCancelEdit: React.PropTypes.func.isRequired,
        handleSaveEditTaskItem: React.PropTypes.func.isRequired
    },
    getInitialState:function(){
        var currentPriority = utils.GetPriorityObjectById(this.props.task.priority);
        var currentStatus = utils.GetStatusObjectById(this.props.task.statusId);

       return{
            editTaskModel:{
                id: this.props.task.id,
                description : this.props.task.description
            },
            currentPriority: currentPriority,
            currentStatus: currentStatus
       } 
    },
    onChangeDescription:function(event){
        var description = event.target.value;
        var editTaskModel = this.state.editTaskModel;
        editTaskModel.description = description;
        this.setState({editTaskModel: editTaskModel});
    },
    handleSaveEditTaskItem: function(){
        this.state.editTaskModel.priority = this.state.currentPriority.id;
        this.state.editTaskModel.statusId = this.state.currentStatus.id;
        this.props.handleSaveEditTaskItem(this.state.editTaskModel);
    },
    handlePriorityChange: function(priority){
        this.setState({currentPriority:priority});
    },
    handleStatusChange: function(status){
        this.setState({currentStatus:status});
    },
    render: function(){
        return (
            <tr>
                <td><input type="text" className="form-control" value={this.state.editTaskModel.description} onChange={this.onChangeDescription} /></td>
                <td><PriorityDropdown onPriorityChange={this.handlePriorityChange} selectedPriority={this.state.currentPriority} /></td>
                <td>
                    <StatusDropdown onStatusChange={this.handleStatusChange} selectedStatus={this.state.currentStatus}/>
                </td>
                <td>
                   <div>
                        <button className="btn btn-success" onClick={this.handleSaveEditTaskItem}><i className="fa fa-check"></i></button>
                        <button className="btn btn-warning" onClick={this.props.handleCancelEdit}><i className="fa fa-remove"></i></button>
                   </div>
                </td>
            </tr>
        )
    }
});

module.exports = EditableTaskTableRow;