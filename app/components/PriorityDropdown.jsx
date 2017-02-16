import React, {Component} from 'react';
import Dropdown from './Dropdown.jsx';

import {priorities} from '../_data/lookup.js';
import utils from '../_utils/utils.js';

export default class PriorityDropdown extends Component{

    constructor(props){
        super(props);

        this.state = {
            priorities:[]
        }
    }

    componentWillMount(){
        this.setState({priorities: priorities});
    }

    getPriorityOptions(){
        const options = [];

        this.state.priorities.map((priority) => {
            options.push({text:priority.name, value:priority.id});
        });
        
        return options;
    }

    handleSelectedPriorityChange(event){
        const priorityId = parseInt(event.target.value);

        this.props.onPriorityChange(utils.GetPriorityObjectById(priorityId));
        
    }

    render(){
        return (
            <Dropdown options={this.getPriorityOptions()} selectedValue={this.props.selectedPriority.id} selectHandler={this.handleSelectedPriorityChange} />
        )
    }
};

PriorityDropdown.propTypes = {
    onPriorityChange: React.PropTypes.func,
    selectedPriority: React.PropTypes.object.isRequired
}