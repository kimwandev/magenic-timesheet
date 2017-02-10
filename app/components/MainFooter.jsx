import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

var MainFooter = React.createClass({
    render:function(){

        return (

            <footer className="text-center">
            <Grid>
                <Row>
                    <Col sm={12}>
                        <p>Made by <a href="http://codepen/kimwan" rel="nofollow">Kimwan Ogot</a>. Contact him at <a href="mailto:kimo@magenic.com">kimo@magenic.com</a>.</p>
                        <p>Copyright 2017</p>
                    </Col>
                </Row>
            </Grid>
        </footer>
        )
    }

});


module.exports = MainFooter;