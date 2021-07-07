import {React, useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { signIn } from "../slices/user"
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { AxiosClient } from '../apis/AxiosClient';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/vntgithub">
        vntgithub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [rememberme, setRememberme] = useState(true);
  const [err, setErr] = useState(false);
  const [errString, setErrString] = useState("");
  const errMessage = {
    emptyData: "Please type username and password!",
    accountNotFound: "Username or password was wrong!"
  }


  
  async function submit() {
    const loginData = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }
    if(loginData.username === '' || loginData.password === ''){
      setErr(true);
      setErrString(errMessage.emptyData)
      return;
    }
    const resultAction = await dispatch(signIn(loginData))
    console.log(resultAction);
    if(!resultAction.payload){
      setErrString(errMessage.accountNotFound);
      setErr(true);
      return;
    }
    const data = unwrapResult(resultAction);
    history.push("/");
    
    
  }
  function checkRememberme() {
    setRememberme(!rememberme)
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox 
              onChange={checkRememberme} 
              checked={rememberme} 
              value="remember" 
              color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={submit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      { err &&<Box mt={5}>
        <Alert severity="error">{errString}</Alert>
      </Box>}
      
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}