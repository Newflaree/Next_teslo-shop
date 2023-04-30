// React
import { useContext } from 'react';
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
  Link,
  Toolbar,
  Typography
} from '@mui/material';
// Material Icons
import {
  SearchOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material';
// Context
import { UIContext } from '@/context';


export const Navbar = () => {
  const { toggleSideMenu } = useContext( UIContext );
  const { asPath } = useRouter();

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
          sx={{
            display: { xs: 'none', sm: 'block' }
          }}
        >
          <NextLink
            href='/category/men'
            passHref
            legacyBehavior
          >
            <Link>
              <Button
                color={ asPath === '/category/men' ? 'info' : 'primary' }
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
                color={ asPath === '/category/women' ? 'info' : 'primary' }
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
                color={ asPath === '/category/kid' ? 'info' : 'primary' }
              >
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={ 1 } />

        <IconButton>
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
