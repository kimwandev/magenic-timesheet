import React from 'react';
import TaskTableRow from './TaskTableRow.jsx';
import SortableHeader from './SortableHeader.jsx';


var TaskTable = React.createClass({
    propTypes: {
        handleDeleteTaskItem: React.PropTypes.func.isRequired,
        handleSaveEditTaskItem: React.PropTypes.func.isRequired,
        sortHandler: React.PropTypes.func.isRequired,
        sortOrder: React.PropTypes.string,
        sortBy: React.PropTypes.string
    },
    getInitialState:function(){
        let sortHeaderData = [];

        sortHeaderData.push({title:'Task Description', sortName: 'description'});
        sortHeaderData.push({title:'Priority', sortName: 'priority'});
        sortHeaderData.push({title:'Status', sortName: 'status'});
        sortHeaderData.push({title:'Actions', sortName: null});
        return {
            headerData: sortHeaderData
        }
    },
    getSortableObject:function(){

    },
    render: function(){
            return (
                    <table className="table table-striped">
                        <thead>
                            <SortableHeader headerData={this.state.headerData} sortHandler={this.props.sortHandler} sortBy={this.props.sortBy} sortOrder={this.props.sortOrder} />
                        </thead>
                        <tbody>
                            {this.props.tasks.map((task) => 
                                <TaskTableRow task={task} key={task.id} handleDeleteTaskItem={this.props.handleDeleteTaskItem.bind(null, task.id)} handleSaveEditTaskItem={this.props.handleSaveEditTaskItem} />
                            )}
                        </tbody>
                    </table>
                    )
    }
});

module.exports = TaskTable;