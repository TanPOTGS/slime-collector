import React, { Component } from 'react';
import playerService from '../../utilities/playerService';

class SignupForm extends Component {

  state = {
    username: '',
    password: '',
    passwordConf: ''
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
			await playerService.signup(this.state);
			this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate username)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.username && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <input type="text" placeholder="Username" autoComplete='off' value={this.state.username} name="username" onChange={this.handleChange} />
          <input type="password" placeholder="Password" autoComplete='off' value={this.state.password} name="password" onChange={this.handleChange} />
          <input type="password" placeholder="Confirm Password" autoComplete='off' value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
          <button disabled={this.isFormInvalid()}>Sign Up</button>
        </form>
      </div>
    );
  }
};

export default SignupForm;