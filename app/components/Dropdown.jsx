import React from 'react';

var Dropdown = React.createClass({
    propTypes:{
        options : React.PropTypes.array.isRequired,
        selectedValue: React.PropTypes.any.isRequired,
        selectHandler: React.PropTypes.func
    },
    render:function(){
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
});

module.exports = Dropdown;