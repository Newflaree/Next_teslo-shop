// SWR
import { SWRConfig } from 'swr';
// Material UI
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@/themes';
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: ( resource, init ) => fetch( resource, init ).then( res => res.json() )
      }}
    >
      <ThemeProvider theme={ lightTheme }>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
}
