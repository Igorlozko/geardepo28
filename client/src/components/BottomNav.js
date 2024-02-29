import { AddLocationAlt, GridView, LocationOn, PostAdd } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ClusterMap from './map/ClusterMap';
import Gears from './gear/Gears';
import AddGear from './addGear/AddGear';
import Protected from './protected/Protected';
import { useValue } from '../context/ContextProvider';

const BottomNav = () => {
    const {state:{section}, dispatch} = useValue();
    const ref = useRef();
    useEffect(()=>{
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [section]);

    // styling for the map portion 
    


  return (
    <Box ref={ref}>
        {{

            0: <ClusterMap/>,
            1: <Gears/>,
            2: <Protected> 
                    <AddGear />
                </Protected>,
        }[section]}
        <Paper
            elevation={3}
            sx={{position:'fixed',boxShadow: 'none', bottom:0, left:0, right:0, zIndex:2}}
        >
            <BottomNavigation
            showLabels
            value={section}
            onChange={(e, newValue) => dispatch({type:'UPDATE_SECTION',payload:newValue})}
            >
                <BottomNavigationAction
                    label ='Map'
                    icon={<LocationOn />}
                />
                <BottomNavigationAction
                    label ='Gear'
                    icon={<GridView/>}
                />
                <BottomNavigationAction
                    label ='Add'
                    icon={<PostAdd/>}
                />
            </BottomNavigation>
        </Paper>
    </Box>
  )
}

export default BottomNav;