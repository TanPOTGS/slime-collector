import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Monster from '../Monster/Monster';
import playerService from '../../utilities/playerService'
import styles from './World1.module.css';

class World1 extends Component {

	state = {
		gameOverDisplay: 'none',
		playerXPos: 0,
		playerYPos: 0,
		playerDirection: 'right',
		swordIsHidden: true,
		isColliding: false,
		backgroundColor: 'white', //this is here for a collision detection test
		playerSword: {
			display: 'none',
			transform: 'rotate(0deg)'
		},
		dataForUpdate: {
			health: this.props.player.health
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
		document.addEventListener('keyup', this.handleKeyUp);
	}

	componentDidUpdate() {
		this.handleMapBoundries();
		this.handleColorChange();//this is here for a collision detection test
		console.log(this.state.dataForUpdate.health);//this is here to test player health
  }

	async componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
		document.removeEventListener('keyup', this.handleKeyUp);
		let newData = await playerService.updatePlayerData(this.state.dataForUpdate, this.props.player.id);
		this.props.updateHomePageState(newData);
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
      case 37://Left
				this.setState({
					playerXPos: this.state.playerXPos - 2,
					playerDirection: 'left'
				});
				this.handleTakingDamage();
      break;
      case 39://Right
				this.setState({
					playerXPos: this.state.playerXPos + 2,
					playerDirection: 'right'
				});
				this.handleTakingDamage();
      break;
      case 38://Up
				this.setState({
					playerYPos: this.state.playerYPos - 2,
					playerDirection: 'up'
				});
				this.handleTakingDamage();
      break;
      case 40://Down
				this.setState({
					playerYPos: this.state.playerYPos + 2,
					playerDirection: 'down'
				});
				this.handleTakingDamage();
			break;
			case 70://Sword attack
				this.setState({
					swordIsHidden: false
				});
				this.handleSwordDisplay();
				this.attackMonster();
			break;
      default:
    }
	}

	handleKeyUp = (e) => {
		switch(e.keyCode) {
			case 70://Sword attack
				this.setState({
					swordIsHidden: true
				});
				this.handleSwordDisplay();
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
				dataForUpdate: {health: this.state.dataForUpdate.health - 1}
			});
		}
		
		if (this.state.dataForUpdate.health <= 0) {
			document.removeEventListener('keydown', this.handleKeyPress);
			this.setState({
				gameOverDisplay: 'block'
			});
		}
	}

	handleSwordDisplay() {
		if (this.state.swordIsHidden) {
			this.setState({
				playerSword: {display: 'none', transform: this.state.playerSword.transform}
			});
		} else {
			this.setState({
				playerSword: {display: 'block', transform: this.state.playerSword.transform}
			});
		}

		switch(this.state.playerDirection) {
      case 'right':
				this.setState({
					playerSword: {display: this.state.playerSword.display, transform: 'rotate(0deg)'}
				});
      break;
      case 'down':
				this.setState({
					playerSword: {display: this.state.playerSword.display, transform: 'rotate(90deg)'}
				});
      break;
      case 'left':
				this.setState({
					playerSword: {display: this.state.playerSword.display, transform: 'rotate(180deg)'}
				});
      break;
      case 'up':
				this.setState({
					playerSword: {display: this.state.playerSword.display, transform: 'rotate(270deg)'}
				});
			break;
      default:
		}
	}

	attackMonster() {
		let tipOfSwordX;
		let tipOfSwordY;
		let playerCenX = this.state.playerXPos + 1;
		let playerCenY = this.state.playerYPos + 1;

		switch(this.state.playerDirection) {
      case 'right':
				tipOfSwordX = playerCenX + 24;
				tipOfSwordY = playerCenY;
				console.log(`edgeX : ${tipOfSwordX} || edgeY: ${tipOfSwordY}`);
      break;
      case 'down':
				tipOfSwordX = playerCenX;
				tipOfSwordY = playerCenY + 24;
				console.log(`edgeX : ${tipOfSwordX} || edgeY: ${tipOfSwordY}`);
      break;
      case 'left':
				tipOfSwordX = playerCenX - 24;
				tipOfSwordY = playerCenY;
				console.log(`edgeX : ${tipOfSwordX} || edgeY: ${tipOfSwordY}`);
      break;
      case 'up':
				tipOfSwordX = playerCenX;
				tipOfSwordY = playerCenY - 24;
				console.log(`edgeX : ${tipOfSwordX} || edgeY: ${tipOfSwordY}`);
			break;
      default:
		}		
	}

	render() {

		let playerCoordinatesAndDamageColor = {
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

					<div className={styles.PlayerBlock} style={playerCoordinatesAndDamageColor}>
						<div className={styles.PlayerSword} style={this.state.playerSword}></div>
					</div>

					<Monster
					playerXPos={this.state.playerXPos}
					playerYPos={this.state.playerYPos}
					color={'rgb(136, 0, 21)'}
					borderColor={'rgb(247, 82, 49)'}
					handleCollisionWithMonster={this.handleCollisionWithMonster}
					isColliding={this.state.isColliding}
					/>

					<Monster
					playerXPos={this.state.playerXPos}
					playerYPos={this.state.playerYPos}
					color={'rgb(136, 0, 21)'}
					borderColor={'rgb(247, 82, 49)'}
					handleCollisionWithMonster={this.handleCollisionWithMonster}
					isColliding={this.state.isColliding}
					/>

					<Monster
					playerXPos={this.state.playerXPos}
					playerYPos={this.state.playerYPos}
					color={'rgb(136, 0, 21)'}
					borderColor={'rgb(247, 82, 49)'}
					handleCollisionWithMonster={this.handleCollisionWithMonster}
					isColliding={this.state.isColliding}
					/>

				</div>

			</div>
		);
	}
}

export default World1;