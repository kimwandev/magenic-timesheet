import React from 'react';
import { Col, Grid } from 'react-bootstrap';

var Section = React.createClass({

    render: function(){
        return(
            <Grid>
                <div className="page-header">
                <h1 id="navs"> {this.props.title}</h1>
                </div>
                    <Col sm={12}>
                        {this.props.children}
                    </Col>
                    <div className="clearfix"></div>
            </Grid>
        )
    }
})

module.exports = Section;