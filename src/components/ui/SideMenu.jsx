// React
import { useContext, useState } from 'react';
// Next.js
import { useRouter } from 'next/router';
// Material UI
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
// Material Icons
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined
} from '@mui/icons-material';
// Context
import { AuthContext, UIContext } from '@/context';


export const SideMenu = () => {
  const router = useRouter();
  const [ searchTerm, setSearchTerm ] = useState( '' );
  const { isMenuOpen, toggleSideMenu } = useContext( UIContext );
  const { isLoggedIn, user = { role: '' }, logoutUser } = useContext( AuthContext );

  const navigateTo = ( url ) => {
    toggleSideMenu();
    router.push( url );
  }

  const onSearchTerm = () => {
    if ( searchTerm.trim().length === 0 ) return;
    navigateTo( `/search/${ searchTerm }` )
  }


  return (
    <Drawer
      open={ isMenuOpen }
      onClose={ toggleSideMenu }
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={ searchTerm }
              onChange={ ( e ) => setSearchTerm( e.target.value ) }
              onKeyPress={ ( e ) => e.key === 'Enter' ? onSearchTerm() : null }
              type='text'
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={ onSearchTerm }
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem
            button
            onClick={ () => navigateTo( '/category/men' ) }
            sx={{
              display: { xs: '', sm: 'none' } 
            }}
          >
            <ListItemIcon>
              <MaleOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Hombres'} />
          </ListItem>

          <ListItem
            button
            onClick={ () => navigateTo( '/category/women' ) }
            sx={{
              display: { xs: '', sm: 'none' } 
            }}
          >
            <ListItemIcon>
              <FemaleOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Mujeres'} />
          </ListItem>

          <ListItem
            button
            onClick={ () => navigateTo( '/category/kid' ) }
            sx={{
              display: { xs: '', sm: 'none' } 
            }}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Niños'} />
          </ListItem>

          <Divider />
          {
            isLoggedIn && (
              <>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircleOutlined/>
                  </ListItemIcon>
                  <ListItemText primary={'Perfil'} />
                </ListItem>

                <ListItem
                  button
                onClick={ () => navigateTo( '/orders/history' ) }
                >
                  <ListItemIcon>
                    <ConfirmationNumberOutlined/>
                  </ListItemIcon>
                  <ListItemText primary={'Mis Ordenes'} />
                </ListItem>
              </>
            )
          }

          {
            isLoggedIn
              ? (
                <ListItem
                  button
                  onClick={ logoutUser }
                >
                  <ListItemIcon>
                    <LoginOutlined/>
                  </ListItemIcon>
                  <ListItemText primary={'Salir'} />
                </ListItem>

              )
              : (
                <ListItem
                  button
                  onClick={ () => navigateTo( `/auth/login?page=${ router.asPath }` ) }
                >
                  <ListItemIcon>
                    <VpnKeyOutlined/>
                  </ListItemIcon>
                  <ListItemText primary={'Ingresar'} />
                </ListItem>
              )
          }

          {/* Admin */}
          {
            ( user.role === 'ADMIN_ROLE' && isLoggedIn ) && (
              <>
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItem
                  button
                onClick={ () => navigateTo( '/admin' ) }
                >
                  <ListItemIcon>
                    <DashboardOutlined />
                  </ListItemIcon>
                  <ListItemText primary={ 'Dashoboard' } />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <CategoryOutlined/>
                  </ListItemIcon>
                  <ListItemText primary={'Productos'} />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined/>
                  </ListItemIcon>
                  <ListItemText primary={'Ordenes'} />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <AdminPanelSettings/>
                  </ListItemIcon>
                  <ListItemText primary={'Usuarios'} />
                </ListItem>
              </>
            )
          }
        </List>
      </Box>
    </Drawer>
  );
}
