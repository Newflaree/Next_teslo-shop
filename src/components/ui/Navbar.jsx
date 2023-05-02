// React
import { useContext, useState } from 'react';
// Next.js
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// Material UI
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography
} from '@mui/material';
// Material Icons
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material';
// Context
import { UIContext } from '@/context';


export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext( UIContext );
  const [ searchTerm, setSearchTerm ] = useState( '' );
  const [ isSearchVisible, setIsSearchVisible ] = useState( false );

  const onSearchTerm = () => {
    if ( searchTerm.trim().length === 0 ) return;

    push( `/search/${ searchTerm }` );
  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink
          href='/'
          passHref
          legacyBehavior
        >
          <Link
            display='flex'
            alignItems='center'
            color='black'
          >
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}> Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={ 1 } />

        <Box
          className='fadeIn'
          sx={{
            display: isSearchVisible 
              ? 'none' 
              : {
                xs: 'none',
                sm: 'block'
              }
          }}
        >
          <NextLink
            href='/category/men'
            passHref
            legacyBehavior
          >
            <Link>
              <Button
                color={ asPath === '/category/men' ? 'primary' : 'info' }
              >
                Hombres
            </Button>
            </Link>
          </NextLink>
          <NextLink
            href='/category/women'
            passHref
            legacyBehavior
          >
            <Link>
              <Button
                color={ asPath === '/category/women' ? 'primary' : 'info' }
              >
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink
            href='/category/kid'
            passHref
            legacyBehavior
          >
            <Link>
              <Button
                color={ asPath === '/category/kid' ? 'primary' : 'info' }
              >
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={ 1 } />

        { /* Desktop Screen */ }
        {
          isSearchVisible
            ? (
              <Input
                onChange={ ( e ) => setSearchTerm( e.target.value ) }
                onKeyPress={ ( e ) => e.key === 'Enter' ? onSearchTerm() : null }
                className='fadeIn'
                autoFocus
                value={ searchTerm }
                type='text'
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={ () => {
                        onSearchTerm
                        setIsSearchVisible( false )
                      }}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            : (
              <IconButton
                onClick={ () => setIsSearchVisible( true ) }
                className='fadeIn'
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'flex'
                  }
                }}
              >
                <SearchOutlined />
              </IconButton>
            )
        }

        { /* Mobile Screen */ }
        <IconButton
          onClick={ toggleSideMenu }
          sx={{
            display: {
              xs: 'flex',
              sm: 'none'
            }
          }}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink
          href='/cart'
          passHref
          legacyBehavior
        >
          <Link>
            <IconButton>
              <Badge
                badgeContent={ 2 }
                color='secondary'
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button
          onClick={ toggleSideMenu }
        >
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
}
