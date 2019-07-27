import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import HowtoPage from '../../pages/HowtoPage/HowtoPage';
import styles from './MainWindow.module.css';

const MainWindow = (props) => (
  <div className={styles.MainWindow}>
    <Switch>
      <Route exact path='/login' render={({ history }) => <LoginPage history={history} {...props}/>} />
      <Route exact path='/signup' render={({ history }) => <SignupPage history={history} {...props}/>} />
			<Route exact path='/howto' render={() => <HowtoPage />} />
    </Switch>
  </div>
)

export default MainWindow;