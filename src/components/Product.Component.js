import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Edit, Delete} from '@material-ui/icons/'
import productApi from '../apis/product.api';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),  
    display: 'flex',
    width: 700
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 250,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  ofUser: {
    margin: theme.spacing(2),
    marginLeft: 'auto'
  },
  icon: {
    margin: theme.spacing(1),
    cursor: 'pointer'
  },
  containerIcon: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function MediaControlCard(props) {
  const classes = useStyles();

  const { title, 
    images, 
    descreption, 
    price, 
    phoneNumber,
    lease,
    address
  } = props.data;

  const { openEdit, index, products, setProducts } = props


  const getPrice = (p) => {
    const rs = p/1000000000;
    if(rs >= 1)
      return rs + ' tỷ';
    return Math.ceil(rs * 1000) + ' triệu';
  }

  const del = () => {
    let newData = [...products];
    newData.splice(index, 1);
    setProducts(newData)
    productApi.delete(props.data.id)
  }

  return (
    <Card className={classes.root}>
        <CardMedia
            className={classes.cover}
            image={images[0].url}
            title="Live from space album cover"
        />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
           {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {descreption}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Giá: {getPrice(price)}  đồng{lease && "/tháng"}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Contact {phoneNumber}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Address: {address.addressString}
          </Typography>
        </CardContent>
        {window.location.href.substring(window.location.origin.length) !== '/' &&
        <div className={classes.ofUser}>
          <div className={classes.containerIcon} >
            <div className={classes.icon}>
              <Edit onClick={openEdit(props.data, index)} />
            </div>
            <div className={classes.icon}>
              <Delete onClick={del} />
            </div>
          </div>
      </div>}
      </div>
     
    </Card>
  );
}
