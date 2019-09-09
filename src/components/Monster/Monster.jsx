import React, { Component } from 'react';
import styles from './Monster.module.css';

class Monster extends Component {

	state = {
		health: 10,
		monsterXPos: '',
		monsterYPos: '',
		w: 16, //this is in state in case I want to control the size of the monsters
		h: 16, //this is in state in case I want to control the size of the monsters
		isColliding: false,
		isBeingAttacked: false,
		backgroundColor: this.props.backgroundColor,
		borderColor: this.props.borderColor,
		healthBarIsHidden: true,
		healthBarDisplay: 'none',
		lengthOfHealthBar: 16
	}

	componentDidMount() {
		this.getInitialPos();
	}

	componentDidUpdate() {
		this.handleMapBoundries();
		this.handleCollisionWithPlayer();
		this.handlePlayerAttacking();
		this.handleColorChange();
	}

	//refactor the two functions below into one
	getInitialPos() {
		this.setState({
			monsterXPos: this.getRandomEvenNumber(),
			monsterYPos: this.getRandomEvenNumber()
		});
	}

	getRandomEvenNumber() {
		let ranNum = Math.floor((Math.random() * 100) - 2);
		let filterdNum = ranNum % 2;
		if (filterdNum === 0) {
			return ranNum;
		} else {
			return ranNum - 1;
		}
	}

	handleMapBoundries() {
		//Handles monster's map boundries on the X axis
		if (this.state.monsterXPos < 0) {
			this.setState({
				monsterXPos: this.state.monsterXPos + 1
			})
		} else if (this.state.monsterXPos > 96) {
			this.setState({
				monsterXPos: this.state.monsterXPos - 1
			})
		}
		///Handles monster's map boundries on the Y axis
    if (this.state.monsterYPos < 0) {
      this.setState({
        monsterYPos: this.state.monsterYPos + 1
      })
    } else if (this.state.monsterYPos > 96) {
      this.setState({
        monsterYPos: this.state.monsterYPos - 1
      })
    }
	}

	handleCollisionWithPlayer() {
		let monsterCenX = this.state.monsterXPos + 1;
		let monsterCenY = this.state.monsterYPos + 1;
	
		let playerCenX = this.props.playerXPos + 1;
		let playerCenY = this.props.playerYPos + 1;
	
		let xDistance = Math.abs(monsterCenX - playerCenX);
		let yDistance = Math.abs(monsterCenY - playerCenY);
	
		if ((xDistance > 4 || yDistance > 4) && this.state.isColliding !== false) {
			this.setState({isColliding: false});
			this.props.handleCollisionWithMonster(false);
		} else if (xDistance <= 4 && yDistance <= 4 && this.state.isColliding !== true) {
			this.setState({isColliding: true});
			this.props.handleCollisionWithMonster(true);
		} else if (xDistance <= 4 && yDistance <= 4 && this.state.isColliding === true && this.props.isColliding !== true) {
			this.props.handleCollisionWithMonster(true);
		}
	}

	handleColorChange() {
		if (this.state.isBeingAttacked && this.state.borderColor !== 'white') {
			this.setState({borderColor: 'white'});
		} else if (!this.state.isBeingAttacked && this.state.borderColor !== this.props.borderColor) {
			this.setState({borderColor: this.props.borderColor});
		}
	}

	handlePlayerAttacking() {
		if (this.props.tipOfSwordX !== null && this.props.tipOfSwordY !== null) {
			let monsterCenX = this.state.monsterXPos + 1;
			let monsterCenY = this.state.monsterYPos + 1;
			let xDistance = Math.abs(monsterCenX - this.props.tipOfSwordX);
			let yDistance = Math.abs(monsterCenY - this.props.tipOfSwordY);

			if (xDistance <= 2 && yDistance <= 2 && this.state.isBeingAttacked !== true) {
				this.setState({isBeingAttacked: true});
				this.moveMonster();
				this.handleTakingDamage();
			}
		} else if (this.props.tipOfSwordX === null && this.props.tipOfSwordY === null && this.state.isBeingAttacked !== false) {
			this.setState({isBeingAttacked: false});
		}
	}

	moveMonster() {
		let num1 = Math.round(Math.random());
		let num2 = Math.round(Math.random());

		if (num1 === 0 && num2 === 0) {
			this.setState({monsterYPos: this.state.monsterYPos - 2});
			// console.log('Moving Up');
		} else if (num1 === 0 && num2 === 1) {
			this.setState({monsterXPos: this.state.monsterXPos + 2});
			// console.log('Moving Right');
		} else if (num1 === 1 && num2 === 1) {
			this.setState({monsterYPos: this.state.monsterYPos + 2});
			// console.log('Moving Down');
		} else if (num1 === 1 && num2 === 0) {
			this.setState({monsterXPos: this.state.monsterXPos - 2});
			// console.log('Moving Left');
		}
	}

	handleTakingDamage() {
		this.setState({health: this.state.health - 1});

		if (this.state.healthBarIsHidden) {
			this.setState({healthBarIsHidden: false, healthBarDisplay: 'block'});
		}
		
		switch(this.state.health) {
      case 9:
				this.setState({
					lengthOfHealthBar: 14.4
				});
      break;
      case 8:
				this.setState({
					lengthOfHealthBar: 12.8
				});
      break;
      case 7:
				this.setState({
					lengthOfHealthBar: 11.2
				});
			break;
			case 6:
				this.setState({
					lengthOfHealthBar: 9.6
				});
			break;
			case 5:
				this.setState({
					lengthOfHealthBar: 8
				});
			break;
			case 4:
				this.setState({
					
					lengthOfHealthBar: 6.4
				});
			break;
			case 3:
				this.setState({
					lengthOfHealthBar: 4.8
				});
			break;
			case 2:
				this.setState({
					lengthOfHealthBar: 3.6
				});
			break;
			case 1:
				this.setState({
					lengthOfHealthBar: 1.6
				});
			break;
			case 0:
				this.setState({
					lengthOfHealthBar: 0
				});
				this.props.removeMonsterFromArray(this.props.id);
			break;
      default:
		}
	}

	render() {

		let monsterPosAndDim = {
			left: `${this.state.monsterXPos}%`,
			top: `${this.state.monsterYPos}%`,
			width: `${this.state.w}px`,
			height: `${this.state.h}px`,
			backgroundColor: this.state.backgroundColor,
			borderColor: this.state.borderColor
		}
		let healthBar = {
			display: this.state.healthBarDisplay,
			width: `${this.state.lengthOfHealthBar}px`
		}

		return(
			<div className={styles.Monster} style={monsterPosAndDim}>
				<div className={styles.HealthBar} style={healthBar}></div>
			</div>
		);
	}
}

export default Monster;