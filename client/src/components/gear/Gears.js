import { Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Tooltip, Typography } from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { useEffect, useState } from 'react';
import { StarBorder } from '@mui/icons-material';
import GearPage from './GearPage';

const Gears = () => {
  const { state: { filteredGears, gear }, dispatch } = useValue();

  // Define the maximum number of characters for the description
  const maxDescriptionLength = 100;

  // Function to handle opening the GearPage
  const handleGearClick = (selectedGear) => {
    console.log("Clicked gear ID:", selectedGear._id);
    dispatch({
      type: 'UPDATE_GEAR',
      payload: selectedGear
    });
  };

  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important ',
        }}
      >
        {filteredGears.map((gear) => (
          <Card key={gear._id}>
            <ImageListItem sx={{ height: '100% !important' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={gear.images[0]}
                  alt={gear.title}
                  loading="lazy"
                  style={{ cursor: 'pointer', width: '100%', height: '200px', objectFit: 'cover' }}
                  onClick={() => handleGearClick(gear)} // Open GearPage when image is clicked
                />
                <ImageListItemBar
                  sx={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 0%)',
                  }}
                 /*title={gear.price === 0 ? 'Free Rental' : '€' + gear.price} */
                  actionIcon={
                    <Tooltip title={gear.uName} sx={{ mr: '5px' }}>
                      <Avatar src={gear.uPhoto} />
                    </Tooltip>
                  }
                  position="top"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '8px' }}>
                <div onClick={() => handleGearClick(gear)} style={{ cursor: 'pointer' }}>
                  <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold' }}>{gear.title}</Typography>
                </div>
                <div>
                  <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold' }}>{gear.price === 0 ? 'Free Rental' : '€' + gear.price}</Typography>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '8px' }}>
                <Typography variant="body2" component="span" onClick={() => handleGearClick(gear)} style={{ cursor: 'pointer', color: 'gray' }}>
                  {/* Display a shortened description */}
                  {gear.description.length > maxDescriptionLength ? `${gear.description.substring(0, maxDescriptionLength)}...` : gear.description}
                </Typography>
              </div>
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Gears;
