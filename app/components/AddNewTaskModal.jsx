import React from 'react';
import NewTaskForm from './NewTaskForm.jsx';

var AddNewTaskModal = React.createClass({
    propTypes:{
        showModal: React.PropTypes.bool.isRequired,
        onCancel: React.PropTypes.func.isRequired
    },
    render: function(){
        if(this.props.showModal){
            return(
                <div className="modal fade in" style={{display: 'block'}}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Add New Task</h4>
                                    </div>
                                    <div className="modal-body">
                                        <NewTaskForm handleSubmit={this.props.handleAddNewTaskSubmit} handleCancelAdd={this.props.onCancel}></NewTaskForm>
                                    </div>
                                    </div>
                                </div>
                            </div>

            )
        }
        else{
            return null;
        }
    }
});

module.exports = AddNewTaskModal;