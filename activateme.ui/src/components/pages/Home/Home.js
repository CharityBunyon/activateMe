import React from 'react';
import { Link } from 'react-router-dom';
import plant from '../../../assets/plants-landing.jpg'
import exercise from '../../../assets/exercise-landing.jpg'
import './Home.scss';

class Home extends React.Component {
    render() { 
   
        return ( 
            <div>
                <div className="pusher landing-img">
                    <div className="ui vertical masthead center aligned segment">
                        <div className="ui text container">
                            <h1 className="ui inverted header">ACTIVATE ME </h1>
                            <h2 className='slogan'>Muscle Powered by Plants</h2>
                            <Link to='/activateme/login' className="ui huge black button">Get Started <i className="right arrow icon"></i></Link>
                                
                        </div>
                    </div> 
                </div>

                <div className="ui vertical stripe segment">
                    <div className="ui middle aligned stackable grid container">
                        <div className="row">
                        <div className="eight wide column">
                            <h3 className="ui header">Why Plant-Based</h3>
                            <p>Plants are rich sources of many nutrients that are important for good health, including unsaturated fats, vitamins (such as folate), minerals (such as potassium), fibre and protein.</p>
                            <p>Eating a plant-based diet has been linked to lower risk of obesity and many chronic diseases, such as heart disease, type 2 diabetes, inflammation and cancer. Incorporate more plants in you diet today by click the <strong className='bold-text'>Take Me There </strong> 
                            button below.</p>
                            <Link to='/activateme/recipes' className="ui huge teal button">Take Me There</Link>
                        </div>
                        <div className="six wide right floated column">
                            <img src={plant} className="" alt='salad'/>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="ui vertical stripe segment">
                    <div className="ui middle aligned stackable grid container">
                    <div className="row">
                        <div className="six wide left floated column">
                            <img src={exercise} className="" alt='salad'/>
                        </div>
                        <div className="eight wide column">
                            <h3 className="ui header">Why Exercise?</h3>
                            <p>Along with diet, exercise plays an important role in controlling your weight and preventing obesity.To maintain your weight, the calories you eat and drink must equal the energy you burn. To lose weight, you must use more calories than you eat and drink.</p>
                            <p>During exercise, your body releases chemicals that can improve your mood and make you feel more relaxed. This can help you deal with stress and reduce your risk of depression. Incorporate more exercise in you diet today by click the <strong className='bold-text'>Take Me There. </strong> </p>
                            <Link to='/activateme/exercises' className="ui huge teal button">Take Me There</Link>
                        </div>
                    </div>
                    </div>
                </div>
               
        </div>
       

         );
    }
}
 
export default Home;