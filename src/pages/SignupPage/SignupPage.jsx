import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SignupForm from '../../components/SignupForm/SignupForm';
import styles from './SignupPage.module.css';

class SignupPage extends Component {
	constructor(props) {
		super(props);
		this.state = {message: ''}
	}

	updateMessage = (msg) => {
		this.setState({message: msg});
	}

	render() {
		return (
			<div className={styles.SignupPage}>
				<NavLink exact to='/' className={styles.HomeNavLink}>
					<span className={styles.Close}>&times;</span>
				</NavLink>
				<SignupForm {...this.props} updateMessage={this.updateMessage} />
        <p>{this.state.message}</p>
			</div>
		);
	}
};

export default SignupPage;