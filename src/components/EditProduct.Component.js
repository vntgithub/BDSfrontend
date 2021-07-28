import React, { useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import ImageButton from "../components/ImageUpload.Component"
import Alert from '@material-ui/lab/Alert';
import productApi from '../apis/product.api';

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
  },
  numImage: {
    margin: theme.spacing(1),
    fontWeight: 'bold',
    color: '',
    fontSize: '1.3rem'
  }
}));

export default function EditProductForm(props) {
  const userId = useSelector(state => state.user.data.id)
  const { products, setProducts, p, index, close } = props
  const classes = useStyles();
  const [files, setFiles] = useState([])
  const [err, setErr] = useState(false)
  const [done, setDone] = useState(false)
  const [nImage, setNImage] = useState(0)
  const [data, setData] = useState({...p, user: {id: userId}})
  const [checkChangeImage, setCheckChangeImage] = useState(false)
  

  
  const add = async () => {
    let check = true;
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const descreption = document.getElementById('descreption').value
    const phoneNumbers = document.getElementById('phoneNumbers').value
    const numberOfFloors = document.getElementById('numfloors').value
    const numberOfWC = document.getElementById('numWC').value
    const frontispiece = document.getElementById('frontispiece').value
    const funiture = document.getElementById('funiture').value
    const legalInfor = document.getElementById('legalInfor').value

    if(title === '' || title === null)
      check &= false;

    if(price === '' || price === null)
      check &= false;

    if(descreption === '' || descreption === null)
      check &= false;
    
    if(phoneNumbers === '' || phoneNumbers === null)
      check &= false;

    if(numberOfFloors === '' || numberOfFloors === null)
      check &= false;

    if(numberOfWC === '' || numberOfWC === null)
      check &= false;

    if(frontispiece === '' || frontispiece === null)
      check &= false;

    if(funiture === '' || funiture === null)
      check &= false;

    if(legalInfor === '' || legalInfor === null)
      check &= false;

    if(data.address.street.id === -1)
      check &= false;

    if(data.category === -1)
      check &= false;
;
    if(files.length === 0 && data.images.lenght === 0)
      check &= false
    
    
    
    if(check){
      setErr(false)
      let np = {...data, 
        title: title,
        price: price,
        descreption: descreption,
        phoneNumber: phoneNumbers,
        frontispiece: frontispiece,
        numberOfFloors: numberOfFloors,
        numberOfWC: numberOfWC,
        funiture: funiture,
        legalInfor: legalInfor,
      }

      //upload image to cloudinary
      
      // let arrUrl = [];
      // if(checkChangeImage){
      //   for(let i = 0; i < files.length; i++){
      //     const imageData  = new FormData();
      //     imageData.append('file', files[i]);
      //     imageData.append('upload_preset', 'product-bds');
      //     axios.post("https://api.cloudinary.com/v1_1/vntrieu/image/upload", imageData)
      //     .then(res => arrUrl.push({url: res.data.secure_url}))
      //   }
      // }
      // console.log(arrUrl)

      
      const arrProduct = [...products]
      arrProduct[index] = np
      setProducts(arrProduct)
      setDone(true)
      productApi.edit(np)

    }else{
      setErr(true)
    }

  }
  

  const getImage = (e) => {
    setFiles(e.target.files)
    setNImage(e.target.files.length)
    setCheckChangeImage(true)
  }

  useEffect(() => {
    document.getElementById('title').value = p.title;
    document.getElementById('price').value = p.price;
    document.getElementById('descreption').value = p.descreption;
    document.getElementById('phoneNumbers').value = p.phoneNumber;
    document.getElementById('numfloors').value = p.numberOfFloors;
    document.getElementById('numWC').value = p.numberOfWC;
    document.getElementById('frontispiece').value = p.frontispiece;
    document.getElementById('funiture').value = p.funiture
    document.getElementById('legalInfor').value = p.legalInfor
    setNImage(p.images.length)
  }, [])

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit product
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="ptitle"
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
                autoComplete="price"
                variant="outlined"
                required
                fullWidth
                id="price"
                type="number"
                label="Price"
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
                id="phoneNumbers"
                label="Phone numbers"
                autoComplete="phoneNumber"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <RadioTypeProduct defaultValue={p.lease} data={data} setData={setData} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <AddressSelect defaultValue={p.address} data={data} setData={setData} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ListCategory defaultValue={p.category} data={data} setData={setData} />
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
                id="numWC"
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
            <Grid item xs={12} sm={12}>
              <ImageButton getImage={getImage} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <p className={classes.numImage}>Image: {nImage}  </p>
            </Grid>
          </Grid>

          <Grid item sm={12} className={classes.centerContent}>
            <Button
              onClick={add}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Edit product
            </Button>
            <Button
              onClick={close}
              variant="contained"
              className={classes.submit}
            >
              Back
            </Button>
          </Grid>
          
          {err&&
          <Grid item xs={12} sm={12}>
            <Alert severity="error">Some data fields are empty</Alert>
          </Grid>}
          {done &&
          <Grid item xs={12} sm={12}>
          <Alert severity="success">Edit prodcut successful</Alert>
          </Grid>}
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}