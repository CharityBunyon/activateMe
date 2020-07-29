import React from 'react';
import BadgeShape from '../../../helpers/propz/badgeShape';
import { Button, Divider, Image, Transition } from 'semantic-ui-react'
import './BadgeCard.scss';

class BadgeCard extends React.Component {
    // state = {
    //     visibile: false
    // }

    static propTypes = {
        badge: BadgeShape.badgeShape,
    }

    // toogleVisibility = () => this.setState((prevState) => ({ visible: !prevState.visible }))
   
    render() { 
        const {badge} = this.props;
        // const { visible } = this.state;
        return ( 
            <div className='four wide column'>
               
                <div className="ui card">
                    <div className="badge-image">
                        <img src={badge.imageUrl} alt={badge.name}/>
                    </div>
                    <div className="extra content">
                    <p>{badge.pointValue} Points</p>
                    </div>
                </div>
              
            </div>
         );
    }
}
 
export default BadgeCard;