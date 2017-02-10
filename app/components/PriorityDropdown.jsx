import React from 'react';
import Dropdown from './Dropdown.jsx';

import {priorities} from '../_data/lookup.js';
import utils from '../_utils/utils.js';

var PriorityDropdown = React.createClass({
    propTypes:{
        onPriorityChange: React.PropTypes.func,
        selectedPriority: React.PropTypes.object.isRequired
    },
    getInitialState:function(){
        return {
            priorities:priorities
        }
    },
    getPriorityOptions: function(){
        var options = [];

        this.state.priorities.map((priority) => {
            options.push({text:priority.name, value:priority.id});
        });
        
        return options;
    },
    handleSelectedPriorityChange: function(event){
        var priorityId = parseInt(event.target.value);

        this.props.onPriorityChange(utils.GetPriorityObjectById(priorityId));
        
    },
    render: function(){
        return (
            <Dropdown options={this.getPriorityOptions()} selectedValue={this.props.selectedPriority.id} selectHandler={this.handleSelectedPriorityChange} />
        )
    }
});

module.exports = PriorityDropdown;