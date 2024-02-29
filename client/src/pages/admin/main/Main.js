import React, { useEffect } from 'react';
import {Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from '@mui/material';
import { Group, MapsHomeWork } from '@mui/icons-material';
import {useValue} from '../../../context/ContextProvider';
import { getGears } from '../../../actions/gear';
import { getUsers } from '../../../actions/user';
import moment from 'moment';
import PieGearCost from './PieGearCost';
import AreaGearsUsers from './AreaGearsUsers';

const Main = ({setSelectedLink, link}) => {

  const {state:{gears, users,currentUser}, dispatch} = useValue();

    useEffect(()=>{
        setSelectedLink(link);
        if(gears.length === 0) getGears(dispatch)
        if(users.length === 0) getUsers(dispatch, currentUser)
    },[]);

  return (
    <Box
      sx={{
        display:{sx:'flex', md:'grid'},
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows:'minmax(100px, auto)',
        gap:3,
        textAlignL:'center',
        flexDirection:'column'
      }}
    >
      {/*Number of Users*/ }
      <Paper
        //elevation={3} // shadow
        sx={{p:3}}
      >
        <Typography variant='h4'>
          Total Users
        </Typography>
        <Box
          sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <Group sx={{
            height:100,
            width:100,
            opacity:0.3,
            mr:1
          }}/>
          <Typography variant='h4'>{users.length}</Typography>
        </Box>
      </Paper>
      {/*Number of Rooms*/ }
      <Paper
        //elevation={3} // shadow
        sx={{p:3}}
      >
        <Typography variant='h4'>
          Total Gear
        </Typography>
        <Box
          sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <MapsHomeWork sx={{
            height:100,
            width:100,
            opacity:0.3,
            mr:1
          }}/>
          <Typography variant='h4'>{gears.length}</Typography>
        </Box>
      </Paper>
      <Paper sx={{p:2, gridColumn:3, gridRow:'1/4'}}>
        <Box>
          <Typography>Recently added users</Typography>
          <List>
            {users.slice(0,4).map((user,i)=>(
              <Box key={user._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt={user?.name} src={user?.photoURL}/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user?.name}
                      secondary={`Time Created: ${moment(user?.createdAt).format('YYYY-MM-DD H:mm:ss')}`}
                    />
                  </ListItem>
                  {i !== 3 && <Divider variant='inset'/>}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{mt:3, mb:3, opacity:0.7}}/>
        <Box>
          <Typography>Recently added gear</Typography>
          <List>
            {gears.slice(0,4).map((gear,i)=>(
              <Box key={gear._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt={gear?.name} src={gear?.images[0]} variant='rounded'/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={gear?.name}
                      secondary={`Time Created: ${moment(gear?.createdAt).fromNow()}`}
                    />
                  </ListItem>
                  {i !== 3 && <Divider variant='inset'/>}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper sx={{p:2, gridColumn:'1/3'}}>
            <PieGearCost/>
      </Paper>
      <Paper sx={{p:2, gridColumn:'1/3'}}>
            <AreaGearsUsers/>
      </Paper>
    </Box>
  )
}

export default Main