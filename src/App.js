import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import './App.css';

const useStyles = makeStyles({
  home_btn: {
    height: 40,
    marginRight: '20px'
  },
});


function App() {
  const classes = useStyles();
  const history = useHistory();

  function onRegister() {
    history.push({
      pathname: '/register'
    });
  }

  function onLogin() {
    history.push({
      pathname: '/login'
    });
  }

  return (
    <div className="home-div">
      <Button onClick={onRegister} className={classes.home_btn} variant="outlined" color="secondary">Register</Button>
      <Button onClick={onLogin} className={classes.home_btn} variant="contained" color="primary">Login</Button>
    </div>
  );
}

export default App;
