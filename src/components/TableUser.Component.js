import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import userApi from '../apis/user.api';
import { Delete} from '@material-ui/icons/'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 900,
  },
  icon: {
    margin: theme.spacing(1),
    cursor: 'pointer'
  },
}));

export default function CustomizedTables(props) {
  const classes = useStyles();
  const { listUsers, setListUsers } = props;
  
  const del = (item, index) => {
    return () => {
        let newData = [...listUsers];
        newData.splice(index, 1);
        setListUsers(newData)
        //Call api
        //userApi.delete(item.id)
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Avatar</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUsers.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{item.id}</StyledTableCell>
            <StyledTableCell align="center">{item.name}</StyledTableCell>
            <StyledTableCell align="center">
                <Avatar alt="user_avt" src={item.avt} />
            </StyledTableCell>
            <StyledTableCell align="center">{item.address.addressString}</StyledTableCell>
            <StyledTableCell align="center">{item.contact.email}</StyledTableCell>
            <StyledTableCell align="center">{item.contact.phoneNumber}</StyledTableCell>
              <StyledTableCell align="center">
                <Delete className={classes.icon} onClick={del(item,index)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}