import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HowtoPage.module.css';

const HowtoPage = () => (
	<div className={styles.HowtoPage}>
		<NavLink exact to='/'>
			<span>&times;</span>
		</NavLink>
		<h1>THE BASIC RULES OF THE GAME:</h1>
		<p>
		The object of the game is to collect all the slimes and complete your slime book! To obtain slimes one must hunt for them. By hunting slimes you will be able to obtain three different types of slimes. To complete your slime book you must fuse slimes together and discover new slimes outside of the three types you encounter in the wild. You must be careful when hunting for slimes. Naturally, they will fight back when you are trying to harvest their slime. If you lose some health you can visit the slime trader and exchange some slimes for health potion to heal yourself. If you lose all your health, you will not be able to hunt for any slimes. You will be required to heal yourself before adventuring out to hunt more slimes. Every adventurer will start off with one of each of the three types of slimes you will be able to hunt. When you start your adventure it will be your choice as to what you do with those first three slimes. You can either add them to your book, attempt to fuse them in order to discover a new type of slime, or trade them in for health potion! The game is finished when you collect all the slimes! If you happen to lose all your health while hunting for slimes, AND you don't have and slimes in your inventory, you will be forced to return your hunting license and that will be GAME OVER. If you get a game over, all of your progress will be erased and you will have to start over!
		</p>
	</div>
)

export default HowtoPage;