
import React from 'react';

var Card = React.createClass({

    render : function(){
        return(
            <div>
                <h2>{this.props.header}</h2>
                <p>
                    <blockquote>{this.props.content}</blockquote>
                </p>
            </div>
        )
    }
})

module.exports = Card;