import React, {Component} from 'react';
import { Grid, Row, Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router';
import TaskStore from '../store/TaskStore.js';
import * as TaskActions from '../actions/TaskActions.js';

export default class MainHeader extends Component{
    constructor(){
        super();

        this.state = {
            hignPriorityTasks: [],
            shouldShowPriorityTasks:false
        }

        this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
        this.showPriorityTaskDropdown = this.showPriorityTaskDropdown.bind(this);
        this.hidePriorityDropdown = this.hidePriorityDropdown.bind(this);
    }
    componentWillMount(){

        TaskStore.on('change', () => {
            this.setState({hignPriorityTasks: TaskStore.highPriorityTasks});
        })
        
        TaskActions.fetchTasksByPriority(3);
    }

    toggleDropdownMenu(){
        this.setState({shouldShowPriorityTasks: !this.state.shouldShowPriorityTasks});
    }

    showPriorityTaskDropdown(){
         this.setState({shouldShowPriorityTasks: true});
    }

    hidePriorityDropdown(){
         this.setState({shouldShowPriorityTasks: false});
    }

    getDropdownClass(){

        let ddClass = 'dropdown';

        if(this.state.shouldShowPriorityTasks){
            ddClass+= ' open';
        }

        return ddClass;
    }

    render(){
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
                        <ul className="nav navbar-nav navbar-right" onMouseLeave={this.hidePriorityDropdown}>
                             <li className={this.getDropdownClass()}>
                             <a className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false" onClick={this.toggleDropdownMenu} onMouseOver={this.showPriorityTaskDropdown}>
                                <i className="fa fa-tasks"></i> {this.state.hignPriorityTasks.length}<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li className="active"><a>HIGH PRIORITY TASKS</a></li>
                                    {this.state.hignPriorityTasks.map((task) => {
                                        return <li key={task.id}><a><i className="fa fa-tag"></i> {task.name}</a></li>
                                    })}
                                </ul>
                            </li>
                            <NavItem href="#"><i className="fa fa-user-circle"></i> Hi User!</NavItem>
                        </ul>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
              </Grid>
        )
    }
};