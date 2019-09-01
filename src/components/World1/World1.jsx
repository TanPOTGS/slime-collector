import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Monster from '../Monster/Monster';
import playerService from '../../utilities/playerService';
import ComponentMapper from '../../utilities/ComponentMapper';
import styles from './World1.module.css';

let monstersArray = [
	{id: 0, name: 'Monster 1'},
	{id: 1, name: 'Monster 2'},
	{id: 2, name: 'Monster 3'}
];

class World1 extends Component {

	state = {
		playerXPos: 0,
		playerYPos: 0,
		playerDirection: 'right',
		isColliding: false,
		hasTakenDamage: false,
		backgroundColor: 'white',
		swordIsHidden: true,
		swordDisplay: 'none',
		swordDirection: 'rotate(0deg)',
		tipOfSwordX: null,
		tipOfSwordY: null,
		gameOverDisplay: 'none',
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
		this.handleColorChange();
		this.handleTakingDamage();
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
				this.handlePlayerMovment('left');
      break;
      case 39://Right
				this.handlePlayerMovment('right');
      break;
      case 38://Up
				this.handlePlayerMovment('up');
      break;
      case 40://Down
				this.handlePlayerMovment('down');
			break;
			case 70://Sword attack
				this.setState({
					swordIsHidden: false
				});
				this.handleSwordDisplay();
				this.handleSwordAttack();
			break;
      default:
    }
	}

	handlePlayerMovment(direction) {
		switch(direction) {
      case 'left':
				this.setState({
					playerXPos: this.state.playerXPos - 2,
					playerDirection: 'left'
				});
      break;
      case 'right':
				this.setState({
					playerXPos: this.state.playerXPos + 2,
					playerDirection: 'right'
				});
      break;
      case 'up':
				this.setState({
					playerYPos: this.state.playerYPos - 2,
					playerDirection: 'up'
				});
      break;
      case 'down':
				this.setState({
					playerYPos: this.state.playerYPos + 2,
					playerDirection: 'down'
				});
			break;
      default:
		}
	}

	handleKeyUp = (e) => {
		switch(e.keyCode) {
			case 70://Sword attack
				this.setState({
					swordIsHidden: true,
					tipOfSwordX: null,
					tipOfSwordY: null
				});
				this.handleSwordDisplay();
			break;
			default:
		}
	}

	handleCollisionWithMonster = (colliding) => {
		this.setState({isColliding: colliding});

		if (colliding === false && this.state.hasTakenDamage === true) {
			this.setState({hasTakenDamage: false});
		}
	}

	handleColorChange() {
		if (this.state.isColliding && this.state.backgroundColor !== 'red') {
			this.setState({backgroundColor: 'red'});
		} else if (!this.state.isColliding && this.state.backgroundColor !== 'white') {
			this.setState({backgroundColor: 'white'});
		}
	}

	handleTakingDamage() {
		if (this.state.isColliding === true && this.state.hasTakenDamage === false) {
			this.setState({
				dataForUpdate: {health: this.state.dataForUpdate.health - 1},
				hasTakenDamage: true
			});
		}
		
		if (this.state.dataForUpdate.health <= 0 && this.state.gameOverDisplay !== 'block') {
			document.removeEventListener('keydown', this.handleKeyPress);
			document.removeEventListener('keyup', this.handleKeyUp);
			this.setState({
				gameOverDisplay: 'block'
			});
		}
	}

	handleSwordDisplay() {
		if (this.state.swordIsHidden) {
			this.setState({
				swordDisplay: 'none'
			});
		} else {
			this.setState({
				swordDisplay: 'block'
			});
		}

		switch(this.state.playerDirection) {
      case 'right':
				this.setState({
					swordDirection: 'rotate(0deg)'
				});
      break;
      case 'down':
				this.setState({
					swordDirection: 'rotate(90deg)'
				});
      break;
      case 'left':
				this.setState({
					swordDirection: 'rotate(180deg)'
				});
      break;
      case 'up':
				this.setState({
					swordDirection: 'rotate(270deg)'
				});
			break;
      default:
		}
	}

	handleSwordAttack() {
		let tipOfSwordX = null;
		let tipOfSwordY = null;
		let playerCenX = this.state.playerXPos + 1;
		let playerCenY = this.state.playerYPos + 1;

		switch(this.state.playerDirection) {
      case 'right':
				tipOfSwordX = playerCenX + 5;
				tipOfSwordY = playerCenY;
				this.setState({tipOfSwordX: tipOfSwordX, tipOfSwordY: tipOfSwordY});
      break;
      case 'down':
				tipOfSwordX = playerCenX;
				tipOfSwordY = playerCenY + 5;
				this.setState({tipOfSwordX: tipOfSwordX, tipOfSwordY: tipOfSwordY})
      break;
      case 'left':
				tipOfSwordX = playerCenX - 5;
				tipOfSwordY = playerCenY;
				this.setState({tipOfSwordX: tipOfSwordX, tipOfSwordY: tipOfSwordY})
      break;
      case 'up':
				tipOfSwordX = playerCenX;
				tipOfSwordY = playerCenY - 5;
				this.setState({tipOfSwordX: tipOfSwordX, tipOfSwordY: tipOfSwordY})
			break;
      default:
		}		
	}

	render() {

		let playerCoordinatesAndDamageColor = {
			left: `${this.state.playerXPos}%`,
			top: `${this.state.playerYPos}%`,
			backgroundColor: this.state.backgroundColor
		}

		let swordConfig = {
			display: this.state.swordDisplay,
			transform: this.state.swordDirection
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
						<div className={styles.PlayerSword} style={swordConfig}></div>
					</div>

					<ComponentMapper 
					array={monstersArray} 
					component={Monster}
					playerXPos={this.state.playerXPos}
					playerYPos={this.state.playerYPos}
					backgroundColor={'rgb(136, 0, 21)'}
					borderColor={'rgb(247, 82, 49)'}
					handleCollisionWithMonster={this.handleCollisionWithMonster}
					isColliding={this.state.isColliding}
					tipOfSwordX={this.state.tipOfSwordX}
					tipOfSwordY={this.state.tipOfSwordY}
					swordIsHidden={this.state.swordIsHidden}
					/>
				</div>

			</div>
		);
	}
}

export default World1;