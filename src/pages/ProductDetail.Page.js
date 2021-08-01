import { useEffect, useState } from "react";
import productApi from "../apis/product.api";
import { Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ButtonDialog from '../components/ButtonDialog.Component'
import Menu from '../components/Menu.Component'
import contractApi from "../apis/contract.api";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    showImg: {
        display: 'flex',
        justifyContent: 'center',
        height: '550px',
        placeItems: 'normal',
    },
    listImg: {
        // display: 'flex',
        justifyContent: 'center',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    
}))

const ProductDetail = () => {
    const userId = useSelector(state => state.user.data.id)
    const [product, setProduct] = useState(null);
    const classes = useStyles();
    const [currentUrl, setCurrentUrl] = useState('#')
    const getProduct = async (id) => {
        const data = await productApi.getProductById(id);
        setProduct(data)
        setCurrentUrl(data.images[0].url)

    }
    const getPrice = (p) => {
        const rs = p/1000000000;
        if(rs >= 1)
          return rs + ' tỷ';
        return Math.ceil(rs * 1000) + ' triệu';
      }
    const changeShowImg = (url) => {
        return function () {
            setCurrentUrl(url);
        }
    }
    const createContract = () => {
        if(userId){
            setProduct({...product, hasContract: true})
            contractApi.create(userId, product.id)
        }
    }
    useEffect(() => {
        const productId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        getProduct(productId)
    }, [])
    return (
        <div className={classes.root}>
            <Menu />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                    <Container className={classes.container}>
                    {product !== null &&
                    <Grid container spacing={3}>
                            <Grid 
                                className={classes.showImg}
                                item
                                xs={12}
                            >
                                <img className="showImg" src={currentUrl} alt="productImage" />
                            </Grid>
                            <Grid className={classes.listImg} item xs={12}>
                                {product.images.map((item, index) => 
                                    <span className="hoverImg">
                                        <img 
                                        className="productImg" 
                                        key={index} 
                                        src={item.url} 
                                        onClick={changeShowImg(item.url)}
                                        alt="productImage" />
                                    </span>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <h1>Title: {product.title}</h1>
                                <h3>Descreption: {product.descreption}</h3>
                                <h3>Price: {getPrice(product.price)}</h3>
                                <h3>Address: {product.address.addressString}</h3>
                                <div>
                                    <span className="productDetail">Number of WC: {product.numberOfWC}</span>
                                    <span className="productDetail">Number of floors: {product.numberOfFloors}</span>
                                    <span className="productDetail">Frontispiece: {product.frontispiece}</span>
                                </div>
                                <h3>Funiture: {product.funiture}</h3>
                                <h3>Legal information: {product.legalInfor}</h3>
                                <div>
                                    {!product.hasContract && userId &&
                                    <Button onClick={createContract} variant="contained">Create contract</Button>
                                    }
                                    {product.hasContract &&
                                    <Button variant="contained" disabled>Has contract</Button>}
                                    {!product.hasContract && !userId &&
                                        <ButtonDialog />
                                    }
                                </div>
                            </Grid>
                    </Grid>}
                    </Container>
                </main>
        </div>
       
    )
}

export default ProductDetail;