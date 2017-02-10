import React from 'react';
import Dropdown from './Dropdown.jsx';

import {statuses} from '../_data/lookup.js';
import utils from '../_utils/utils.js';

var StatusDropdown = React.createClass({
    propTypes:{
        onStatusChange: React.PropTypes.func,
        selectedStatus: React.PropTypes.any.isRequired
    },
    getInitialState:function(){
        return {
            statuses:statuses
        }
    },
    getStatusOptions: function(){
        var options = [];

        this.state.statuses.map((status) => {
            options.push({text:status.name, value:status.id});
        });
        
        return options;
    },
    handleSelectedStatusChange: function(event){
        var statusId = event.target.value;

        this.props.onStatusChange(utils.GetStatusObjectById(statusId));
        
    },
    render: function(){
        return (
            <Dropdown options={this.getStatusOptions()} selectedValue={this.props.selectedStatus.id} selectHandler={this.handleSelectedStatusChange} />
        )
    }
});

module.exports = StatusDropdown;