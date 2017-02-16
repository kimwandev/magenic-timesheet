import React, {Component} from 'react';
import Dropdown from './Dropdown.jsx';

import {statuses} from '../_data/lookup.js';
import utils from '../_utils/utils.js';

export default class StatusDropdown extends Component{
    constructor(props){
        super(props);

        this.state = { statuses:statuses };
    }
    
    getStatusOptions(){
        let options = [];

        this.state.statuses.map((status) => {
            options.push({text:status.name, value:status.id});
        });
        
        return options;
    }

    handleSelectedStatusChange(event){
        const statusId = event.target.value;

        this.props.onStatusChange(utils.GetStatusObjectById(statusId));
        
    }

    render(){
        return (
            <Dropdown options={this.getStatusOptions()} selectedValue={this.props.selectedStatus.id} selectHandler={this.handleSelectedStatusChange} />
        )
    }
}

StatusDropdown.propTypes = {
    onStatusChange: React.PropTypes.func,
    selectedStatus: React.PropTypes.any.isRequired
}