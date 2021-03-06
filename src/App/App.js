import React, { Component } from 'react';
import playerService from '../utilities/playerService';
import HomePage from '../pages/HomePage/HomePage';
import styles from './App.module.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			player: ''
		}
	}

	handleSignupOrLogin = () => {
		this.setState({player: playerService.getPlayer()});
  }

  handleLogout = () => {
    playerService.logout();
    this.setState({ player: '' });
	}

  async componentDidMount() {
    const player = playerService.getPlayer();
		this.setState({player});
	}

	render() {
    return (
			<div className={styles.App}>
				<HomePage 
				player={this.state.player}
				handleSignupOrLogin={this.handleSignupOrLogin}
				handleLogout={this.handleLogout}
				/>
			</div>
    );
  }
}

export default App;