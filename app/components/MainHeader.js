import React from 'react';
import { Grid, Row, Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router';

var MainHeader = React.createClass({
    render: function(){
        return (
              <Grid fluid>
                <Row>
                    <Navbar collapseOnSelect>
                        <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/#/Home" className="text-italic">Magenic Timesheet</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                        <ul className="nav navbar-nav">
                        <li>
                        
                            <Link activeClassName="active" to="/Home">Home</Link>
                        </li>
                        <li>
                            <Link activeClassName="active" to="/About">About</Link></li>
                            <li>
                            <Link activeClassName="active" to="/TasksBoard">Task Board</Link></li>
                        </ul>
                        <Nav pullRight>
                            <NavItem href="#">Login / Signup</NavItem>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
              </Grid>
        )
    }
});

module.exports = MainHeader;