import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import HowtoPage from '../../pages/HowtoPage/HowtoPage';
import HarvestPage from '../../pages/HarvestPage/HarvestPage'
import TraderPage from '../../pages/TraderPage/TraderPage';
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
			<Route exact path='/harvest' render={() => (playerService.getPlayer() ? <HarvestPage {...props}/> : <Redirect to='/login' />)} />
			<Route exact path='/harvest/world1' render={() => (playerService.getPlayer() ? <World1 {...props}/> : <Redirect to='/login' />)} />
			<Route exact path='/harvest/world2' render={() => (playerService.getPlayer() ? <World2 {...props}/> : <Redirect to='/login' />)} />
			<Route exact path='/harvest/world3' render={() => (playerService.getPlayer() ? <World3 {...props}/> : <Redirect to='/login' />)} />
			<Route exact path='/trader' render={() => (playerService.getPlayer() ? <TraderPage /> : <Redirect to='/login' />)} />
    </Switch>
  </div>
)

export default MainWindow;