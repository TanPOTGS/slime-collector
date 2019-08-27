import React, { Component } from 'react';
import styles from './Monster.module.css';

class Monster extends Component {

	state = {
		monsterXPos: '',
		monsterYPos: '',
		w: 16,
		h: 16,
		isColliding: false,
		backgroundColor: this.props.color, //this is here for a collision detection test
		borderColor: this.props.borderColor
	}

	componentDidMount() {
		this.getInitialPos();
	}

	componentDidUpdate() {
		this.handleMapBoundries();
		this.handleCollisionWithPlayer();
		this.handleColorChange(); //this is here for a collision detection test
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

	//this is here for a collision detection test
	handleColorChange() {
		if (this.state.isColliding && this.state.backgroundColor !== 'green') {
			this.setState({backgroundColor: 'green'});
		} else if (!this.state.isColliding && this.state.backgroundColor !== this.props.color) {
			this.setState({backgroundColor: this.props.color});
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

		return(
			<div className={styles.Monster} style={monsterPosAndDim}></div>
		);
	}
}

export default Monster;