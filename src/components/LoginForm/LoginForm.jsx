import React, { Component } from 'react';
import playerService from '../../utilities/playerService';
import styles from './LoginForm.module.css';

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
			this.props.setHomePageState();
      this.props.history.push('/');
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  }

  render() {
    return (
      <form className={styles.LoginForm} autoComplete='off'>

				<div className={styles.FormLable}>
					<span>Username:</span>
					
					<input 
					className={styles.FormInput}
					type='text'
					autoComplete='off'
					value={this.state.username}
					name='username'
					onChange={this.handleChange}
					/>
				</div>

				<div className={styles.FormLable}>
					<span>Password:</span>

					<input 
					className={styles.FormInput}
					type='password'
					autoComplete='off'
					value={this.state.password}
					name='password'
					onChange={this.handleChange}
					/>
				</div>

        <span className={styles.FormButton} onClick={this.handleSubmit}>Enter</span>

      </form>
    );
  }
}

export default LoginForm;