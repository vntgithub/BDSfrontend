import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props) {
  const { setGender } = props
  const [value, setValue] = React.useState(true);

  const handleChange = (event) => {
    if(event.target.value == "true"){
      setValue(true);
      setGender(true)
    }else{
      setValue(false);
      setGender(false)
    }
    
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value={true} control={<Radio />} label="Female" />
        <FormControlLabel value={false} control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
  );
}