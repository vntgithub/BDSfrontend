import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ImageUpload from '../components/ImageUpload.Component'
import  MaterialUIPickers  from '../components/MaterialUIPickers.Component';
import RadioGroupGender from '../components/RadioGroupGender.Component';
import AddressSelect from '../components/AddressSelect.Component';
import axios from 'axios'
import userApi from '../apis/user.api'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  centerContent: {
    display: "flex",
    justifyContent: "center"
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  margin: {
    marginBottom: theme.spacing(1),
    width: 100
  }
}));

export default function SignUpPage() {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [done, setDone] = useState(false)
  const enumErrString = [
    'Some fields are empty',
    'Password do not match'
  ]
  const [errString, setErrString] = useState(enumErrString[0])
  const [urlImage, setUrlImage] = useState("#");
  const [address, setAddress] = useState({})
  const [gender, setGender] = useState(true)
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01")
  const enumRole = [
    {id: 2, name: 'ROLE_STAFF'},
    {id: 3, name: 'ROLE_CUSTOMER'}
  ]
  const [err, setErr] = useState(false)
  const [role, setRole] = useState(enumRole[0])

  const getImage = (e) => {
    const [file] = e.target.files
    if(file){
      setImage(file)
      setUrlImage(URL.createObjectURL(file))
    }
  }
  const getRole = (e) => {
    let roleId = e.target.value;
    if(roleId == 2){
      setRole(enumRole[0])
    }else{
      setRole(enumRole[1])
    }
      
  }
  const submit = async () => {
    let check = true
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const password2 = document.getElementById('password2').value
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phoneNumber = document.getElementById('phoneNumber').value
    if(username === '' || username === null){
      check &= false
      setErr(true)
    }
    if(password === '' || password === null){
      check &= false
      setErr(true)
    }
    if(password2 === '' || password2 === null){
      check &= false
      setErr(true)
    }
    if(password !== password2){
      check &= false
      setErr(true)
      setErrString(enumErrString[1])
    }
    if(name === '' || name === null){
      check &= false
      setErr(true)
    }
    
    if(email === '' || email === null){
      check &= false
      setErr(true)
    }
    if(phoneNumber === '' || phoneNumber === null){
      check &= false
      setErr(true)
    }
    if(image === null){
      check &= false
      setErr(true)
    }
    if(check){
      const imageData  = new FormData();
      imageData.append('file', image);
      imageData.append('upload_preset', 'user-bds');
      const res = await axios.post("https://api.cloudinary.com/v1_1/vntrieu/image/upload", imageData)
      
      let formData = {
        username, password,
        role, 
        user: {
          name, dateOfBirth, gender, address,
          avt: res.data.secure_url,
          contact: {
            email, phoneNumber
          }
        } 
      }
      userApi.signUp(formData)
      setDone(true)
    }

  }
  

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                autoComplete="current-username"
              />
            </Grid>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Retype password"
                type="password"
                id="password2"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel className={classes.margin} id="label">Role</InputLabel>
              <Select
              onChange={getRole} 
              className={classes.margin} 
              labelId="label" 
              id="select" 
              value={role.id}>
                <MenuItem value="2">Staff</MenuItem>
                <MenuItem value="3">Customer</MenuItem>
              </Select>
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />

            </Grid>
            <Grid item xs={12} sm={12}>
              <MaterialUIPickers setDateOfBirth={setDateOfBirth} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <RadioGroupGender setGender={setGender} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <AddressSelect address={address} setAddress={setAddress} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone numbers"
                name="phoneNumbers"
                autoComplete="phoneNumber"
              />
            </Grid>
            <ImageUpload getImage={getImage} />
            {image !== null &&
            <Grid className={classes.centerContent} item xs={12}>
              <Avatar className={classes.large} alt="imguser" src={urlImage} />
            </Grid>}

            
          </Grid>
          <Grid item sm={12} className={classes.centerContent}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submit}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      { err &&<Box mt={5}>
        <Alert severity="error">{errString}</Alert>
      </Box>}
      {done &&
          <Grid item xs={12} sm={12}>
          <Alert severity="success">Sign up successful</Alert>
          </Grid>}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}