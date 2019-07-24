import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import styles from './MainWindow.module.css';

const MainWindow = () => (
  <div className={styles.MainWindow}>
    <Switch>
      <Route exact path='/login' render={() => <LoginPage />} />
      <Route exact path='/signup' render={({ history }) => <SignupPage history={history} />} />
    </Switch>
  </div>
)

export default MainWindow;