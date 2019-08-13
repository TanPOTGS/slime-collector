import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SignupForm from '../../components/SignupForm/SignupForm';
import styles from './SignupPage.module.css';

class SignupPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			errorDisplay: 'none'
		}
	}

	updateMessage = (msg) => {
		this.setState({
			message: msg
		});
	}

	handleBorderDisplay = () => {
		this.setState({
			errorDisplay: '10px double white'
		});
	}

	render() {
		
		let errorDisplay = {
			border: this.state.errorDisplay
		}

		return (
			<div className={styles.SignupPage}>

				<NavLink exact to='/' className={styles.HomeNavLink}>
					<span className={styles.Close}>&times;</span>
				</NavLink>

				<SignupForm {...this.props} updateMessage={this.updateMessage} handleBorderDisplay={this.handleBorderDisplay}/>
        
				<p className={styles.ErrorMsg} style={errorDisplay}>{this.state.message}</p>

			</div>
		);
	}
};

export default SignupPage;