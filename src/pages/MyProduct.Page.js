import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../components/MenuBar.Component"
import { fetchProductByUserId } from "../slices/product";
import Product from "../components/Product.Component"
import AxiosClient from "../apis/AxiosClient";
import { signInByToken } from "../slices/user";
import { useHistory } from "react-router";
import {Button} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import AddProductForm from "../components/AddProdcutForm.Component";

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(3),
    }
    
  }));

const MyProductPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    let userData = useSelector(state => state.user.data)
    const [user, setUser] = useState({})
    const [products, setProducts] = useState([])
    const [openForm, setOpenForm] = useState(false)

    const fetchProduct = async (userId) => {
        const data = unwrapResult(await dispatch(fetchProductByUserId(userId)))
        setProducts(data);
    }


    const fetchUser = async () => {
        const token = localStorage.getItem("token")
        if(token){
            AxiosClient.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            const data =  unwrapResult(await dispatch(signInByToken(token)))
            setUser(data)
            
        }else{
            history.push('/signin')
        }
    }
    useEffect(() => {
        if(!userData.hasOwnProperty('id')){
            fetchUser().then(() => fetchProduct(user.id));
        }else{
            fetchProduct(userData.id)
        }
            
    }, [user])
    const open = () => setOpenForm(!openForm)
    return (
        <div>
            <MenuBar avt={userData.avt} />
            <div className="containerProduct">
                {!openForm && 
                <div>
                    <Button onClick={open} className={classes.button} variant="outlined" >
                        Add product
                    </Button>
                {
                    products.map((item, index) => <Product key={index} data={item} />)
                }
                </div>}
                {openForm && <AddProductForm open={open} />}
            </div>
        </div>
    )
}

export default MyProductPage;