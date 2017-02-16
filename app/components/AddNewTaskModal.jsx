import React, {Component} from 'react';
import NewTaskForm from './NewTaskForm.jsx';
import ModalHOC from './HOC/ModalHOC.jsx';

class AddNewTaskModal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
                <NewTaskForm handleSubmit={this.props.handleAddNewTaskSubmit} handleCancelAdd={this.props.onCancel} />
            )
    }
};

AddNewTaskModal.propTypes = {
        showModal: React.PropTypes.bool.isRequired,
        onCancel: React.PropTypes.func.isRequired
};

export default ModalHOC(AddNewTaskModal);