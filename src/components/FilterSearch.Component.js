import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import addressApi from '../apis/address.api';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2,5,2,2),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  search: {
      width: 425,
      margin: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(2,5,2,2),
    width: 150
  },
  price: {
    margin: theme.spacing(0,5,2,4),
    width: 180
  }
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const {setFilter, search, filter} = props;

  const [provinceCity, setProvinceCity] = useState([]);
  const [pCId, setPCId] = useState("");

  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState("");

  const [ward, setWard] = useState([]);
  const [wardId, setWardId] = useState("");

  const [street, setStreet] = useState([]);
  const [streetId, setStreetId] = useState("");

  const [price, setPrice] = useState("");

  const fetchCity = async () => {
        const data = await addressApi.getProvinceCity();
        setProvinceCity(data);
  }

  const fetchDistrict = async (provinceCityId) => {
      if(provinceCityId !== ""){
        const data = await addressApi.getDistrict(provinceCityId)
        setDistrict(data)
      }else{
          setDistrict([])
          setStreet([])
          setWard([])
          setStreetId("")
          setWardId("")
          setDistrictId("")
      }
  }

  const fetchWard = async (districtId) => {
      if(districtId !== ""){
        const data = await addressApi.getWard(districtId)
            setWard(data)
      }else{
        setStreet([])
        setWard([])
        setStreetId("")
        setWardId("")
    }
  }

  const fetchStreet = async (wardId) => {
      if(wardId !== ""){
        const data = await addressApi.getStreet(wardId)
        setStreet(data)
      }else{
        setStreet([])
        setStreetId("")
      }
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


  const handleChangeCity = (event) => {
    const id = event.target.value;
    let newFilter
    if(id !== "")
      newFilter = {...filter, provinceCityId: id}
    else
      newFilter = {
        ...filter, 
        provinceCityId: null,
        districtId: null, wardId: null, streetId: null 
      }
    setFilter(newFilter)
    setPCId(id)
  }
  const handleChangeDistrict = (event) => {
    const id = event.target.value;
    let newFilter
    if(id !== "")
      newFilter = {...filter, districtId: id}
    else
      newFilter = {
        ...filter, 
        districtId: null, wardId: null, streetId: null 
      }
    setFilter(newFilter)
      setDistrictId(event.target.value);
    }
  const handleChangeWard = (event) => {
    const id = event.target.value;
    let newFilter
    if(id !== "")
      newFilter = {...filter, wardId: id}
    else
      newFilter = {
        ...filter, 
        wardId: null, streetId: null 
      }
    setFilter(newFilter)  
    setWardId(event.target.value)
  }
  const handleChangeStreet = (event) => {
    const id = event.target.value;
    let newFilter
    if(id !== "")
      newFilter = {...filter, streetId: id}
    else
      newFilter = {
        ...filter, 
       streetId: null 
      }
    setFilter(newFilter) 
    setStreetId(event.target.value);
  }
  
  const handleChangePrice = (event) => {
    let p = event.target.value;
    const newFilter = {...filter, 
      priceRange: p}
    setFilter(newFilter)   
    setPrice(p)
  };

  const handleChangeSearchString = (e) => {
    const newFilter = {...filter, searchString: e.target.value}
    setFilter(newFilter)
  }

  const getString = () => {
    if(props.hasOwnProperty('isReportView'))
      return 'Get file excel'
    return 'Search'
  }
  

  return (
    <Grid>
      <Grid>
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
      </Grid>
      <Grid>
        <FormControl>
            <TextField 
            onChange={handleChangeSearchString}
            className={classes.search} 
            id="outlined-basic" 
            label="Search" 
            variant="outlined" />
        </FormControl>
        <FormControl className={classes.price}>
            <InputLabel id="Street">Gi??</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={price}
            onChange={handleChangePrice}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={0}>{"D?????i 500 tri???u"}</MenuItem>
                <MenuItem value={1}>{"500 tri???u - 1t???"}</MenuItem>
                <MenuItem value={2}>{"1t??? - 1.5 t???"}</MenuItem>
                <MenuItem value={3}>{"1.5 t??? - 2 t???"}</MenuItem>
                <MenuItem value={4}>{"2 t??? - 5 t???"}</MenuItem>
                <MenuItem value={5}>{"5 t??? - 10 t???"}</MenuItem>
                <MenuItem value={6}>{"10 t??? - 20 t???"}</MenuItem>
                <MenuItem value={7}>{"> 20 t???"}</MenuItem>
            </Select>
        </FormControl>  
        <FormControl className={classes.button}>
            <Button onClick={search} variant="contained" color="primary">
                {getString()}
            </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
}
