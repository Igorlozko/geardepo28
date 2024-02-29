import { Box, Drawer, IconButton, Typography, styled } from '@mui/material'
import {ChevronLeft, ChevronLeftRounded, ChevronRight} from '@mui/icons-material'
import React from 'react'
import PriceSlider from './PriceSlider'
import { useValue } from '../../context/ContextProvider'

const DrawerHeader = styled('div')(({theme})=>({
  display:'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding:theme.spacing(0,1),
  ...theme.mixins.toolbar,
}))

const FilterSearch = ({isOpen, setIsOpen}) => {

  const {searchRef} = useValue();

  return (
    <Drawer
      variant='persistent'
      hideBackdrop={true}
      open={isOpen}
      //anchor="top" // Set anchor to top
    >
      <DrawerHeader>
        <Typography>Search and Filter</Typography>
        <IconButton onClick={()=> setIsOpen(false)}> {/*action of the button when arrow is clicked closes the drawer*/}
          <ChevronLeftRounded fontSize='large'/> {/*direction of the arrow*/}
        </IconButton>
      </DrawerHeader>  
      <Box
        sx ={{width:240, p:5}}
      >
        <Box ref ={searchRef}>

        </Box>
        <PriceSlider/>
      </Box>                                                                      
    </Drawer>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  )
}                                                                                                                                                                                                                           
                                                                                                                                        
export default FilterSearch;                                                                                                                        