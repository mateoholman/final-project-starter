import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import '../css/App.css';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import Secret from './Secret';
import BeerListApp from './BeerListApp';
import ShowBeerList from './ShowBeerList';
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
          localStorage.setItem('token', token);
         console.log('The sign in token is: ' + token);
         this.setState({
           ...this.state,
           signUpSignInError: '',
           authenticated: token
         });
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

  renderUserBeerList() {
    // return <ShowBeerList>
  }

  renderApp() {
    return (
      <div>
        <Match exactly pattern="/" component={BeerListApp} />
        <Match exactly pattern="/beerList" render={(routerProps) => <ShowBeerList {...routerProps} />} />
        <Match exactly pattern="/secret" component={Secret} />
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
