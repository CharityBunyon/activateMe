import React from 'react';
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
  } from 'semantic-ui-react'
  import logo from '../../../assets/activate-logo.png'
import './Footer.scss';

const Footer = () => (
    <div>
        <Segment inverted vertical style={{ margin: '2em 0em 0em', padding: '1em 0em' }}>
      <Container textAlign='center'>
        
     
        <Image centered size='mini' src={logo} />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Blog
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
);
    
 
export default Footer;