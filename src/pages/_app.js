// Next Auth
import { SessionProvider } from 'next-auth/react';
// SWR
import { SWRConfig } from 'swr';
// Material UI
import { CssBaseline, ThemeProvider } from '@mui/material';
// Paypal
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// Colors
import 'colors';
// Context
import { AuthProvider, CartProvider, UIProvider } from '@/context';
// Themes
import { lightTheme } from '@/themes';
// Styles
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{
          'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT
        }}
      >
        <SWRConfig
          value={{
            fetcher: ( resource, init ) => fetch( resource, init ).then( res => res.json() )
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={ lightTheme }>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
