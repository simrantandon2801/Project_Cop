import React from 'react'
import Image from 'mui-image';
import { Grid,Typography,Button } from '@mui/material';

import Cops from './Image/Cops.jpg'
import useMediaQuery from '@mui/material/useMediaQuery';

import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)`
  &:hover {
    background-color: #8B4513; /* or specify the desired background color */
  }
`;
const Landingpage = () => {
	const navigate = useNavigate();
	const token1 = localStorage.getItem('token1')
	const mobile = useMediaQuery('(max-width:600px)');
	const ipad = useMediaQuery('(min-width: 768px) and (max-width: 1180px)');
	const Get_Started = () => {
		navigate('/landing')
	}
	const createpage = () => {
		navigate('/payslip')
	}
	
  return (
    <>
  
    <Grid container lg={12} xs={12} sx={{justifyContent:'center',alignItems:'center',marginTop:'80px',marginBottom:"80px"}}>
<Grid container lg={9} xs={10} sx={{backgroundColor:'peachpuff',display:'flex',justifyContent:'center',alignItems:'center'}}>
  <Grid container lg={5} xs={12}>
  <Grid item  lg={12} xs={10} sx={{margin:mobile?"auto":""}} >	 
                          <Image
            duration={0}
            src={Cops}
            style={{
              width: mobile?"150px": '339px',
				height: mobile?"150px":'339px',
				
            
              transitionDuration: '0',
              animation: '0',
              zIndex: 1,
              borderRadius: '339px',
              marginTop:'76px',marginBottom:'76px'
            // To maintain the aspect ratio of the image within the circle
            }}
          />
                
             
                            
                            
          </Grid>	
  </Grid>
  <Grid container lg={5} xs={10}>
    <Grid item lg={12} xs={12}>
      <Typography sx={{fontSize: mobile?'13px':'24px',fontWeight:mobile?'600':'700'}}>Welcome to the Fugitive Capture Game!</Typography>
      </Grid>
      <Grid item lg={12} xs={12}>
    <Typography sx={{fontSize:mobile?'13px':'16px',fontWeight:'400'}}>A notorious criminal escape artist has vanished again, and the hunt is on! This time, the criminal may be hiding in one of the five neighboring cities. Three fearless cops have volunteered to capture the fugitive, and they need your help!</Typography>
					  </Grid>
					  {token1 ?
					  <Grid container lg={6} sx={{marginTop:mobile?'18px':'46px',display:'flex',justifyContent:'space-between'}}>
					  <Grid item lg={12} >
					  <CustomButton onClick={createpage} sx={{color:'#fff',textTransform:'none',fontSize:'16px',fontWeight:'500',background: 'chocolate',borderRadius:'8px',padding:'12px 20px'}}>Create Now</CustomButton>
					
				  
											   
						 </Grid>
					 
						  </Grid> :
					 <Grid container lg={6} xs={10} sx={{marginTop:mobile?'18px':'46px',display:'flex',justifyContent:'space-between',marginBottom:mobile?'18px':'0px'}}>
					 <Grid item lg={6} >
					 
				 
											  
				
					   
					 </Grid>
					 <Grid item lg={9} >
					
					   <CustomButton onClick={Get_Started} sx={{color:'#fff',textTransform:'none',fontSize:'16px',fontWeight:'500',background: '#F78',borderRadius:'8px',padding:'12px 20px'}}>Get Started</CustomButton>
					 
					 </Grid>
					</Grid>} 
   
  </Grid>
</Grid>
    </Grid>
        {/* <Footer/> */}
    </>
  )
}

export default Landingpage
