import React from 'react';
import MainHeader from '../components/MainHeader.js';
import Section from '../components/Section.js';

var About = React.createClass({
    render: function(){
        return(
            <div>
                <MainHeader />
                <Section title="About">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc urna leo, semper et dolor id, vestibulum condimentum nunc. Morbi porta tellus in leo rhoncus, nec efficitur diam vestibulum. Aliquam malesuada auctor lacus, ut sagittis nisl fermentum eget.
                </Section>
            </div>
        )
    }
})

module.exports = About;