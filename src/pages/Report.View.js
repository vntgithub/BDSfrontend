import { useState } from "react";
import { Container } from "@material-ui/core";
import FilterSearch from "../components/FilterSearch.Component";
import productApi from "../apis/product.api";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";


const ReportView = () => {
    const userId = useSelector(state => state.user.data.id)
    const [filter, setFilter] = useState({
        searchString: null, priceRange: null, provinceCityId: null,
        districtId: null, wardId: null, streetId: null
    })
    
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
        let url = "http://localhost:8080/product/report?";
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
        if(check)
            window.open(url.substr(0, url.length - 1), "_blank");
        
    }

    return (
        <div>
            <Container>
                <div className="listProduct">
                    <div>
                        <FilterSearch 
                        filter={filter}
                        isReportView={true} 
                        setFilter={setFilter}
                        search={search} />  
                    </div>
                </div>
                
            </Container>
        </div>
        
    )
}

export default ReportView;