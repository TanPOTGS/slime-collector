import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Monster from '../Monster/Monster';
import styles from './World1.module.css';

class World1 extends Component {

	state = {
		playerXPos: 0,
		playerYPos: 0,
		isColliding: false,
		backgroundColor: 'black', //this is here for a collision detection test
		health: 100
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentDidUpdate() {
		this.handleMapBoundries();
		console.log(this.state.isColliding);//this is here for a collision detection test
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
      break;
      case 39:
      this.setState({
        playerXPos: this.state.playerXPos + 2
      });
      break;
      case 38:
      this.setState({
        playerYPos: this.state.playerYPos - 2
      });
      break;
      case 40:
      this.setState({
				playerYPos: this.state.playerYPos + 2
			});
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
		} else if (!this.state.isColliding && this.state.backgroundColor !== 'black') {
			this.setState({backgroundColor: 'black'});
		}
	}

	render() {

		let playerCoordinates = {
			left: `${this.state.playerXPos}%`,
			top: `${this.state.playerYPos}%`,
			backgroundColor: this.state.backgroundColor //this is here for a collision detection test
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
					color={'blue'}
					handleCollisionWithMonster={this.handleCollisionWithMonster}
					isColliding={this.state.isColliding}
					/>

					<Monster
					playerXPos={this.state.playerXPos}
					playerYPos={this.state.playerYPos}
					color={'yellow'}
					handleCollisionWithMonster={this.handleCollisionWithMonster}
					isColliding={this.state.isColliding}
					/>

				</div>

			</div>
		);
	}
}

export default World1;