// SWR
import { SWRConfig } from 'swr';
// Material UI
import { CssBaseline, ThemeProvider } from '@mui/material';
// Colors
import 'colors';
// Context
import { CartProvider, UIProvider } from '@/context';
// Themes
import { lightTheme } from '@/themes';
// Styles
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: ( resource, init ) => fetch( resource, init ).then( res => res.json() )
      }}
    >
      <CartProvider>
        <UIProvider>
          <ThemeProvider theme={ lightTheme }>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </CartProvider>
    </SWRConfig>
  );
}
