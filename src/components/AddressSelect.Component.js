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

export default function SimpleSelect(props) {
  const classes = useStyles();

  const [provinceCity, setProvinceCity] = useState([]);
  const [pCId, setPCId] = useState("");

  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState("");

  const [ward, setWard] = useState([]);
  const [wardId, setWardId] = useState("");

  const [street, setStreet] = useState([]);
  const [streetId, setStreetId] = useState("");

  const fetchCity = async () => {
      const data = await addressApi.getProvinceCity();
      setProvinceCity(data);
  }

  const fetchDistrict = async (provinceCityId) => {
      if(provinceCityId !== ""){
        const data = await addressApi.getDistrict(provinceCityId)
        setDistrict(data)
      }
  }

  const fetchWard = async (districtId) => {
      if(districtId !== ""){
        const data = await addressApi.getWard(districtId)
        setWard(data)
      }
  }

  const fetchStreet = async (wardId) => {
      if(wardId !== ""){
        const data = await addressApi.getStreet(wardId)
        setStreet(data)
      }
  }

  useEffect(() => {
    fetchCity();
  },[])

  useEffect(() => {
    fetchDistrict(pCId);
    setDistrictId("")
    setWardId("")
    setStreetId("")
  }, [pCId])

  useEffect(() => {
    fetchWard(districtId)
    setWardId("")
    setStreetId("")
  }, [districtId])

  useEffect(() => {
    fetchStreet(wardId)
    setStreetId("")
  }, [wardId])


  const handleChangeCity = (event) => {
    if(event.target.value === ""){
      setDistrict([])
    }
    setPCId(event.target.value)
  }
  const handleChangeDistrict = (event) => setDistrictId(event.target.value);
  const handleChangeWard = (event) => setWardId(event.target.value);
  const handleChangeStreet = (event) => {
    if(props.hasOwnProperty('data')){
      const { data, setData } = props;
      setData({...data, address: {
        provinceCity: {
          id: pCId,
        },
        district: {
            id: districtId,
        },
        ward:{
            id: wardId,
        },
        street: {
            id: event.target.value,
      }
      }})
    }
    setStreetId(event.target.value)
  }

  useEffect(() => {
    if(props.hasOwnProperty('defaultValue')){
      const {defaultValue} = props;
      setPCId(defaultValue.provinceCity.id)
      setDistrictId(defaultValue.district.id)
      setWardId(defaultValue.ward.id)
      setStreetId(defaultValue.street.id)
    }
  }, [])
  

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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {street.map((item, index) => 
            <MenuItem key={index} value={parseInt(item.id)}>{item.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
