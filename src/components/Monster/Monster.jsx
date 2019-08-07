import React, { Component } from 'react';
import styles from './Monster.module.css';

class Monster extends Component {

	state = {
		x: '',
		y: '',
		w: 20,
		h: 20,
		isColliding: false
	}

	componentDidMount() {
		this.getInitialPos();
	}

	componentDidUpdate() {
		this.handleMapBoundries();
		this.handleCollisionWithPlayer();
	}

	getInitialPos() {
		this.setState({
			x: this.getRandomEvenNumber(),
			y: this.getRandomEvenNumber()
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

	handleCollisionWithPlayer() {
		let centerX = this.state.x + 1;
		let centerY = this.state.y + 1;

		console.log(`x: ${centerX} || y: ${centerY}`);
	}

	handleMapBoundries() {
		//Handles monster's map boundries on the X axis
		if (this.state.x < 0) {
			this.setState({
				x: this.state.x + 1
			})
		} else if (this.state.x > 96) {
			this.setState({
				x: this.state.x - 1
			})
		}
		///Handles monster's map boundries on the Y axis
    if (this.state.y < 0) {
      this.setState({
        y: this.state.y + 1
      })
    } else if (this.state.y > 96) {
      this.setState({
        y: this.state.y - 1
      })
    }
	}

	render() {

		let monsterPosAndDim = {
			left: `${this.state.x}%`,
			top: `${this.state.y}%`,
			width: `${this.state.w}px`,
			height: `${this.state.h}px`,
			backgroundColor: this.props.color
		}

		return(
			<div className={styles.Monster} style={monsterPosAndDim}></div>
		);
	}
}

export default Monster;