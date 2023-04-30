// SWR
import { SWRConfig } from 'swr';
// Material UI
import { CssBaseline, ThemeProvider } from '@mui/material';
// Context
import { UIProvider } from '@/context';
// Themes
import { lightTheme } from '@/themes';

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: ( resource, init ) => fetch( resource, init ).then( res => res.json() )
      }}
    >
      <UIProvider>
        <ThemeProvider theme={ lightTheme }>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </SWRConfig>
  );
}
