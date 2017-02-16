import {priorities, statuses} from '../_data/lookup.js';

function _getStatusById(id){

    switch (id) {
        case 'Todo':
            return 'To Do';
            break;
        case 'Inprogress':
            return 'In Progress';
            break;
        case 'Done':
            return 'Done';
            break;
        default:
            break;
    }
}

function _getPriorityById(id){

    switch (id) {
        case 1:
            return 'Low';
            break;
        case 2:
            return 'Medium';
            break;
        case 3:
            return 'High';
            break;
        default:
            break;
    }
}

function _getStatusObjectById(id){
    let status;
    statuses.map((item) => {
        if(item.id == id){
            status = item;
        }
    })

    return status;
}

function _getPriorityObjectById(id){
    let priority;
    priorities.map((item) => {
        if(item.id == id){
            priority = item;
        }
    })

    return priority;
}

export default {

    GetStatusById : _getStatusById,
    GetPriorityById: _getPriorityById,
    GetStatusObjectById: _getStatusObjectById,
    GetPriorityObjectById: _getPriorityObjectById

}