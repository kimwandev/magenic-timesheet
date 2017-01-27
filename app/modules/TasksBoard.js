import tasks from '../_data/tasks.js';
import React from 'react';
import MainHeader from '../components/MainHeader.js';
import Section from '../components/Section.js';
import TaskTable from '../components/TaskTable.js';

//data
import data from '../_data/tasks.js';

var TasksBoard = React.createClass({
    getInitialState: function(){
        return {
            tasks: data
        }

    },
    render: function(){

        return (
            <div>
                <MainHeader />
                <Section title="Tasks Table">
                    <TaskTable tasks={this.state.tasks}/>
                </Section>
            </div>
        )
    }
});

module.exports = TasksBoard;