// import React from 'react';
// import FileUploader from 'react-firebase-file-uploader';
// import authData from '../../../helpers/data/authData';
// import firebase from 'firebase';
// import {Form, Button } from 'semantic-ui-react'
// import config from '../../../helpers/data/imageData';

// import './UserForm.scss';

// firebase.initializeApp(config);

// class UserForm extends React.Component {
//     state = { 
//         firstname: '',
//         lastname: '',
//         city: '',
//         state:'',
//         image: '',
//         imageUrl: '',
//         email: '',
//         userId: Number(sessionStorage.getItem('userId')),

//      }

//      handleUploadSuccess = (filename) => {
//         this.setState({
//           image: filename,
//         });
//         firebase
//           .storage()
//           .ref('userImage')
//           .child(filename)
//           .getDownloadURL()
//           .then((url) => this.setState({
//             imageUrl: url,
//           }));
//       };

//       firstnameChange = (e) => {
//         e.preventDefault();
//         this.setState({ firstname: e.target.value });
//       };

//       lastnameChange = (e) => {
//         e.preventDefault();
//         this.setState({ lastname: e.target.value });
//       };

//       emailChange = (e) => {
//         e.preventDefault();
//         this.setState({ email: e.target.value });
//       };

//       cityChange = (e) => {
//         e.preventDefault();
//         this.setState({ city: e.target.value });
//       };

//       stateChange = (e) => {
//         e.preventDefault();
//         this.setState({ state: e.target.value });
//       };

//       editUserEvent = (e) => {
//           e.preventDefault();
//           const editUser = {
//               Firstname: this.state.firstname,
//               Lastname: this.state.lastname,
//               Email: this.state.email,
//               City: this.state.city,
//               State: this.state.state,
//               ImageUrl: this.state.imageUrl,
//               Id: this.state.userId
//           };
//           authData.updateUserInfo(editUser)
//           .then(() => this.props.history.push('/activateme/dashboard'))

//       }


//     render() { 
//         const { firstname, lastname, email, city, state, image, imageUrl} = this.state;

//         return ( 
//             <div className='ui container'>
//               <h1 className='food-form-name'>Edit Profile Info</h1>
//                 <Form>
//                 <div>
//                 <p><strong>Upload Image</strong></p>
//                 {image && (<img className='uploadedImg' src={imageUrl} alt={imageUrl}/>)}
//                 <Form.Field width={8}>
//                 <FileUploader
//                     accepts='image/*'
//                     name='image'
//                     storageRef={firebase.storage().ref('userImage/')}
//                     onUploadSuccess={this.handleUploadSuccess}
                    
//                 />
//                 </Form.Field>
//                 </div>
//                 <Form.Field width={8}>
//                     <label>Firstname</label>
//                     <input 
//                     type='text' 
//                     placeholder='firstname' 
//                     value={firstname}
//                     onChange={this.firstnameChange}
//                     required
//                     />
//                 </Form.Field>
//                 <Form.Field width={8}>
//                     <label>Lastname</label>
//                     <input 
//                     type='text' 
//                     placeholder='lastname' 
//                     value={lastname}
//                     onChange={this.lastnameChange}
//                     required
//                     />
//                 </Form.Field>
//                 <Form.Field width={8}>
//                     <label>Email</label>
//                     <input 
//                     type='text' 
//                     placeholder='Email' 
//                     value={email}
//                     onChange={this.emailChange}
//                     required
//                     />
//                 </Form.Field>
//                 <Form.Field  width={8}>
//                     <label>City</label>
//                     <input 
//                     type='text' 
//                     placeholder='City' 
//                     value={city}
//                     onChange={this.cityChange}
//                     required
//                     />
//                 </Form.Field>
//                 <Form.Field width={8}>
//                     <label>State</label>
//                     <input 
//                     type='text' 
//                     placeholder='State' 
//                     value={state}
//                     onChange={this.stateChange}
//                     required
//                     />
//                 </Form.Field>
//                 <Button className='ui large submit button teal' onClick={this.editUserEvent}>Edit User</Button>
//                 </Form>
//             </div>
//          );
//     }
// }
 
// export default UserForm;