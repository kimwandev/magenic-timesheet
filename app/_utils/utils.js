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

module.exports = {

    GetStatusById : _getStatusById,
    GetPriorityById: _getPriorityById
}