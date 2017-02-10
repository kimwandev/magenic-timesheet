import React from 'react';

import TaskDetailsTableRow from './TaskDetailsTableRow.jsx';
import EditableTaskTableRow from './EditableTaskTableRow.jsx';

var TaskTableRow = React.createClass({
    getInitialState: function(){
        return {
            isEditable: false
        }
    },
    propTypes:{
        task: React.PropTypes.object.isRequired,
        handleDeleteTaskItem: React.PropTypes.func.isRequired,
        handleSaveEditTaskItem: React.PropTypes.func.isRequired
    },
    handleEditTaskItemClick:function(){
        this.setState({isEditable: true});
    },
    handleSaveEditTaskItem:function(updatedTask){
        updatedTask.id = this.props.task.id;
        this.props.handleSaveEditTaskItem(updatedTask);
        this.setState({isEditable: false});
    },
    handleCancelEdit:function(){
        this.setState({isEditable: false});
    },
    render: function(){
        if(this.state.isEditable){
            return (
                <EditableTaskTableRow task={this.props.task} handleCancelEdit={this.handleCancelEdit} handleSaveEditTaskItem={this.handleSaveEditTaskItem} />
            )
        }
        else{
            return (
                <TaskDetailsTableRow task={this.props.task} handleDeleteTaskItem={this.props.handleDeleteTaskItem} handleEditTaskItemClick={this.handleEditTaskItemClick} />
                    )
        }
    }
});

module.exports = TaskTableRow;