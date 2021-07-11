import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import RadioTypeProduct from '../components/RadioTypeProduct.Coponent';
import AddressSelect from '../components/AddressSelect.Component';
import ListCategory from './ListCategory.Component';

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
    margin: theme.spacing(3),
  },
  centerContent: {
    display: "flex",
    justifyContent: "center"
  },
  miniInput: {
      width: 150,
      margin: theme.spacing(1)
  }
}));

export default function AddProductForm(props) {
  const classes = useStyles();
  const { open } = props;

  const [data, setData] = useState({
    title: "",
    lease: true,
    price: -1,
    descreption: "",
    phoneNumber: "",
    address: {
            provinceCity: {
                id: -1,
                name: ""
            },
            district: {
                id: -1,
                name: ""
            },
            ward:{
                id: -1,
                name: ""
            },
            street: {
                id: -1,
                name: ""
            }
        },
    category:{
        id: -1,
        name: ""
    },
    images: [],
    user: {id: -1},
    frontispiece: -1,
    numberOfFloors: -1,
    numberOfWC: -1,
    funiture: "",
    legalInfor: ""
})
  

const validData = () => {

}
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add product
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="ptitle"
                name="Title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="pDescreption"
                name="Descreption"
                variant="outlined"
                required
                fullWidth
                id="descreption"
                label="Descreption"
                multiline
                rows={5}
                rowsMax={15}
                autoFocus
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Phone numbers"
                name="phoneNumbers"
                autoComplete="phoneNumber"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <RadioTypeProduct />
            </Grid>
            <Grid item xs={12} sm={12}>
              <AddressSelect />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ListCategory />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.miniInput}
                variant="outlined"
                required
                type="number"
                id="numfloors"
                label="Number of floors"
                autoComplete="numberoffloors"
              />
              <TextField
                className={classes.miniInput}
                variant="outlined"
                required
                label="Number of WC"
                type="number"
                id="numofWC"
                autoComplete="numWC"
              />
              <TextField
                className={classes.miniInput}
                variant="outlined"
                required
                label="Frontispiece"
                type="number"
                id="frontispiece"
                autoComplete="frontispiece"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="funiture"
                variant="outlined"
                required
                fullWidth
                id="funiture"
                label="Funiture"
                multiline
                rows={3}
                rowsMax={7}
                autoFocus
              />

            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="legalInfor"
                variant="outlined"
                required
                fullWidth
                id="legalInfor"
                label="Legal information"
                multiline
                rows={5}
                rowsMax={10}
                autoFocus
              />

            </Grid>
          </Grid>

          <Grid sm={12} className={classes.centerContent}>
            <Button
              
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add product
            </Button>
            <Button
              onClick={open}
              variant="contained"
              className={classes.submit}
            >
              Back
            </Button>
          </Grid>
          
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}