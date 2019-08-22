import React from 'react';
import playerService from '../../utilities/playerService';
import styles from './TraderPage.module.css';

const TraderPage = () => {
	const id = '5d5208d317f38e0a341bb51f';
	const info = {
		health: 10
	}

	function handleOnClick() {
		playerService.updatePlayerData(info, id);
	}

	return(
		<div className={styles.TraderPage}>
			<span onClick={handleOnClick} className={styles.AddHealth}>Add Health</span>
		</div>
	);
}

export default TraderPage;