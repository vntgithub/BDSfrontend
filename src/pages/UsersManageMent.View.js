import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import userApi from "../apis/user.api";
import TableUser from '../components/TableUser.Component'

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(3),
    },
    textCenter: {
        textAlign: 'center'
    }
    
  }));

const UserManagerView = () => {
    const classes = useStyles();
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const fetchListUsers = async (p) => {
        const data = await userApi.getListUsers(p);
        setListUsers(data);
    }

    const countPage = async () => {
        const data = await userApi.countPage();
        setNumberOfPage(data);
    }
    
    useEffect(() => {
        fetchListUsers(currentPage)
        countPage();
    }, [])
    useEffect(() => {
        fetchListUsers(currentPage)
    }, [currentPage])
    
   
    const handleChangePage = (e, page) => setCurrentPage(page-1)
    return (
        <div>
            <h1 className={classes.textCenter}>User manager</h1>
            <div className="containerProduct">
                <div>
                    <TableUser listUsers={listUsers} setListUsers={setListUsers} />
                    <Pagination
                        className={classes.button} 
                        onChange={handleChangePage} 
                        count={numberOfPage} />
                </div>
            </div>
            
        </div>
    )
}

export default UserManagerView;