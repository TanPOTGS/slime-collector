import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './World2.module.css';

const World2 = () => (
	<div className={styles.World2Container}>
		<NavLink 
		exact 
		to='/harvest' 
		className={styles.BackToHarvestPage} 
		>
			<span className={styles.Close}>&times;</span>
		</NavLink>
		<div className={styles.World2}>
			<h1>World 2</h1>
		</div>
	</div>
)

export default World2;