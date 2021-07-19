import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import productApi from '../apis/product.api';
import { Edit, Delete} from '@material-ui/icons/'

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
  const { products, setProducts, openEdit } = props;
  const getPrice = (p) => {
    const rs = p/1000000000;
    if(rs >= 1)
      return rs + ' tỷ';
    return Math.ceil(rs * 1000) + ' triệu';
  }
  const del = (item, index) => {
    return () => {
        let newData = [...products];
        newData.splice(index, 1);
        setProducts(newData)
        productApi.delete(item.id)
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Descreption</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item.title}
              </StyledTableCell>
              <StyledTableCell align="center">{item.descreption}</StyledTableCell>
              <StyledTableCell align="center">{getPrice(item.price)}</StyledTableCell>
              <StyledTableCell align="center">{item.address.addressString}</StyledTableCell>
              <StyledTableCell align="center">{item.category.name}</StyledTableCell>
              <StyledTableCell align="center">
                <Edit className={classes.icon} onClick={openEdit(item, index)} />
                <Delete className={classes.icon} onClick={del(item,index)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
