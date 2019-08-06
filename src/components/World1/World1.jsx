import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './World1.module.css';

class World1 extends Component {

	state ={
		playerX: 0,
		playerY: 0,
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
				</div>
			</div>
		);
	}
}

export default World1;