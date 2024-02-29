import React from 'react'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { useValue } from '../../../context/ContextProvider'
import { Cancel } from '@mui/icons-material'
import deleteFile from '../../../firebase/deleteFile'

const ImagesList = () => {
    const {state:{images, currentUser, updatedGear}, dispatch} = useValue();

    const handleDelete = async(image)=>{
        dispatch({type:'DELETE_IMAGE', payload:image});
        // stop if updated gear
        if(updatedGear)return dispatch({type:'UPDATE_DELETED_IMAGES', payload:[images]}); // pass deleted images into deleted images array
        const imageName = image?.split(`${currentUser?.id}%2F`)[1]?.split('?')[0] // delets from firebase storage
        try{
            await deleteFile(`gears/${currentUser?.id}/${imageName}`);
        }catch(error){
            console.log(error);
        }
    };
  return (
    <ImageList 
        rowHeight={200} 
        sx={{
            '&.MuiImageList-root':{
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))!important',
            },
        }}
    >
        {images.map((
            image,
            index
        )=>(
            <ImageListItem key={index} cols={1} rows={1}>
                <img src={image} alt="gears" loading='lazy' style={{height:'100%'}}/>
                <ImageListItemBar
                    position='top'
                    sx={{
                        background:'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%,rgba(0,0,0,0)100%,)',
                    }}
                    actionIcon={
                        <IconButton
                            sx={{color:'white'}}
                            onClick={()=>handleDelete(image)} // icon button which triggers the deletion of the image
                        >
                            <Cancel/>
                        </IconButton>
                    }
                >
                </ImageListItemBar>
            </ImageListItem>
        ))}
    </ImageList>
  )
}

export default ImagesList