import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Monster from '../Monster/Monster';
import playerService from '../../utilities/playerService';
import ComponentMapper from '../../utilities/ComponentMapper';
import styles from './World1.module.css';

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
		stageClearedDisplay: 'none',
		monstersArray: [
			{id: 0},
			{id: 1},
			{id: 2},
			{id: 3}
		],
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
				this.handleTakingDamage();
      break;
      case 39://Right
				this.handlePlayerMovment('right');
				this.handleTakingDamage();
      break;
      case 38://Up
				this.handlePlayerMovment('up');
				this.handleTakingDamage();
      break;
      case 40://Down
				this.handlePlayerMovment('down');
				this.handleTakingDamage();
			break;
			case 70://Sword attack
				this.setState({
					swordIsHidden: false
				});
				this.handleSwordDisplay();
				this.handleSwordAttack();
				this.handleTakingDamage();
			break;
      default:
    }
	}

	removeMonsterFromArray = (id) => {
		let newMonstersArray = this.state.monstersArray;
		let newIndex = newMonstersArray.findIndex(obj => obj.id === id)
		newMonstersArray.splice(newIndex, 1);
		this.setState({monstersArray: newMonstersArray});
		if (this.state.monstersArray.length <= 0) {
			this.handleStageClear();
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
	}

	handleColorChange() {
		if (this.state.isColliding && this.state.backgroundColor !== 'red') {
			this.setState({backgroundColor: 'red'});
		} else if (!this.state.isColliding && this.state.backgroundColor !== 'white') {
			this.setState({backgroundColor: 'white'});
		}
	}

	handleTakingDamage() {
		if (this.state.isColliding) {
			this.setState({
				dataForUpdate: {health: this.state.dataForUpdate.health - 1}
			});
		}
		
		if (this.state.dataForUpdate.health <= 0) {
			this.handleGameOver();
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

		this.handleSwordDirection();
	}

	handleSwordDirection() {
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

	handleGameOver() {
		document.removeEventListener('keydown', this.handleKeyPress);
		document.removeEventListener('keyup', this.handleKeyUp);
		if (this.state.gameOverDisplay !== 'block') {
			this.setState({
				gameOverDisplay: 'block'
			});
		}
	}

	handleStageClear() {
		document.removeEventListener('keydown', this.handleKeyPress);
		document.removeEventListener('keyup', this.handleKeyUp);
		if (this.state.stageClearedDisplay !== 'block') {
			this.setState({
				stageClearedDisplay: 'block'
			});
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

		let stageClearedDisplay = {
			display: this.state.stageClearedDisplay
		}

		return (
			<div className={styles.OuterContainer}>

				<NavLink 
				exact 
				to='/harvest' 
				className={styles.BackToHarvestPage} 
				>
					<span className={styles.Close}>&times;</span>
				</NavLink>

				<div className={styles.InnerContainer}>

					<div className={styles.World1}>

						<div className={styles.GameOver} style={gameOverDisplay}>YOU'VE BECOME TOO FATIGUED</div>
						<div className={styles.StageCleared} style={stageClearedDisplay}>ALL AVAILABLE SLIME HAS BEEN HARVESTED!</div>

						<div className={styles.PlayerBlock} style={playerCoordinatesAndDamageColor}>
							<div className={styles.PlayerSword} style={swordConfig}></div>
						</div>

						<ComponentMapper 
						array={this.state.monstersArray} 
						component={Monster}
						playerXPos={this.state.playerXPos}
						playerYPos={this.state.playerYPos}
						backgroundColor={'rgb(136, 0, 21)'}
						borderColor={'rgb(247, 82, 49)'}
						handleCollisionWithMonster={this.handleCollisionWithMonster}
						removeMonsterFromArray={this.removeMonsterFromArray}
						isColliding={this.state.isColliding}
						tipOfSwordX={this.state.tipOfSwordX}
						tipOfSwordY={this.state.tipOfSwordY}
						swordIsHidden={this.state.swordIsHidden}
						/>
					</div>

					<div className={styles.HealthBoard}>
						<span>--Health--</span>
						<span className={styles.PlayerHealth}>Player:{this.state.dataForUpdate.health}</span>
					</div>

				</div>

			</div>
		);
	}
}

export default World1;