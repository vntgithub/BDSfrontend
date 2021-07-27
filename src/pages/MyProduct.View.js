import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import MenuBar from "../components/MenuBar.Component"
import AxiosClient from "../apis/AxiosClient";
import { signInByToken } from "../slices/user";
import { useHistory } from "react-router";
import {Button} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import AddProductForm from "../components/AddProdcutForm.Component";
import EditProductForm from "../components/EditProduct.Component";
import TableProduct from "../components/TableProduct.component";
import Pagination from '@material-ui/lab/Pagination';
import productApi from "../apis/product.api";


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
    const [openEditForm, setOpenEditForm] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [indexP, setIndexP] = useState(-1)
    const [pWantEdit, setPWantEdit] = useState({})
    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(0);


    const geNumPage = async () => setNumberOfPage(await productApi.getNumberOfPageOfUser(userData.id));
    
    const fetchProduct = async (userId, p) => setProducts(await productApi.getProductByUserId(userId, p));
    


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
            fetchUser().then(() => fetchProduct(user.id, currentPage));
        }else{
            fetchProduct(userData.id, currentPage)
        }
        geNumPage();
            
    }, [user])

    useEffect(() => {
        fetchProduct(userData.id, currentPage);
    }, [currentPage])
    
    const open = () => {
        setIsEdit(false)
        setOpenForm(!openForm)
    }

    const close = () => setOpenEditForm(false)
    
    const openEdit = (p, index) => {
        return () => {
            setIndexP(index)
            setPWantEdit(p)
            setOpenEditForm(true)
        }
    }
    const handleChangePage = (e, page) => setCurrentPage(page-1)
    return (
        <div>
            {/* <MenuBar avt={userData.avt} /> */}
            <div className="containerProduct">
                {!openForm && !openEditForm &&
                <div>
                    <Button onClick={open} className={classes.button} variant="outlined" >
                        Add product
                    </Button>
                    <TableProduct 
                    products={products} 
                    setProducts={setProducts} 
                    openEdit={openEdit} 
                    />
                    <Pagination
                        className={classes.button} 
                        onChange={handleChangePage} 
                        count={numberOfPage} />
                </div>}
                {openForm && 
                <AddProductForm 
                    isEdit={isEdit} 
                    p={pWantEdit}
                    index={indexP}
                    products={products} 
                    setProducts={setProducts} 
                    open={open} />}
                {openEditForm && 
                <EditProductForm 
                    p={pWantEdit}
                    index={indexP}
                    products={products} 
                    setProducts={setProducts} 
                    close={close} />}
            </div>
            
        </div>
    )
}

export default MyProductPage;