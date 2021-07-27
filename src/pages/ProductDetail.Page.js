import { useEffect, useState } from "react";
import productApi from "../apis/product.api";
import { Container, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const avt = useSelector(state => state.user.data.avt)
    const getProduct = async (id) => {
        const data = await productApi.getProductById(id);
        setProduct(data)

    }
    useEffect(() => {
        const productId = window.location.href.substring(window.location.href.length-1);
        getProduct(productId)
    }, [])
    return (
        <Container>
           <Grid container spacing={3}>
                <Grid className="imgcontainer" item xs={12}>
                    <img className="imgproduct" src={product.images[0].url} alt="productImage" />
                </Grid>
                <Grid item xs={12}>
                    <h1>{product.title}</h1>
                    <h3>{product.descreption}</h3>
                </Grid>
           </Grid>
        </Container>
    )
}

export default ProductDetail;