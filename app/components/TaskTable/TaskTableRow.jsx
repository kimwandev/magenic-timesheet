import React, {Component} from 'react';

import TaskDetailsTableRow from './TaskDetailsTableRow.jsx';
import EditableTaskTableRow from './EditableTaskTableRow.jsx';

export default class TaskTableRow extends Component{
    constructor(props){
        super(props);

        this.state = {  isEditable: false};
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleEditTaskItemClick = this.handleEditTaskItemClick.bind(this);
        this.handleSaveEditTaskItem = this.handleSaveEditTaskItem.bind(this);
    }
    
    handleEditTaskItemClick(){
        this.setState({isEditable: true});
    }

    handleSaveEditTaskItem(updatedTask){
        updatedTask.id = this.props.task.id;
        this.props.handleSaveEditTaskItem(updatedTask);
        this.setState({isEditable: false});
    }

    handleCancelEdit(){
        this.setState({isEditable: false});
    }

    render(){
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
};

TaskTableRow.propTypes = {
        task: React.PropTypes.object.isRequired,
        handleDeleteTaskItem: React.PropTypes.func.isRequired,
        handleSaveEditTaskItem: React.PropTypes.func.isRequired
    };