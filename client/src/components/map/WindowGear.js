import React from 'react';
import { useValue } from '../../context/ContextProvider';
import { Card, Box, ImageListItem, ImageListItemBar } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const WindowGear = ({ popupInfo }) => {
    const { title, description, price, images } = popupInfo;
    const { dispatch } = useValue();

    return (
        <Card sx={{ width: 300, margin: 'auto', cursor:'pointer' }}> {/*size of the box/card where the image sits */} 
            <Carousel 
            autoPlay={true} indicators={true} animation="slide"
            >
                {images.map((url, index) => (
                    <Box 
                    key={index} onClick={() => dispatch({ type: 'UPDATE_GEAR', payload: popupInfo })}
                    >
                        <img
                            src={url}
                            alt={`gear-${index}`}
                            style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                ))}
            </Carousel>
            <ImageListItem>
                <ImageListItemBar
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                        zIndex: 2,
                    }}
                    title={price === 0 ? 'Free Stay' : '€' + price}
                    position="top"
                />
                <ImageListItemBar
                    title={title}
                    subtitle={price === 0 ? 'Free Stay' : '€' + price}
                   // subtitle={description.substr(0, 30) + '...'}
                    sx={{ zIndex: 2 }}
                />
            </ImageListItem>
        </Card>
    );
};

export default WindowGear;
