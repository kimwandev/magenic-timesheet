import React, {Component} from 'react';
import PriorityDropdown from '../PriorityDropdown.jsx';
import StatusDropdown from '../StatusDropdown.jsx';

import utils from '../../_utils/utils.js';

export default class EditableTaskTableRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            editTaskModel:{
                name: '',
                id: 0,
                description : ''
            },
            currentPriority: '',
            currentStatus: ''
        }

        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleSaveEditTaskItem = this.handleSaveEditTaskItem.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
    }

    componentWillMount(){
        const currentPriority = utils.GetPriorityObjectById(this.props.task.priority);
        const currentStatus = utils.GetStatusObjectById(this.props.task.statusId);

        let editTaskModel = {
            name : this.props.task.name,
            id: this.props.task.id,
            description:this.props.task.description
        }

        this.setState({editTaskModel: editTaskModel, currentPriority:currentPriority, currentStatus: currentStatus});
    }

    onChangeDescription(event){
        let description = event.target.value;
        let editTaskModel = this.state.editTaskModel;
        editTaskModel.description = description;
        this.setState({editTaskModel: editTaskModel});
    }

    onChangeName(event){
        let name = event.target.value;
        let editTaskModel = this.state.editTaskModel;
        editTaskModel.name = name;
        this.setState({editTaskModel: editTaskModel});
    }

    handleSaveEditTaskItem(){
        this.state.editTaskModel.priority = this.state.currentPriority.id;
        this.state.editTaskModel.statusId = this.state.currentStatus.id;
        this.props.handleSaveEditTaskItem(this.state.editTaskModel);
    }

    handlePriorityChange(priority){
        this.setState({currentPriority:priority});
    }

    handleStatusChange(status){
        this.setState({currentStatus:status});
    }

    render(){
        return (
            <tr>
                <td>
                    <div className="row form-group">
                         <div className="col-sm-12">
                             <input type="text" className="form-control" value={this.state.editTaskModel.name} onChange={this.onChangeName} />
                         </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                        <textarea className="form-control" value={this.state.editTaskModel.description} onChange={this.onChangeDescription}></textarea>
                        </div>
                    </div>
                </td>
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
}

EditableTaskTableRow.propTypes = {
    task: React.PropTypes.object.isRequired,
    handleCancelEdit: React.PropTypes.func.isRequired,
    handleSaveEditTaskItem: React.PropTypes.func.isRequired
}