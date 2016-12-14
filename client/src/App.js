// After sign-out I'm getting authentication errors. The user is not being routed
// away from secret when they sign-out.

import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import './App.css';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import Secret from './Secret';
import List from './List';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      SignUpSignInError: '',
      authenticated: localStorage.getItem('token')
    };
  }

  handleSignUp(credentials) {
   const { username, password, confirmPassword } = credentials;
   if (!username.trim() || !password.trim() || password.trim() !== confirmPassword.trim()) {
     this.setState({
       ...this.state,
       signUpSignInError: 'Must Provide All Fields'
     });
   } else {
     axios.post('/api/signup', credentials)
       .then(resp => {
         const { token } = resp.data;
         this.setState({
           ...this.state,
           signUpSignInError: '',
           authenticated: token
         });
         localStorage.setItem('token', token);
       });
   }
 }//End handleSignUp()

 handleSignIn(credentials) {
   //Need to setup notices if username is not found or if password
   //does not match.
   const { username, password } = credentials;
   //Make sure the user entered a username & password
   if (!username.trim() || !password.trim()) {
     this.setState({
       ...this.state,
       signUpSignInError: 'Must Provide All Fields'
     });
   } else {
     //Verify the user exists & the password matches the user.
     axios.post('/api/signin', credentials)
       .then(resp => {
         const { token } = resp.data;
         console.log('The sign in token is: ' + token);
         this.setState({
           ...this.state,
           signUpSignInError: '',
           authenticated: token
         });
         localStorage.setItem('token', token);
       });
   }
 }//End handleSignIn()

  handleSignOut() {
    localStorage.removeItem('token');
    console.log('The local storage token is: ' + localStorage.getItem('token'));
    this.setState({
      ...this.state,
      authenticated: false
    });
    console.log('Authenticated state is: ' + this.state.authenticated);
    axios.get('/');
  }

  renderSignUpSignIn() {
    return <SignUpSignIn error={this.state.signUpSignInError} onSignUp={this.handleSignUp.bind(this)} onSignIn={this.handleSignIn.bind(this)} />
  }

  renderApp() {
    return (
      <div>
        <Match exactly pattern="/" render={() => <h1>I am protected!</h1>} />
        <Match exactly pattern="/secret" component={Secret} />
        <Match exactly pattern="/lists" component={List} />
        <Miss render={() => <h1>NOT FOUND!</h1>} />
      </div>
    );
  }//End renderApp()

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar showNavItems={this.state.authenticated} onSignOut={this.handleSignOut.bind(this)}/>
          {this.state.authenticated ? this.renderApp() : this.renderSignUpSignIn()}
        </div>
      </BrowserRouter>
    );
  }//End render()
}

export default App;
