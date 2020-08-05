import React from 'react';
import recipeData from '../../../helpers/data/recipeData';
import RecipeCard from '../../shared/RecipeCard/RecipeCard';
import recipePageImg from '../../../assets/nudge2.png';

import './Recipes.scss';

class Recipes extends React.Component {
    state = { 
        recipes: [],
     }

     componentDidMount(){
         recipeData.getAllRecipes()
         .then((recipes) => {
             this.setState({ recipes })
         })
         .catch((error) => console.error(error, 'error from getting recipes'));
     }
    render() { 

        const { recipes } = this.state;
        return ( 
            <div>
                <img src={recipePageImg} alt='girls working out' className='girls-workout'/>
                <div className='ui grid container center aligned'>
                    <h1 className='recipe-title'>Feed Your Soul With Some Plant Based Recipes</h1>
                    <div className=' ui grid'>
                        {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Recipes;