import React from 'react';
import { Button, Jumbotron, Grid} from 'react-bootstrap';

var MainBody = React.createClass({

    render: function(){
        return (
              <Grid>
                    <Jumbotron className="hero-bg">
                    <h1>Magenic Timesheet</h1>
                    <p>This is a UI for creating magenic timesheet. Feel free to loaf around.</p>
                    <p><Button bsStyle="primary" bsSize="large">Learn more</Button></p>
                    </Jumbotron>
              </Grid>
        )
    }
})

module.exports = MainBody;