import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {message: ''}
	}

	updateMessage = (msg) => {
		this.setState({message: msg});
	}

	render() {
		return (
			<div className={styles.LoginPage}>
				<NavLink exact to='/' className={styles.HomeNavLink}>
					<span>&times;</span>
				</NavLink>
				<LoginForm {...this.props} updateMessage={this.updateMessage} />
        <p className={styles.ErrorMsg}>{this.state.message}</p>
			</div>
		);
	}
};

export default LoginPage;