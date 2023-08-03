// React
import { useEffect, useState } from 'react';
// SWR
import useSWR from 'swr';
// Material UI
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// Material Icons
import { PeopleOutlined } from '@mui/icons-material';
// Api
import { tesloApi } from '@/api';
// Layouts
import { AdminLayout } from '@/components/layouts';


const UsersPage = () => {
  const { data, error } = useSWR('/api/admin/users');
  const [ users, setUsers ] = useState([]);

  useEffect( () => {
    if ( data ) {
      setUsers( data.users );
    }
  }, [ data ] );

  if ( !data && !error ) return <></>

  const onRoleUpdated = async ( userId = '', newRole = '' ) => {
    const previousUsers = users.map( user =>  ({ ...user }));
    const updatedUsers = users.map( user => ({
      ...user,
      role: userId === user._id ? newRole : user.role
    }));

    setUsers( updatedUsers )

    try {
      await tesloApi.put( '/admin/users', { userId, role: newRole } )

    } catch ( error ) {
      setUsers( previousUsers );
      console.log( error );
      alert( 'No se puedo actualizar el rol del usuario' )
    }
  }

  const columns = [
    { 
      field: 'email',
      headerName: 'Correo',
      width: 250
    },
    { 
      field: 'name',
      headerName: 'Nombre completo',
      width: 300
    },
    { 
      field: 'role',
      headerName: 'Rol',
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Select
            value={ row.role }
            label='Rol'
            onChange={ ({ target }) => onRoleUpdated( row.id, target.value ) }
            sx={{
              width: '300px'
            }}
          >
            <MenuItem value='ADMIN_ROLE'>Admin</MenuItem>
            <MenuItem value='CLIENT_ROLE'>Client</MenuItem>
          </Select>
        )
      },
    }
  ];

  const rows = users.map( user => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role
  }));

  return (
    <AdminLayout
      title=' Usuarios'
      subTitle='Mantenimiento de usuarios'
      icon={ <PeopleOutlined /> }
    >
      <Grid
        container
        className='fadeIn'
      >
        <Grid
          item
          xs={ 12 }
          sx={{
            height: 650,
            width: '100%'
          }}
        >
          <DataGrid
            rows={ rows }
            columns={ columns }
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

export default UsersPage;
