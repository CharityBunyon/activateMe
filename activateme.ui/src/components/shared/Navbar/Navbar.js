import React from 'react';
import './Navbar.scss'

class Navbar extends React.Component {

    render() { 
        return ( 
            <div class="pusher">
            <div class="ui  vertical masthead center aligned segment">
          
              <div class="ui container">
                <div class="ui large secondary pointing menu">
                  <a class="toc item">
                    <i class="sidebar icon"></i>
                  </a>
                  <a class="active item">Home</a>
                  <a class="item">Dashboard</a>
                  <a class="item">Log</a>
                  <a class="item">Recipes</a>
                  <a class="item">Exercises</a>
                  <div class="right item">
                    <a class="ui  button">Log in</a>
                    <a class="ui  button">Sign Up</a>
                  </div>
                </div>
              </div>
            </div>
            </div>
         );
    }
}
 
export default Navbar;

{/* <div className='navbar'>
    <div class='pusher'>
    <div class="ui  vertical masthead center aligned segment">
    </div>
</div> */}