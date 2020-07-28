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
                <Card>
                <Image src={recipe.imageUrl} wrapped ui={false} alt={recipe.name}/>
                <Card.Content>
                <Card.Header>{recipe.name}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                <a href={recipe.link}>View</a>
                </Card.Content>
            </Card>
          </div>
         );
    }
}
 
export default RecipeCard;