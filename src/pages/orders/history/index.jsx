// Next.js
import NextLink from 'next/link';
// Next Auth
import { getSession } from 'next-auth/react';
// Material UI
import {
  Chip,
  Grid,
  Link,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// Database
import { dbOrders } from '@/database';
// Layouts
import { ShopLayout } from '@/components/layouts';


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: ( params ) => {
      return (
        params.row.paid
          ? <Chip color='success' label='Pagada' variant='outlined' />
          : <Chip color='error' label='Pendiente de pago' variant='outlined' />
      )
    }
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 300,
    sortable: false,
    renderCell: ( params ) => {
      return (
        <NextLink
          href={ `/orders/${ params.row.orderId }` }
          passHref
          legacyBehavior
        >
          <Link
            underline='always'
            color={ 'rgba(0,0,0)' }
          >
            Ver detalle
          </Link>
        </NextLink>
      )
    }
  }
];

export const HistoryPage = ({ orders }) => {
  const rows = orders.orders.map( ( order, index ) => ({
    id: index + 1,
    paid: order.isPaid,
    fullname: `${ order.shippingAddress.firstName } ${ order.shippingAddress.lastName}`,
    orderId: order._id
  }));

  return (
    <ShopLayout
      title='Historial de ordenes'
      pageDescription='Historial de ordenes del cliente'
    >
      <Typography
        variant='h1'
        component='h1'
      >
        Historial de ordenes
      </Typography>

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
    </ShopLayout>
  );
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if ( !session ) return {
    redirect: {
      destination: '/auth/login?page=/orders/history',
      permanent: false
    }
  }

  const orders = await dbOrders.getOrdersByUser( session.user._id );

  return {
    props: {
      orders
    }
  }
}

export default HistoryPage;
