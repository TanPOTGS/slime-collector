import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MainWindow from '../../components/MainWindow/MainWindow';
import playerService from '../../utilities/playerService';
import styles from './HomePage.module.css';

class HomePage extends Component {

	state = {
		id: null,
		health: null,
		canFight: null,
		bagIsFull: null,
		slimeCollection: null,
		slimeInventory: null
	}

	setHomePageState = () => {
		let player = playerService.getPlayer();

		this.setState({
			id: player._id,
			health: player.health,
			canFight: player.canFight,
			bagIsFull: player.bagIsFull,
			slimeCollection: player.slimeCollection,
			slimeInventory: player.slimeInventory
		});
		console.log(this.state);
	}

	// updateHomePageState = () => {
		
	// }

	render() {
		let nav = this.props.player ?
		<nav className={styles.MainNavbarLoggedIn}>

			<NavLink 
			exact 
			to='/howto' 
			className={styles.HowtoNavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.HowToPlayLinkSpan}>How To Play</span>
			</NavLink>

			<NavLink 
			exact 
			to='/harvest' 
			className={styles.HarvestNavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.HarvestLinkSpan}>Harvest</span>
			</NavLink>

			<NavLink 
			exact 
			to='/collection' 
			className={styles.CollectionNavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.CollectionLinkSpan}>Collection</span>
			</NavLink>

			<NavLink 
			exact 
			to='/inventory' 
			className={styles.InventoryNavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.InventoryLinkSpan}>Inventory</span>
			</NavLink>

			<NavLink 
			exact 
			to='/fuse' 
			className={styles.FuseNavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.FuseLinkSpan}>Fuse</span>
			</NavLink>

			<NavLink 
			exact 
			to='/trader' 
			className={styles.TraderNavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.TraderLinkSpan}>Trader</span>
			</NavLink>

			<NavLink 
			exact 
			to='/' 
			className={styles.LogoutNavLink} 
			onClick={this.props.handleLogout}
			>
				<span className={styles.LogoutLinkSpan}>Logout</span>
			</NavLink>

		</nav>
		:
		<nav className={styles.MainNavbarLoggedOut}>

			<NavLink 
			exact 
			to='/howto' 
			className={styles.HowtoNavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.HowToPlayLinkSpan}>How To Play</span>
			</NavLink>

			<NavLink 
			exact 
			to='/login' 
			className={styles.LoginNavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.LoginLinkSpan}>Continue</span>
			</NavLink>

			<NavLink
			exact 
			to='/signup' 
			className={styles.SignupNavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.SignupLinkSpan}>New Game</span>
			</NavLink>

		</nav>
		;
		return (
			<div className={styles.HomePage}>
				{nav}
				<MainWindow {...this.props} setHomePageState={this.setHomePageState} health={this.state.health} updateHomePageState={this.updateHomePageState}/>
			</div>
		);
	}
}

export default HomePage;