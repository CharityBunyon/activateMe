import React from 'react';
import BadgeShape from '../../../helpers/propz/badgeShape';
import './BadgeCard.scss';

class BadgeCard extends React.Component {
    static propTypes = {
        badge: BadgeShape.badgeShape,
    }

    render() { 
        const {badge} = this.props;
        // console.error(badge);
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