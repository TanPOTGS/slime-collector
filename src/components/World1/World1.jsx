import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './World1.module.css';

class World1 extends Component {

	state ={
		playerX: 0,
		playerY: 0,
		monster1: {name: 'Red Slime', x: '', y: '', w: 40, h: 40},
		monster2: {name: 'Red Slime', x: '', y: '', w: 40, h: 40},
		monster3: {name: 'Red Slime', x: '', y: '', w: 40, h: 40}
	}

	componentDidMount() {
		this.getRandomPos();
		this.handleMapBoundries();
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentDidUpdate() {
		this.handleMapBoundries();
		//this.handleSlimeMovement();
  }

	componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
	}

	handleSlimeMovement() {

	}

	getRandomPos() {
		let ranNum1 = Math.floor((Math.random() * 100) - 2);
		let ranNum2 = Math.floor((Math.random() * 100) - 2);
		let ranNum3 = Math.floor((Math.random() * 100) - 2);
		let ranNum4 = Math.floor((Math.random() * 100) - 2);
		this.setState({
			monster1: {x: ranNum1, y: ranNum3},
			monster2: {x: ranNum2, y: ranNum4},
			monster3: {x: ranNum3, y: ranNum2}
		});
	}
	
	handleMapBoundries() {
    if (this.state.playerY < 0) {
      this.setState({
        playerY: this.state.playerY + 1
      })
    } else if (this.state.playerY > 96) {
      this.setState({
        playerY: this.state.playerY - 1
      })
    }

    if (this.state.playerX < 0) {
      this.setState({
        playerX: this.state.playerX + 1
      })
    } else if (this.state.playerX > 96) {
      this.setState({
        playerX: this.state.playerX - 1
      })
		}
		/**************************************/
		if (this.state.monster1.y < 0) {
      this.setState({
        monster1: {y: this.state.monster1.y + 1}
      })
    } else if (this.state.monster1.y > 92) {
      this.setState({
        monster1: {y: this.state.monster1.y - 1}
      })
    }

		if (this.state.monster1.x < 0) {
      this.setState({
        monster1: {x: this.state.monster1.x + 1}
      })
    } else if (this.state.monster1.x > 92) {
      this.setState({
        monster1: {x: this.state.monster1.x - 1}
      })
    }
		/**************************************/
		if (this.state.monster2.y < 0) {
      this.setState({
        monster2: {y: this.state.monster2.y + 1}
      })
    } else if (this.state.monster2.y > 92) {
      this.setState({
        monster2: {y: this.state.monster2.y - 1}
      })
    }

		if (this.state.monster2.x < 0) {
      this.setState({
        monster2: {x: this.state.monster2.x + 1}
      })
    } else if (this.state.monster2.x > 92) {
      this.setState({
        monster2: {x: this.state.monster2.x - 1}
      })
    }
		/**************************************/
		if (this.state.monster3.y < 0) {
      this.setState({
        monster3: {y: this.state.monster3.y + 1}
      })
    } else if (this.state.monster3.y > 92) {
      this.setState({
        monster3: {y: this.state.monster3.y - 1}
      })
    }

		if (this.state.monster3.x < 0) {
      this.setState({
        monster3: {x: this.state.monster3.x + 1}
      })
    } else if (this.state.monster3.x > 92) {
      this.setState({
        monster3: {x: this.state.monster3.x - 1}
      })
    }
  }

	handleKeyPress = (e) => {
    switch(e.keyCode) {
      case 37:
      this.setState({
        playerX: this.state.playerX - 2
      });
      break;
      case 39:
      this.setState({
        playerX: this.state.playerX + 2
      });
      break;
      case 38:
      this.setState({
        playerY: this.state.playerY - 2
      });
      break;
      case 40:
      this.setState({
				playerY: this.state.playerY + 2
			});
      break;
      default:
    }
	}

	render() {

		let playerPos = {
			left: `${this.state.playerX}%`,
			top: `${this.state.playerY}%`,
		}

		let monster1Pos = {
			left: `${this.state.monster1.x}%`,
			top: `${this.state.monster1.y}%`,
		}

		let monster2Pos = {
			left: `${this.state.monster2.x}%`,
			top: `${this.state.monster2.y}%`,
		}

		let monster3Pos = {
			left: `${this.state.monster3.x}%`,
			top: `${this.state.monster3.y}%`,
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
					<div className={styles.PlayerBlock} style={playerPos}></div>
					<div className={styles.Monster1} style={monster1Pos}></div>
					<div className={styles.Monster2} style={monster2Pos}></div>
					<div className={styles.Monster3} style={monster3Pos}></div>
				</div>

			</div>
		);
	}
}

export default World1;