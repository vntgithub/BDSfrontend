import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

export default function CustomizedTables(props) {
  const classes = useStyles();
  const { contracts } = props;

  const getPrice = (p) => {
    const rs = p/1000000000;
    if(rs >= 1)
      return rs + ' tỷ';
    return Math.ceil(rs * 1000) + ' triệu';
  }
  
  
  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Id contract</StyledTableCell>
            <StyledTableCell align="center">Customer name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone number</StyledTableCell>
            <StyledTableCell align="center">Product title</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell align="center">{item.userDTO.name}</StyledTableCell>
              <StyledTableCell align="center">{item.userDTO.contact.email}</StyledTableCell>
              <StyledTableCell align="center">{item.userDTO.contact.phoneNumber}</StyledTableCell>
              <StyledTableCell align="center">{item.productDTO.title}</StyledTableCell>
              <StyledTableCell align="center">{getPrice(item.productDTO.price)}</StyledTableCell>
              <StyledTableCell align="center">{item.productDTO.address.addressString}</StyledTableCell>
              <StyledTableCell align="center">{item.productDTO.category.name}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
