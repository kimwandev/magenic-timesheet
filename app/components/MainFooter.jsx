import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

export default class MainFooter extends Component{
    constructor(){
        super();
    }
    render(){

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

};