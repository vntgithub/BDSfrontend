import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import addressApi from '../apis/address.api';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1,5,1,1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();

  const [provinceCity, setProvinceCity] = useState([]);
  const [pCId, setPCId] = useState(0);

  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState(0);

  const [ward, setWard] = useState([]);
  const [wardId, setWardId] = useState(0);

  const [street, setStreet] = useState([]);
  const [streetId, setStreetId] = useState(0);

  const fetchCity = async () => {
      const data = await addressApi.getProvinceCity();
      setProvinceCity(data);
  }

  const fetchDistrict = async (provinceCityId) => {
      const data = await addressApi.getDistrict(provinceCityId)
      setDistrict(data)
  }

  const fetchWard = async (districtId) => {
      const data = await addressApi.getWard(districtId)
      setWard(data)
  }

  const fetchStreet = async (wardId) => {
      const data = await addressApi.getStreet(wardId)
      console.log(data)
      setStreet(data)
  }

  useEffect(() => {
    fetchCity();
  },[])

  useEffect(() => {
    fetchDistrict(pCId);
  }, [pCId])

  useEffect(() => {
    fetchWard(districtId)
  }, [districtId])

  useEffect(() => {
    fetchStreet(wardId)
  }, [wardId])


  const handleChangeCity = (event) => setPCId(event.target.value);
  const handleChangeDistrict = (event) => setDistrictId(event.target.value);
  const handleChangeWard = (event) => setWardId(event.target.value);
  const handleChangeStreet = (event) => setStreetId(event.target.value);
  

  return (
    <div>
        <FormLabel component="legend">Address</FormLabel>
      <FormControl className={classes.formControl}>
        <InputLabel id="ProvinceCity">Province/City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pCId}
          onChange={handleChangeCity}
        >
            {provinceCity.map((item, index) => 
                <MenuItem key={index} value={parseInt(item.id)}>{item.name}</MenuItem>

            )}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="District">District</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={districtId}
          onChange={handleChangeDistrict}
        >
          {district.map((item, index) => 
            <MenuItem key={index} value={parseInt(item.id)}>{item.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="Ward">Ward</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={wardId}
          onChange={handleChangeWard}
        >
          {ward.map((item, index) => 
            <MenuItem key={index} value={parseInt(item.id)}>{item.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="Street">Street</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={streetId}
          onChange={handleChangeStreet}
        >
          {street.map((item, index) => 
            <MenuItem key={index} value={parseInt(item.id)}>{item.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
