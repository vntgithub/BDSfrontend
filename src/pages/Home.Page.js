import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Product from "../components/Product";
import { Container } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { fetchProduct } from "../slices/product";
import { unwrapResult } from "@reduxjs/toolkit";
import FilterSearch from "../components/FilterSearch";
import productApi from "../apis/product.api";
import { searchProduct } from "../slices/product";

const HomePage = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(0);
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

    
    useEffect(() => {
        fetch(numberOfPage);
        getNPage();
    }, [])



    useEffect(() => {
        fetch(currentPage);
    }, [currentPage])
    
    const handleChangePage = (e, page) => setCurrentPage(page-1)
    return (
        <div>
            
            <Container>
                <FilterSearch filter={filter} setFilter={setFilter} search={search} />
                {products.map((item, index) => <Product key={index} data={item} />)}
                <Pagination 
                    onChange={handleChangePage} 
                    count={numberOfPage} />
            </Container>
        </div>
        
    )
}

export default HomePage;