import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  const { setDateOfBirth } = props
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2000-01-01T21:11:54'));

  const handleDateChange = (date) => {
    setDateOfBirth(date.getFullYear() + "-" + (date.getMonth() + 1) +"-"+ date.getDate())
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date of birth"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
      </Grid>
    </MuiPickersUtilsProvider>
  );
}