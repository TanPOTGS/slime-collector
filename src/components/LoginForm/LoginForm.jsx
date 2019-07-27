import React, { Component } from 'react';
import playerService from '../../utilities/playerService';

class LoginForm extends Component {

  state = {
    username: '',
    password: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await playerService.login(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push('/');
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  }

  render() {
    return (
      <form autoComplete='off' onSubmit={this.handleSubmit}>
          <input type='text' placeholder="Username" autoComplete='off' value={this.state.username} name='username'onChange={this.handleChange} />
          <input type='password' placeholder="Password" autoComplete='off' value={this.state.password} name='password' onChange={this.handleChange} />
        <button>Enter</button>
      </form>
    );
  }
}

export default LoginForm;