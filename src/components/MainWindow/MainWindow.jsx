import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import HowtoPage from '../../pages/HowtoPage/HowtoPage';
import HarvestPage from '../../pages/HarvestPage/HarvestPage'
import TraderPage from '../../pages/TraderPage/TraderPage';
import World1 from '../World1/World1';
import World2 from '../World2/World2';
import World3 from '../World3/World3';
import styles from './MainWindow.module.css';

const MainWindow = (props) => (
  <div className={styles.MainWindow}>
    <Switch>
      <Route exact path='/login' render={({ history }) => <LoginPage history={history} {...props}/>} />
      <Route exact path='/signup' render={({ history }) => <SignupPage history={history} {...props}/>} />
			<Route exact path='/howto' render={() => <HowtoPage />} />
			<Route exact path='/harvest' render={() => <HarvestPage {...props}/>} />
			<Route exact path='/harvest/world1' render={() => <World1 {...props}/>} />
			<Route exact path='/harvest/world2' render={() => <World2 {...props}/>} />
			<Route exact path='/harvest/world3' render={() => <World3 {...props}/>} />
			<Route exact path='/trader' render={() => <TraderPage />} />
    </Switch>
  </div>
)

export default MainWindow;