import React, {Component} from 'react';
import MainHeader from '../components/MainHeader.jsx';
import Section from '../components/Section.jsx';

class About extends Component{
    constructor(){
        super();

        this.state = {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc urna leo, semper et dolor id, vestibulum condimentum nunc. Morbi porta tellus in leo rhoncus, nec efficitur diam vestibulum. Aliquam malesuada auctor lacus, ut sagittis nisl fermentum eget.'
        }
    }
    
    render(){
        return(
            <div>
                <MainHeader />
                <Section title="About">
                    {this.state.content}
                </Section>
            </div>
        )
    }
}

module.exports = About;