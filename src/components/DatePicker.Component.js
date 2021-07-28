import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import contractApi from '../apis/contract.api';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
      margin: theme.spacing(2,3)
  }

}));

export default function DatePickers(props) {
  const classes = useStyles();
  const { setContracts } = props
  const [date, setDate] = useState('');
  
  const getDate = (e) => setDate(e.target.value)
  const getList = async () => {
    let dateInput = new Date(date);
    const listContracts = await contractApi.get(dateInput.getMonth() + 1, dateInput.getFullYear())
    setContracts(listContracts)
  }
  
  return (
    <form className={classes.container} noValidate>
      <TextField
        onChange={getDate}
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2021-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <span className={classes.button}>
            <Button onClick={getList} variant="contained" color="primary">
                Get contracts table
            </Button>
        </span>
    </form>
  );
}