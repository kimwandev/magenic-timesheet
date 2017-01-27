import React from 'react';

//utils
import utils from '../_utils/utils.js';

var TaskTable = function(props){
    return (
        <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Task Details</td>
                                <td>Priority</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {props.tasks.map((task) => 
                                <tr key={task.id}>
                                        <td>{task.description}</td>
                                        <td>{utils.GetPriorityById(task.priority)}</td>
                                        <td>{utils.GetStatusById(task.statusId)}</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                    )
}

module.exports = TaskTable;