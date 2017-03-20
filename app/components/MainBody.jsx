import React, {Component} from 'react';
import { Button, Jumbotron, Grid} from 'react-bootstrap';

export default class MainBody extends Component{
    constructor(){
        super();
    }
    render (){
        return (
              <Grid>
                    <Jumbotron className="hero-bg">
                    <h1>Magenic +</h1>
                    <p>This is a UI for creating magenic timesheet. Feel free to loaf around.</p>
                    <p><Button bsStyle="primary" bsSize="large">Learn more</Button></p>
                    </Jumbotron>
              </Grid>
        )
    }
}