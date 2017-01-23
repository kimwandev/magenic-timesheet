import 'bootstrap/dist/css/bootstrap.css';
import './styles/custom.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Grid, Navbar, Nav, NavItem, Row, Jumbotron, Col } from 'react-bootstrap';

var MainBody = React.createClass({

    render: function(){
        return (
              <Jumbotron className="hero-bg">
                <h1>Magenic Timesheet</h1>
                <p>This is a UI for creating magenic timesheet. Feel free to loaf around.</p>
                <p><Button bsStyle="primary" bsSize="large">Learn more</Button></p>
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

var Section = React.createClass({

    render: function(){
        return(
            <div className="well">
                <div className="page-header">
                <h1 id="navs"> {this.props.title}</h1>
                </div>
                    <Col sm={12}>
                        {this.props.content}
                    </Col>
                    <div className="clearfix"></div>
            </div>
        )
    }
})

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

var Main = React.createClass({
    getInitialState: function(){

        return {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc urna leo, semper et dolor id, vestibulum condimentum nunc. Morbi porta tellus in leo rhoncus, nec efficitur diam vestibulum. Aliquam malesuada auctor lacus, ut sagittis nisl fermentum eget.'
        }
    },
    getSectionContent:function(){
            return(
                <blockquote>
                    {this.state.content}
                </blockquote>
            )

    },
    render: function(){
        return(
            <div>
                <MainHeader></MainHeader>
                <Grid>
                    <Row>
                        <MainBody></MainBody>
                    </Row>
                    
                    <Row>
                        <Section title="Section" content={this.getSectionContent()}></Section>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Card header="Card 1" content={this.state.content}></Card>
                        </Col>
                        <Col sm={4}>
                            <Card header="Card 2" content={this.state.content}></Card>
                        </Col>
                        <Col sm={4}>
                            <Card header="Card 3" content={this.state.content}></Card>
                        </Col>
                    </Row>
                    <Row>
                        <MainFooter></MainFooter>
                    </Row>
                </Grid>

            </div>
        )
    }
})

ReactDOM.render(<Main />, document.getElementById('root'));