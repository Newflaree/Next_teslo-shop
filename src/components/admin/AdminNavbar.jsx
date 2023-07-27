// React
import { useContext } from 'react';
// Next.js
import NextLink from 'next/link';
// Material UI
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography
} from '@mui/material';
// Context
import { UIContext } from '@/context';


export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext( UIContext );

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

        { /* Desktop Screen */ }
        { /* Mobile Screen */ }
        <Button
          variant='outlined'
          onClick={ toggleSideMenu }
        >
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
}
