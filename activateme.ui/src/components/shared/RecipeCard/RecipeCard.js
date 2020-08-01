import React from 'react';
import { Link } from 'react-router-dom';
import RecipeShape from '../../../helpers/propz/recipeShape';
import { Card, Image, } from 'semantic-ui-react'
import './RecipeCard.scss';

class RecipeCard extends React.Component {
    static propTypes = {
        recipe: RecipeShape.recipeShape,
    }

    render() { 
        const {recipe} = this.props;
        
        return ( 
            <div className='four wide column'>
                 <a href={recipe.link}>
                    <Card>
                    <Image src={recipe.imageUrl} wrapped ui={false} alt={recipe.name}/>
                    <Card.Content>
                    <Card.Header className='ui center aligned grid'>{recipe.name}</Card.Header>
                    </Card.Content>
                    </Card>
                </a>
          </div>
         );
    }
}
 
export default RecipeCard;