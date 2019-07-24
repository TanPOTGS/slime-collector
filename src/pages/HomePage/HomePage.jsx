import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MainWindow from '../../components/MainWindow/MainWindow';
import styles from './HomePage.module.css';

class HomePage extends Component {
  render() {
    return (
      <div className={styles.HomePage}>

				<nav className={styles.MainNavbar}>
					<NavLink exact to='/login' className={styles.LoginNavLink} activeClassName={styles.NavLinkCurrent}>
						<span className={styles.LoginTitle}>Continue</span>
					</NavLink>
					<NavLink exact to='/signup' className={styles.SignupNavlink} activeClassName={styles.NavLinkCurrent}>
						<span className={styles.SignupTitle}>New Game</span>
					</NavLink>
				</nav>

				<MainWindow />
				
      </div>
    );
  }
}

export default HomePage;