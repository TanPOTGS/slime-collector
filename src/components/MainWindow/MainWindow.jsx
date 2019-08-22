import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import HowtoPage from '../../pages/HowtoPage/HowtoPage';
import HarvestPage from '../../pages/HarvestPage/HarvestPage'
import TraderPage from '../../pages/TraderPage/TraderPage';
import CollectionPage from '../../pages/CollectionPage/CollectionPage';
import InventoryPage from '../../pages/InventoryPage/InventoryPage';
import FusePage from '../../pages/FusePage/FusePage';
import World1 from '../World1/World1';
import World2 from '../World2/World2';
import World3 from '../World3/World3';
import styles from './MainWindow.module.css';
import playerService from '../../utilities/playerService';

const MainWindow = (props) => (
  <div className={styles.MainWindow}>
    <Switch>
      <Route exact path='/login' render={({ history }) => <LoginPage history={history} {...props}/>} />
      <Route exact path='/signup' render={({ history }) => <SignupPage history={history} {...props}/>} />
			<Route exact path='/howto' render={() => <HowtoPage />} />
			<Route exact path='/harvest' render={() => (playerService.getPlayer() ? <HarvestPage /> : <Redirect to='/login' />)} />
			<Route exact path='/harvest/world1' render={() => (playerService.getPlayer() ? <World1 {...props}/> : <Redirect to='/login' />)} />
			<Route exact path='/harvest/world2' render={() => (playerService.getPlayer() ? <World2 {...props}/> : <Redirect to='/login' />)} />
			<Route exact path='/harvest/world3' render={() => (playerService.getPlayer() ? <World3 {...props}/> : <Redirect to='/login' />)} />
			<Route exact path='/trader' render={() => (playerService.getPlayer() ? <TraderPage /> : <Redirect to='/login' />)} />
			<Route exact path='/collection' render={() => (playerService.getPlayer() ? <CollectionPage /> : <Redirect to='/login' />)} />
			<Route exact path='/inventory' render={() => (playerService.getPlayer() ? <InventoryPage /> : <Redirect to='/login' />)} />
			<Route exact path='/fuse' render={() => (playerService.getPlayer() ? <FusePage /> : <Redirect to='/login' />)} />
    </Switch>
  </div>
)

export default MainWindow;