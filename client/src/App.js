import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import './App.css';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import Secret from './Secret';
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
   const { username, password } = credentials;
   if (!username.trim() || !password.trim()) {
     this.setState({
       ...this.state,
       signUpSignInError: 'Must Provide All Fields'
     });
   } else {
     axios.post('/api/signin', credentials)
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
 }//End handleSignIn()

  handleSignOut() {
    localStorage.removeItem('token');
    this.setState({
      signUpSignInError: '',
      authenticated: false
    });
  }

  renderSignUpSignIn() {
    return <SignUpSignIn error={this.state.signUpSignInError} onSignUp={this.handleSignUp.bind(this)} onSignIn={this.handleSignIn.bind(this)} />
  }

  renderApp() {
    return (
      <div>
        <Match exactly pattern="/" render={() => <h1>I am protected!</h1>} />
        <Match exactly pattern="/secret" component={Secret} />
        <Miss render={() => <h1>NOT FOUND!</h1>} />
      </div>
    );
  }//End renderApp()

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar showNavItems={true} onSignOut={this.handleSignOut.bind(this)}/>
          {this.state.authenticated ? this.renderApp() : this.renderSignUpSignIn()}
        </div>
      </BrowserRouter>
    );
  }//End render()
}

export default App;
