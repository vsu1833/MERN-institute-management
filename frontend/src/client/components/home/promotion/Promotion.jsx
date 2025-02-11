/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

// ICONS
const Item = styled(Paper)(() => ({
  backgroundColor: "transparent",
  color: "#fff",
  boxShadow: "none",
  textTransform: "uppercase"


}));

export default function Promotion() {

  return (
    <>
      <Box sx={{ background: 'rgb(85, 87, 88)', padding: "10px", paddingTop: "50px!important" }}>
        <Grid container spacing={0}>
        <Grid  size={{sm:6, md: 6,xs:12}}>
            <Item>
              <Box component={"div"} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1 className='text-beautify'>Our Business Is Build On Relationship</h1>
              </Box>
            </Item>
          </Grid>
          <Grid size={{sm:6, md: 6,xs:12}}>
            <Item>
                 <Typography style={{textTransform:"capitalize"}} variant='p' className='text-beautify'>After all, isn't that what filmmaking is all about? A collaborative spririt, and a partnership
                        built on mutual respect, does not just make things easier -- ist yields stronger results. That's why we strive
                    to cultivate relationships with each and every one of the thousands of extras, actoors,, and performers who work 
                    with us. Rejecting the assembly-line approach, and taking the time to get to know people,
                    allows us to find exactly the right fit for any kind of role.
                 </Typography>
            </Item>
          </Grid>
          <Grid size={{xs:12}}>
            <Item>
            <Box component={"div"} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1 className='text-beautify'>Casting Calls</h1>
              </Box>
            </Item>
          </Grid>
          <Grid size={12}>
            <Item>
                 <Typography sx={{textTransform:"capitalize"}} variant='p' className='text-beautify'>If you'd like to be in one of our productions, look no further.
                    Make sure to regularly check here for our most recent casting calls, information about how to aply, and other news.
                 </Typography>
            </Item>
          </Grid>
          <Grid size={12}>
            <Item>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center" }}>
                <Link  to={'/'}>
                  <Button className='button-beautify button-beautify-one' sx={{ my: 2, color: 'white',width:"230px!important" }} >
                    <Box sx={{ display: 'flex', flexDirection: 'row' }} className="button-box">
                      Casting Calls
                    </Box>
                  </Button>
                </Link>
              </Box>
            </Item>
          </Grid>

         
        </Grid>
      </Box>
    </>
  )
}