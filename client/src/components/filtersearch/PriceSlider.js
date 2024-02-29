import { Box, Slider, Typography } from '@mui/material'
import React from 'react'
import { useValue } from '../../context/ContextProvider'



const marks=[
    {value:0, label: '€0'},
    {value:250, label: '€250'},
    {value:500, label: '€500'},
]

const PriceSlider = () => {

const {state:{priceFilter}, dispatch} = useValue();

  return (
    <Box
        sx={{mt:5}}
    >
        <Typography>Price : {'€' + priceFilter}</Typography>
        <Slider 
            min={0}
            max={500}
            defaultValue={100}
            valueLabelDisplay='auto'  // can see it 
            marks={marks}
            value={priceFilter}
            onChange={(e, price)=> dispatch ({type:'FILTER_PRICE', payload:price})}
        />

    </Box>
  )
}

export default PriceSlider