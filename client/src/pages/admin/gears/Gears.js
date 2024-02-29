import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import { getUsers } from '../../../actions/user';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import GearsActions from './GearsActions';
import { getGears } from '../../../actions/gear';
import isAdmin from '../utils/isAdmin';

const Gears = ({ setSelectedLink, link }) => {
  const {
    state: { gears, currentUser },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (gears.length === 0) getGears(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'images',
        headerName: 'Photo',
        width: 270,
        renderCell: (params) => <Avatar src={params.row.images[0]} variant='rounded' />,
        sortable: false,
        filterable: false,
      },
      { field: 'price', headerName: 'Price', width: 70, renderCell:(params)=>'€'+params.row.price },
      { field: 'title', headerName: 'Title', width: 170 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'lng', headerName: 'Longitute', width: 100 },
      { field: 'lat', headerName: 'Latitude', width: 100 },
      {
        field: 'uName',
        headerName: 'Added by',
        width: 80,
        renderCell: params=>{
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto}/>
          </Tooltip>
        }
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 200,
        renderCell: params => (
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto}/>
          </Tooltip>
        )
      },
      { field: '_id', hide:true },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width:150,
        renderCell: (params) => (
          <GearsActions {...{ params}} />
        ),
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: 800,
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Manage Gear
      </Typography>
      <DataGrid
        columns={columns}
        rows={isAdmin(currentUser) ? gears : gears.filter(gear => gear.uid === currentUser.id )} // if admin or editor show whole rooms if basic just their own rooms
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default Gears;