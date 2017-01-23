import 'bootstrap/dist/css/bootstrap.css';
import './styles/custom.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Grid, Navbar, Nav, NavItem, Row, Jumbotron } from 'react-bootstrap';

var MainBody = React.createClass({

    render: function(){
        return (
              <Jumbotron>
                <h1>Magenic Timesheet</h1>
                <p>This is a UI for creating magenic timesheet. Feel free to loaf around.</p>
                <p><Button bsStyle="primary">Learn more</Button></p>
            </Jumbotron>
        )
    }
})

var MainHeader = React.createClass({

    render: function(){
        return (
              <Grid fluid>
                <Row>
                    <Navbar collapseOnSelect>
                        <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#" className="text-italic">Magenic Timesheet</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                        <Nav>
                            <NavItem href="#">Home</NavItem>
                            <NavItem href="#">About</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem href="#">Login / Signup</NavItem>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
              </Grid>
        )
    }
})

var MainFooter = React.createClass({
    render:function(){

        return (

            <footer className="text-center">
                <Row>
                <Grid sm={12}>
                    <p>Made by <a href="http://codepen/kimwan" rel="nofollow">Kimwan Ogot</a>. Contact him at <a href="mailto:kimo@magenic.com">kimo@magenic.com</a>.</p>
                    <p>Copyright 2017</p>

                </Grid>
                </Row>

        </footer>
        )
    }

});

var Main = React.createClass({

    render: function(){
        return(
            <div>
                <MainHeader></MainHeader>
                <Grid className="main-body">
                    <MainBody></MainBody>
                </Grid>
                <MainFooter></MainFooter>
            </div>
        )
    }
})

ReactDOM.render(<Main />, document.getElementById('root'));