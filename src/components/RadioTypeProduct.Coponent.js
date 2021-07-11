import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioTypeProduct(props) {
  const [value, setValue] = React.useState(true);
  const { data, setData } = props
  const handleChange = () => {
    setData({...data, lease: !value})
    setValue(!value)
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Type</FormLabel>
      <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange}>
        <FormControlLabel  value={true} control={<Radio />} label="Lease" />
        <FormControlLabel value={false} control={<Radio />} label="Sell" />
      </RadioGroup>
    </FormControl>
  );
}