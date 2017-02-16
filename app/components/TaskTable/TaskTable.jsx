import React, {Component} from 'react';
import TaskTableRow from './TaskTableRow.jsx';
import SortableHeader from './SortableHeader.jsx';


export default class TaskTable extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            headerData: []
        }
    }


    componentWillMount(){
        let sortHeaderData = [];

        sortHeaderData.push({title:'Task Description', sortName: 'description'});
        sortHeaderData.push({title:'Priority', sortName: 'priority'});
        sortHeaderData.push({title:'Status', sortName: 'status'});
        sortHeaderData.push({title:'Actions', sortName: null});

        this.setState({headerData: sortHeaderData});
    }

    getSortableObject(){

    }

    render(){
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
};


TaskTable.propTypes = {
        handleDeleteTaskItem: React.PropTypes.func.isRequired,
        handleSaveEditTaskItem: React.PropTypes.func.isRequired,
        sortHandler: React.PropTypes.func.isRequired,
        sortOrder: React.PropTypes.string,
        sortBy: React.PropTypes.string
}