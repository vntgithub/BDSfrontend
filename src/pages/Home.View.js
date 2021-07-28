import { useEffect, useState } from "react";
import Product from "../components/Product.Component";
import { Container } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import FilterSearch from "../components/FilterSearch.Component";
import productApi from "../apis/product.api";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import filterApi from "../apis/filte.api";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    sort: {
      margin: theme.spacing(2),
    }, 
    icon: {
        margin: theme.spacing(2)
    }
  }));

const HomePage = () => {
    const classes = useStyles();
    const userId = useSelector(state => state.user.data.id)
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [sortMethod, setSortMethod] = useState(true)
    const [filter, setFilter] = useState({
        searchString: null, priceRange: null, provinceCityId: null,
        districtId: null, wardId: null, streetId: null
    })
    


    const fetch = async (p) => setProducts( await productApi.fetch(p));
    

    const getNPage = async () => setNumberOfPage(await productApi.getNumberOfPage());
    
    const getArrPrice = (pR) => {
        switch(pR) {
            case 0: return [0, 500000000]
            case 1: return [500000000, 1000000000]
            case 2: return [1000000000, 1500000000]
            case 3: return [1500000000, 2000000000]
            case 4: return [2000000000, 5000000000]
            case 5: return [5000000000, 10000000000]
            case 6: return [10000000000, 20000000000]
            default: return [20000000000, 200000000000]
        }
    }
    const search = async () => {
        let url = "product/search?";
        let filterObject = {
            user:{id: userId},
            content: {

            }
        }
        let check = false;
        for(let key in filter){
            if(filter[key] !== null && filter[key] !== ""){
                check = true;
                if(key === 'priceRange'){
                    filterObject.content[key] = filter[key];
                    let arrPrice = getArrPrice(filter[key]);
                    url += `priceStart=${arrPrice[0]}&`;
                    url += `priceEnd=${arrPrice[1]}&`;
                }else{
                    url += `${key}=${filter[key]}&`;
                    filterObject.content[key] = filter[key];
                }
                
            }
        }
        url += `index=${currentPage}`;
        if(check){
            filterApi.add(filterObject)
            setProducts(await productApi.search(url));
        }
        
    }

    
    useEffect(() => {
        fetch(currentPage);
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
    const getIcon = (b) => {
        return b ? "ASC" : "DESC"
    }
    return (
        <div>
            <Container>
                <div className="listProduct">
                    <div>
                        <FilterSearch 
                        filter={filter} 
                        setFilter={setFilter}
                        search={search} />  
                    </div>
                </div>
                <div className="listProduct">
                    <div>
                        <div className={classes.sort}>
                            <Button onClick={sortProducts} variant="outlined">Sort by price</Button>
                            <span className={classes.icon}>{getIcon(sortMethod)}</span>
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