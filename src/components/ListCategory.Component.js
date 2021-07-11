// import categoryApi from '../apis/category.api';
// import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import Select from '@material-ui/core/Select';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1,5,1,1),
//     minWidth: 150,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// export default function ListCategory() {
//   const classes = useStyles();
//   const [data, setData] = useState([])

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   const fetchCategory = async () => {
//       const resData = await categoryApi.getAll();
//       console.log(resData)
//       setData(resData)
//   }
//   useEffect(() => {
//     fetchCategory()
//   }, [])

  
//   const handleChangeStreet = (event) => setStreetId(event.target.value);
  

//   return (
//     <div>
//         <FormLabel component="legend">Category</FormLabel>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="ProvinceCity">Province/City</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={pCId}
//           onChange={handleChangeCity}
//         >
//             {data.map((item, index) => 
//                 <MenuItem key={index} value={parseInt(item.id)}>{item.name}</MenuItem>

//             )}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }
