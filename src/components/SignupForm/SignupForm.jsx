import React, { Component } from 'react';
import playerService from '../../utilities/playerService';
import styles from './SignupForm.module.css';

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
			this.props.handleBorderDisplay();
      // Invalid user data (probably duplicate username)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.username && this.state.password === this.state.passwordConf && this.state.password !== '');
  }

  render() {
    return (
      <div>
				
        <form className={styles.SignupForm} onSubmit={this.handleSubmit} >
					
					<div className={styles.FormLable}>

						<span>Username:</span>

						<input
						className={styles.FormInput}
						type="text"
						autoComplete='off'
						value={this.state.username}
						name="username"
						onChange={this.handleChange}
						/>

					</div>

					<div className={styles.FormLable}>

						<span>Password:</span>

						<input
						className={styles.FormInput}
						type="password"
						autoComplete='off'
						value={this.state.password}
						name="password"
						onChange={this.handleChange}
						/>

					</div>

					<div className={styles.FormLable}>

						<span>Confirm Password:</span>

						<input
						className={styles.FormInput}
						type="password"
						autoComplete='off'
						value={this.state.passwordConf}
						name="passwordConf"
						onChange={this.handleChange}
						/>

					</div>

          <button className={styles.FormButton} disabled={this.isFormInvalid()}>Sign Up</button>

        </form>

      </div>
    );
  }
};

export default SignupForm;