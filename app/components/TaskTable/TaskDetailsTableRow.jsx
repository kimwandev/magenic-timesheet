 import React, {Component} from 'react';
 import utils from '../../_utils/utils.js';

export default class TaskDetailsTableRow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <tr>
                <td>{this.props.task.description}</td>
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