import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useDispatch, useSelector } from 'react-redux';
import { changeView } from '../slices/view'
import { useHistory } from 'react-router-dom';



export const MainListItems = () => {
  const role = useSelector(state => state.user.data.role)
  const history = useHistory()
  const dispatch = useDispatch()
  const handleChangeView = (view) => {
    return () => {
      dispatch(changeView(view))
      if(window.location.pathname !== '/')
        history.push('/')
    }
  }
  return(
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText onClick={handleChangeView('home')} primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText onClick={handleChangeView('myproduct')} primary="My products" />
    </ListItem>
    {role === 'ROLE_ADMIN' && <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText onClick={handleChangeView('users')} primary="Users" />
    </ListItem>}
    {role === 'ROLE_ADMIN' && 
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText onClick={handleChangeView('reports')} primary="Reports" />
    </ListItem>}
    {/* <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
  </div>
);
}

export const SecondaryListItems = () =>{
  const getReport = () => window.open(process.env.REACT_APP_URL_BACKEND + "contract/listcustomer", "_blank");
  return (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText onClick={getReport} primary="Customer report" />
    </ListItem>
    
  </div>
)};