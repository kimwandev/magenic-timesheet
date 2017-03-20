 import React, {Component} from 'react';
 import utils from '../../_utils/utils.js';
 import { Link } from 'react-router';

export default class TaskDetailsTableRow extends Component{
    constructor(props){
        super(props);
        this.renderTaskDescription = this.renderTaskDescription.bind(this);
    }

    getPomodoroTaskLink(task){
        return "/PomodoroDashboard/" + task.id;
    }

    renderTaskDescription(){
         if(this.props.task.statusId != 'Done'){
            return <Link to={this.getPomodoroTaskLink(this.props.task)}>{this.props.task.description}</Link>
         }
         else{
            return <span>{this.props.task.description}</span>
         }
         
    }

    render(){
        return (
            <tr>
                <td>
                    {this.renderTaskDescription()}
                </td>
                <td>{utils.GetPriorityById(this.props.task.priority)}</td>
                <td>{utils.GetStatusById(this.props.task.statusId)}</td>
                <td>
                   <div>
                        <button className="btn btn-info" onClick={this.props.handleEditTaskItemClick}><i className="fa fa-pencil"></i></button>
                        <button className="btn btn-danger" onClick={this.props.handleDeleteTaskItem}><i className="fa fa-trash"></i></button>
                   </div>
                </td>
            </tr>
        )
    }
};

TaskDetailsTableRow.propTypes= {
        task: React.PropTypes.object.isRequired,
        handleDeleteTaskItem: React.PropTypes.func.isRequired,
        handleEditTaskItemClick: React.PropTypes.func.isRequired
}