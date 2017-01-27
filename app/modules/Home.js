import React from 'react';

import { Grid} from 'react-bootstrap'

import MainBody from '../components/MainBody.js';
import MainHeader from '../components/MainHeader.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import MainFooter from '../components/MainFooter.js';


var Home = React.createClass({
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
                <MainHeader />
                    <MainBody />
                    <Section title="Section">
                        {this.getSectionContent()}
                    </Section>
                    <MainFooter />
            </div>
        )
    }
})

module.exports = Home;