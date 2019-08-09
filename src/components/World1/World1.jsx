import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Monster from '../Monster/Monster';
import styles from './World1.module.css';

class World1 extends Component {

	state ={
		playerXPos: 0,
		playerYPos: 0
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentDidUpdate() {
		this.handleMapBoundries();
  }

	componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
	}
	
	handleMapBoundries() {
		//Handles player's map boundries on the X axis
		if (this.state.playerXPos < 0) {
			this.setState({
				playerXPos: this.state.playerXPos + 1
			})
		} else if (this.state.playerXPos > 96) {
			this.setState({
				playerXPos: this.state.playerXPos - 1
			})
		}
		//Handles player's map boundries on the Y axis
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

	render() {

		let playerCoordinates = {
			left: `${this.state.playerXPos}%`,
			top: `${this.state.playerYPos}%`,
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
					<Monster playerXPos={this.state.playerXPos} playerYPos={this.state.playerYPos} color={'red'}/>
					<Monster playerXPos={this.state.playerXPos} playerYPos={this.state.playerYPos} color={'blue'}/>
					<Monster playerXPos={this.state.playerXPos} playerYPos={this.state.playerYPos} color={'yellow'}/>
				</div>

			</div>
		);
	}
}

export default World1;