import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product.Component";
import { Container } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { fetchProduct } from "../slices/product";
import { unwrapResult } from "@reduxjs/toolkit";
import FilterSearch from "../components/FilterSearch.Component";
import productApi from "../apis/product.api";
import { searchProduct } from "../slices/product";
import MenuBar from "../components/MenuBar.Component"
import { signInByToken } from "../slices/user";
import AxiosClient from "../apis/AxiosClient";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    sort: {
      margin: theme.spacing(2),
    }
  }));

const HomePage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({})
    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [sortMethod, setSortMethod] = useState(true)
    const [filter, setFilter] = useState({
        searchString: null, priceRange: null, provinceCityId: null,
        districtId: null, wardId: null, streetId: null
    })


    const fetch = async (p) => {
        const rsAction = await dispatch(fetchProduct(p));
        const productArrayFromServer = unwrapResult(rsAction);
        setProducts(productArrayFromServer);
    }

    const getNPage = async () => {
        const nPage = await productApi.getNumberOfPage();
        setNumberOfPage(nPage);
    }

    const search = async () => {
        let url = "product/search?";
        let check = false;
        for(let key in filter){
            if(filter[key] !== null && filter[key] !== ""){
                check = true;
                url += `${key}=${filter[key]}&`;
            }
        }
        if(check){
            const data = unwrapResult(await dispatch(searchProduct(url.substr(0, url.length-1))));
            setProducts(data);
        }
        
    }

    const fetchUser = async () => {
        const token = localStorage.getItem("token")
        if(token){
            AxiosClient.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            const userData = unwrapResult(await dispatch(signInByToken(token)))
            setUser(userData)
        }
    }
    useEffect(() => {
        fetchUser()
        fetch(numberOfPage);
        getNPage();
    }, [])

    useEffect(() => {
        fetch(currentPage);
    }, [currentPage])
    
    const handleChangePage = (e, page) => setCurrentPage(page-1)

    const sortProducts = () => {
        let cloneData = [...products]
        if(sortMethod){
            // Sort descending
            for(let i = 0; i < cloneData.length - 1; i++) {
                for(let j = i+1; j < cloneData.length; j++) {
                    if(cloneData[i].price < cloneData[j].price) {
                        let tmp = cloneData[i]
                        cloneData[i] = cloneData[j]
                        cloneData[j] = tmp
                    }
                }
            }
        }else{
            //Sort ascending
            for(let i = 0; i < cloneData.length - 1; i++) {
                for(let j = i+1; j < cloneData.length; j++) {
                    if(cloneData[i].price > cloneData[j].price) {
                        let tmp = cloneData[i]
                        cloneData[i] = cloneData[j]
                        cloneData[j] = tmp
                    }
                }
            }
        }
        setSortMethod(!sortMethod)
        setProducts(cloneData)
    }
    return (
        <div>
            <MenuBar avt={user.avt || ""} />
            <Container>
                <div className="listProduct">
                    <div>
                        <FilterSearch 
                        filter={filter} 
                        setFilter={setFilter}
                        search={search} />  
                    </div>
                    <div>
                        <div className={classes.sort}>
                            <Button onClick={sortProducts} variant="outlined">Sort by price</Button>
                        </div>
                        {products.map((item, index) => <Product key={index} data={item} />)}
                        <Pagination 
                        onChange={handleChangePage} 
                        count={numberOfPage} />
                   </div>
                </div>
                
            </Container>
        </div>
        
    )
}

export default HomePage;