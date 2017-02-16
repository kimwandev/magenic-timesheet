import React, {Component} from 'react';

export default class Dropdown extends Component{
    constructor(){
        super();
    }
    
    render(){
        return (
                 <select className="form-control" onChange={this.props.selectHandler} value={this.props.selectedValue}>
                    {this.props.options.map((option) => {
                        return(
                            <option key={option.value} value={option.value}>{option.text}</option>
                        )
                    })}
                </select>
           
        )
    }
};

Dropdown.propType = {
        options : React.PropTypes.array.isRequired,
        selectedValue: React.PropTypes.any.isRequired,
        selectHandler: React.PropTypes.func
    }