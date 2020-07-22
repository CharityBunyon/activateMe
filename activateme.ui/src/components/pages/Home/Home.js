import React from 'react';
import { Link } from 'react-router-dom';
import plant from '../../../assets/plants-landing.jpg'
import exercise from '../../../assets/exercise-landing.jpg'
import './Home.scss';

class Home extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div class="pusher landing-img">
                    <div class="ui vertical masthead center aligned segment">
                        <div class="ui text container">
                            <h1 className="ui inverted header">ACTIVATE ME </h1>
                            <h2 className='slogan'>Muscle Powered by Plants</h2>
                            <Link to='/activateme/login' class="ui huge black button">Get Started <i class="right arrow icon"></i></Link>
                        </div>
                    </div> 
                </div>

                <div class="ui vertical stripe segment">
                <div class="ui middle aligned stackable grid container">
                <div class="row">
                    <div class="eight wide column">
                    <h3 class="ui header">Why Plant-Based</h3>
                    <p>
                    Plants are rich sources of many nutrients that are important for good health, including unsaturated fats, vitamins (such as folate), minerals (such as potassium), fibre and protein.</p>
                    <p>Eating a plant-based diet has been linked to lower risk of obesity and many chronic diseases, such as heart disease, type 2 diabetes, inflammation and cancer. Incorporate more plants in you diet today by click the <strong className='bold-text'>Take Me There </strong> 
                    button below.</p>
                    <Link to='/activateme/recipes' class="ui huge teal button">Take Me There</Link>
                    </div>
                    <div class="six wide right floated column">
                    <img src={plant} class="" alt='salad'/>
                    </div>
                </div>
                
                </div>
                </div>

                <div class="ui vertical stripe segment">
                <div class="ui middle aligned stackable grid container">
                <div class="row">
                <div class="six wide left floated column">
                    <img src={exercise} class="" alt='salad'/>
                    </div>
                    <div class="eight wide column">
                    <h3 class="ui header">Why Exercise?</h3>
                    <p>Along with diet, exercise plays an important role in controlling your weight and preventing obesity.To maintain your weight, the calories you eat and drink must equal the energy you burn. To lose weight, you must use more calories than you eat and drink.</p>
                    <p>During exercise, your body releases chemicals that can improve your mood and make you feel more relaxed. This can help you deal with stress and reduce your risk of depression.</p>
                    <Link to='/activateme/exercises' class="ui huge teal button">Take Me There</Link>
                    </div>
                    
                </div>
                
                </div>
                </div>
        </div>
       

         );
    }
}
 
export default Home;