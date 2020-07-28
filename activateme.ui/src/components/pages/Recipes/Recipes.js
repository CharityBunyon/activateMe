import React from 'react';
import recipeData from '../../../helpers/data/recipeData';
import RecipeCard from '../../shared/RecipeCard/RecipeCard';
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
                <h1>Recipes Page</h1>
                <div className=' ui grid'>
                    {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
                </div>
            </div>
         );
    }
}
 
export default Recipes;