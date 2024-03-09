// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Image from 'mui-image'
import { Grid, Typography } from '@mui/material';
function Final() {
	const [cities, setCities] = useState([]);
	const [selectedCities, setSelectedCities] = useState([]);
	const [vehicles, setVehicles] = useState([]);
	const [selectedVehicles, setSelectedVehicles] = useState([])
	const [copImage, setCopImage] = useState(null);
  const [cops, setCops] = useState([
    { city: '', vehicle: '' },
    { city: '', vehicle: '' },
    { city: '', vehicle: '' },
  ]);
  const [result, setResult] = useState({});

  useEffect(() => {
    fetchCities();
    fetchVehicles();
  }, []);

  const fetchCities = async () => {
	try {
	  const response = await axios.get('http://localhost:3001/cities');
		setCities(response.data);
		console.log(response.data)
	} catch (error) {
	  console.error('Error fetching cities:', error);
	}
  };
  
  const fetchVehicles = async () => {
	try {
	  const response = await axios.get('http://localhost:3001/vehicles');
		setVehicles(response.data);
		console.log(response.data)
	} catch (error) {
	  console.error('Error fetching vehicles:', error);
	}
  };
	const handleClick = (cityName) => {
	  console.log(cityName)
    if (selectedCities.length < 3) {
      setSelectedCities([...selectedCities, cityName]);

      // Update cops state with selected city
      const updatedCops = [...cops];
      updatedCops[selectedCities.length].city = cityName;
      setCops(updatedCops);
    } else {
      console.log('Already selected 3 cities');
    }
	};
	const handleVehicleClick = (vehicleName) => {
		console.log(vehicleName);
		if (selectedVehicles.length < 3) {
		  setSelectedVehicles([...selectedVehicles, vehicleName]);
	  
		  // Update cops state with selected vehicle
		  const updatedCops = [...cops];
		  updatedCops[selectedVehicles.length].vehicle = vehicleName;
		  setCops(updatedCops);
		} else {
		  console.log('Already selected 3 vehicles');
		}
	  };
	  
	const fetchCopImage = async (capturingCop) => {
		  console.log(capturingCop,'ss')
		try {
			// Replace 'copImageUrlEndpoint' with the actual endpoint URL for fetching cop images
			const response = await axios.get(`http://localhost:3001/cop/${capturingCop}`);
			const imageData = response.data; // Assuming response contains image data
			// Process the image data as needed
			
			// Set the image data to the state or context to be displayed in the UI
			setCopImage(imageData.imageUrl); // Assuming 'url' is the property containing the image URL in the response
		} catch (error) {
			console.error('Error fetching cop image:', error);
		}
	}
	  
  const capture = async () => {
	  try {
		console.log(cops,'sdsds')
	  const response = await axios.post('http://localhost:3001/capture', {
		cop1City: cops[0].city,
		cop1Vehicle: cops[0].vehicle,
		cop2City: cops[1].city,
		cop2Vehicle: cops[1].vehicle,
		cop3City: cops[2].city,
		cop3Vehicle: cops[2].vehicle,
	  });
		  setResult(response.data);
		  if (response.data.success) {
			  const capturingCop = `cop${response.data.copIndex + 1}`;
			console.log(capturingCop)  // Assuming response includes the index of capturing cop
            // fetchCopImage(capturingCop); // Function to fetch cop's image using another API
        }
	} catch (error) {
	  console.error('Error capturing fugitive:', error);
	}
  }

  return (
	  <>
		  <Grid container lg={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Grid item lg={10} sx={{margin:'auto'}}>
      <Typography sx={{fontSize:'24px',marginTop:'60px',marginBottom:'30px',textAlign:'center',fontWeight:'600'}}> Select the Cities</Typography>
      <Grid container lg={12} spacing={2} >
        {cities.map((city) => (
			<Grid item lg={4} key={city.name} onClick={() => handleClick(city.name)} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<Image src={city.imageUrl} alt={city.name} style={{ width: '90%',borderRadius: '26px',  border: selectedCities.some(selectedCity => selectedCity === city.name) ? '2px solid red' : 'none' }}/>
        <Typography   sx={{ fontSize: '20px',fontWeight:'600px',marginTop:'10px',marginBottom:'30px' }}>
           {city.name}
           </Typography>
          </Grid>
		))}
				  
      </Grid>
      </Grid>
		  </Grid>
		  <Grid container lg={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Grid item lg={10} sx={{margin:'auto'}}>
      <Typography sx={{fontSize:'24px',marginTop:'60px',marginBottom:'30px',textAlign:'center',fontWeight:'600'}}> Select the Vehicle</Typography>
      <Grid container lg={12} spacing={2}>
				  {vehicles.map((vehicle) => (
		  <Grid item lg={4} key={vehicle.type} onClick={() => handleVehicleClick(vehicle.type)}>
               <img src={vehicle.imageUrl} alt={vehicle.type} style={{ width: '90%',borderRadius:'26px',border: selectedVehicles.includes(vehicle.type) ? '2px solid red' : 'none' }} />
			   </Grid>
			  
            ))}
				  </Grid>
      </Grid>
		  </Grid>
      {/* <h1>Select City and Vehicle for Each Cop</h1>
      {cops.map((cop, index) => (
        <div key={index}>
          <h2>Cop {index + 1}</h2>
          <label>Select City:</label>
          <select
            value={cop.city}
            onChange={(e) => {
              const updatedCops = [...cops];
              updatedCops[index].city = e.target.value;
              setCops(updatedCops);
            }}
          >
            <option value="">Select</option>
            {cities.map((city) => (
              <option key={city._id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <label>Select Vehicle:</label>
          <select
            value={cop.vehicle}
            onChange={(e) => {
              const updatedCops = [...cops];
              updatedCops[index].vehicle = e.target.value;
              setCops(updatedCops);
            }}
          >
            <option value="">Select</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle.type}>
                {vehicle.type}
              </option>
            ))}
          </select>
        </div>
      ))} */}
      <Grid container lg={12} sx={{display:'flex',justifyContent:'center'}}>
      <button onClick={capture} style={{ backgroundColor: 'chocolate', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none',marginTop:'20px'  }}>Capture Fugitive</button>
      </Grid>
		  {result.success ? (
			  <Grid container lg={10} sx={{margin:'auto'}}>
        <Typography sx={{fontSize:'20px',fontWeight:'500',marginTop:'20px'}}>Congratulations! Fugitive Captured by Cop {cops.findIndex((cop) => cop.city === result.cop.city) + 1}</Typography>
        <Grid item lg={10}>
		<button onClick={() => {
    const index = cops.findIndex((cop) => cop.city === result.cop.city) + 1;
    const capturingCop = index < 10 ? 'Cop' + index : 'Cop' + index.toString().slice(1);
    fetchCopImage(capturingCop);
}} style={{ 
  backgroundColor: 'transparent', 
  color: '#000', 
  padding: '10px 20px', 
  borderRadius: '5px', 
  border: '2px solid chocolate', marginTop:'20px',marginBottom:'20px'
  
}}>Fetch Cop Image</button></Grid>
  {copImage && <img src={copImage} alt="Capturing Cop" />} 
			  </Grid>) : (
        <Typography sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'30px',fontSize:'20px',fontWeight:'600'}}>Fugitive Not Captured</Typography>
      )}
    </>
  );
}

export default Final;
