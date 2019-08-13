import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Monster from '../Monster/Monster';
import styles from './World1.module.css';

class World1 extends Component {

	state = {
		gameOverDisplay: 'none',
		playerXPos: 0,
		playerYPos: 0,
		isColliding: false,
		backgroundColor: 'white', //this is here for a collision detection test
		health: 10
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentDidUpdate() {
		this.handleMapBoundries();
		this.handleColorChange();//this is here for a collision detection test
  }

	componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
	}
	
	handleMapBoundries() {
		if (this.state.playerXPos < 0) {
			this.setState({
				playerXPos: this.state.playerXPos + 1
			})
		} else if (this.state.playerXPos > 96) {
			this.setState({
				playerXPos: this.state.playerXPos - 1
			})
		}

    if (this.state.playerYPos < 0) {
      this.setState({
        playerYPos: this.state.playerYPos + 1
      })
    } else if (this.state.playerYPos > 96) {
      this.setState({
        playerYPos: this.state.playerYPos - 1
      })
    }
  }

	handleKeyPress = (e) => {
    switch(e.keyCode) {
      case 37:
      this.setState({
        playerXPos: this.state.playerXPos - 2
			});
			this.handleTakingDamage();
      break;
      case 39:
      this.setState({
        playerXPos: this.state.playerXPos + 2
			});
			this.handleTakingDamage();
      break;
      case 38:
      this.setState({
        playerYPos: this.state.playerYPos - 2
			});
			this.handleTakingDamage();
      break;
      case 40:
      this.setState({
				playerYPos: this.state.playerYPos + 2
			});
			this.handleTakingDamage();
      break;
      default:
    }
	}

	handleCollisionWithMonster = (colliding) => {
		this.setState({
			isColliding: colliding
		});
	}

	//this is here for a collision detection test
	handleColorChange() {
		if (this.state.isColliding && this.state.backgroundColor !== 'purple') {
			this.setState({backgroundColor: 'purple'});
		} else if (!this.state.isColliding && this.state.backgroundColor !== 'white') {
			this.setState({backgroundColor: 'white'});
		}
	}

	handleTakingDamage() {
		if (this.state.isColliding === true) {
			this.setState({
				health: this.state.health - 1
			});
		}
		
		if (this.state.health <= 0) {
			document.removeEventListener('keydown', this.handleKeyPress);
			this.setState({
				gameOverDisplay: 'block'
			});
		}
	}

	render() {

		let playerCoordinates = {
			left: `${this.state.playerXPos}%`,
			top: `${this.state.playerYPos}%`,
			backgroundColor: this.state.backgroundColor //this is here for a collision detection test
		}

		let gameOverDisplay = {
			display: this.state.gameOverDisplay
		}

		return (
			<div className={styles.World1Container}>

				<NavLink 
				exact 
				to='/harvest' 
				className={styles.BackToHarvestPage} 
				>
					<span className={styles.Close}>&times;</span>
				</NavLink>

				<div className={styles.World1}>

					<div className={styles.GameOver} style={gameOverDisplay}>YOU'VE BECOME TOO FATIGUED</div>

					<div className={styles.PlayerBlock} style={playerCoordinates}></div>

					<Monster
					playerXPos={this.state.playerXPos}
					playerYPos={this.state.playerYPos}
					color={'red'}
					handleCollisionWithMonster={this.handleCollisionWithMonster}
					isColliding={this.state.isColliding}
					/>

					<Monster
					playerXPos={this.state.playerXPos}
					playerYPos={this.state.playerYPos}
					color={'red'}
					handleCollisionWithMonster={this.handleCollisionWithMonster}
					isColliding={this.state.isColliding}
					/>

					<Monster
					playerXPos={this.state.playerXPos}
					playerYPos={this.state.playerYPos}
					color={'red'}
					handleCollisionWithMonster={this.handleCollisionWithMonster}
					isColliding={this.state.isColliding}
					/>

				</div>

			</div>
		);
	}
}

export default World1;