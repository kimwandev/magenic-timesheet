
import React, {Component} from 'react';

export default class Card extends Component{
    constructor(){
        super();
    }
    
    render(){
        return(
            <div>
                <h2>{this.props.header}</h2>
                <p>
                    <blockquote>{this.props.content}</blockquote>
                </p>
            </div>
        )
    }
}
