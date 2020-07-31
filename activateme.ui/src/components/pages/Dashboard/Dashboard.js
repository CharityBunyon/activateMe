import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../../helpers/data/imageData';
import moment from 'moment';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase/';
import 'firebase/auth';
import authData from '../../../helpers/data/authData';
import badgeData from '../../../helpers/data/badgeData';
import BadgeCard from './../../shared/BadgeCard/BadgeCard';
import {Button, Modal, Image, Header, Form, Input, Icon, Grid} from 'semantic-ui-react';

import './Dashboard.scss';

firebase.initializeApp(config);

class Dashboard extends React.Component {
    state ={
        firstname: '',
        lastname: '',
        city: '',
        state:'',
        image: '',
        imageUrl: '',
        user: {},
        email: '',
        badges: [], 
        foodPoints:'',
        exercisePoints: '',
        userId: Number(sessionStorage.getItem('userId')),
        isVisible: false,
        open: false,
    }
 
 
 componentDidMount(){
    badgeData.getEarnedBadges(this.state.userId)
    .then((badges) => {
        this.setState({ badges})
    })
    .catch((error) => console.error(error, 'error from getting badges'));
   firebase.auth().onAuthStateChanged((userObj) =>{
       if(userObj) {
           this.setState({email: userObj.email})
           this.getUser();
           this.getUserPoints();
           this.getExercisePoints();
       }
     }
   ) 
  
}

handleUploadSuccess = (filename) => {
    this.setState({
      image: filename,
    });
    firebase
      .storage()
      .ref('userImage')
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({
        imageUrl: url,
      }));
  };

    show = (size) => () => this.setState({ size, open: true })

    close = () => {
       this.setState({ open: false });
     }

     firstnameChange = (e) => {
        e.preventDefault();
        this.setState({ firstname: e.target.value });
      };

      lastnameChange = (e) => {
        e.preventDefault();
        this.setState({ lastname: e.target.value });
      };

      emailChange = (e) => {
        e.preventDefault();
        this.setState({ email: e.target.value });
      };

      cityChange = (e) => {
        e.preventDefault();
        this.setState({ city: e.target.value });
      };

      stateChange = (e) => {
        e.preventDefault();
        this.setState({ state: e.target.value });
      };

      editUserEvent = (e) => {
          e.preventDefault();
          const editUser = {
              Firstname: this.state.firstname,
              Lastname: this.state.lastname,
              Email: this.state.email,
              City: this.state.city,
              State: this.state.state,
              ImageUrl: this.state.imageUrl,
              Id: this.state.userId
          };
          authData.updateUserInfo(editUser)
          this.getUser();
          this.close();
          

      }

 getUser = () => {
     const {email} = this.state;
     authData.getUserByEmail(email)
     .then((user) => this.setState({user}))
     .catch((error) => console.error(error, 'error from getUser in dashboard'))
 }

 getUserPoints = () => {
     authData.getUserPoints(this.state.userId)
     .then((foodPoints) => this.setState({foodPoints}))
     .catch((error) => console.error(error, 'error from getPoints in dashboard'))
 }

 getExercisePoints = () => {
    authData.getExercisePoints(this.state.userId)
    .then((exercisePoints) => this.setState({exercisePoints}))
    .catch((error) => console.error(error, 'error from getPoints in dashboard'))
}



    render() { 
       
       const {user, badges, open, size, firstname, lastname, email, city, state, image, imageUrl } = this.state;
       const totalPoints = this.state.foodPoints + this.state.exercisePoints;

        return ( 
            <div>

            <Modal size={size} onClose={this.close} open={open}>
                <Modal.Header>Update User Profile</Modal.Header>
                <Modal.Content image>
                    <Grid>
                        <Grid.Row>
                        <div>{image && (<img className='uploadedImg' src={imageUrl} alt={imageUrl}/>)}</div> 
                        </Grid.Row>
                        <Grid.Row>
                        <FileUploader
                    accepts='image/*'
                    name='image'
                    storageRef={firebase.storage().ref('userImage/')}
                    onUploadSuccess={this.handleUploadSuccess}
                    
                />
                        </Grid.Row>
                    </Grid>
                
                <Modal.Content>
                
                </Modal.Content>
                    {/* <Image size='medium' src={image} wrapped /> */}
                    <Modal.Description>
                    <Header>Update Info</Header>
                            <Form>
                      
                            <Form.Field width={8}>
                                <label>Firstname</label>
                                <input 
                                type='text' 
                                placeholder='firstname' 
                                value={firstname}
                                onChange={this.firstnameChange}
                                required
                                />
                            </Form.Field>
                            <Form.Field width={8}>
                                <label>Lastname</label>
                                <input 
                                type='text' 
                                placeholder='lastname' 
                                value={lastname}
                                onChange={this.lastnameChange}
                                required
                                />
                            </Form.Field>
                            <Form.Field width={8}>
                                <label>Email</label>
                                <input 
                                type='text' 
                                placeholder='Email' 
                                value={email}
                                onChange={this.emailChange}
                                required
                                />
                            </Form.Field>
                            <Form.Field  width={8}>
                                <label>City</label>
                                <input 
                                type='text' 
                                placeholder='City' 
                                value={city}
                                onChange={this.cityChange}
                                required
                                />
                            </Form.Field>
                            <Form.Field width={8}>
                                <label>State</label>
                                <input 
                                type='text' 
                                placeholder='State' 
                                value={state}
                                onChange={this.stateChange}
                                required
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.close}>
                    Cancel
                    </Button>
                    <Button
                    content="Save Info"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={this.editUserEvent}
                    />
                </Modal.Actions>
            </Modal>
            <div className="ui grid container dash-container">
                <div className="four wide column">
                    <Image src={user.imageUrl} className="ui pro-image" alt='user-profile'/>
                </div>
                
                <div className="eight wide column">
                    <h1>Welcome back, {user.firstname} {user.lastname}</h1>
                    <div className='userInfo-container'>
                        <p className='userinfo'><strong className='city'>City:</strong> {user.city}</p>
                        <p className='userinfo'><strong className='state'>State:</strong> {user.state}</p>
                        <p className='userinfo'><strong className='member'>Member Since:</strong> {moment(user.dateJoined).format('MMMM Do, YYYY')}</p>
                        <Link className='ui large submit button teal' to='/activateme/updateUser'>Edit</Link>
                        <Button onClick={this.show('large')} color='brown'><Icon name='add circle'/>Modal Edit</Button>
                    </div>
                </div>

                <div className='three wide column points-container' >
                    <div className='content'>
                    <p className='total-points'>{totalPoints}</p>
                    <p className='points-earned'>Points Earned</p>
                    </div>   
                </div>
             
                </div>

                <div className='ui grid container'>
                <h1>Earned Badges</h1>
           
                <div className='badge-container ui grid'>
                
                    
                    {badges.map((badge) => <BadgeCard key={badge.badgeId} badge={badge} />)}
                    
                </div> 
              
                </div>
          
            
            </div>

         );
    }
}
 
export default Dashboard;