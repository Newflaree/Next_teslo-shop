// Next.js
import { Inter } from 'next/font/google'
// Material UI
import {
  Typography
} from '@mui/material';
// Components
import { ProductGrid } from '@/components/products';
// Layouts
import { ShopLayout } from '@/components/layouts';


import useSWR from 'swr';
const fetcher = ( ...args ) => fetch( ...args ).then( res => res.json() );

export default function HomePage() {
  const { data, error } = useSWR( '/api/products', fetcher );

  if ( error ) return <div>Failed to load</div>
  if ( !data ) return <div>Loading...</div>
  const products = data.totalResponseProducts;

  return (
    <ShopLayout
      title={ 'TesloShop - Home' }
      pageDescription={ 'Encuentra los mejores productos de Teslo aquí' }
    >
      <Typography
        variant='h1'
        component='h1'
      >
        Tienda
      </Typography>

      <Typography
        variant='h2'
        sx={{
          mb: 1
        }}
      >
        Todos los productos
      </Typography>

      <ProductGrid products={ products } />
    </ShopLayout>
  );
}
