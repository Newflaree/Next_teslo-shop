// SWR
import useSWR from 'swr';
// Material UI
import { Chip, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// Material Icons
import { ConfirmationNumberOutlined } from '@mui/icons-material';
// Layouts
import { AdminLayout } from '@/components/layouts';


const columns = [
  {
    field: 'id',
    headerName: 'Orden ID',
    width: 250
  },
  {
    field: 'email',
    headerName: 'Correo',
    width: 250
  },
  {
    field: 'name',
    headerName: 'Nombre completo',
    width: 300
  },
  {
    field: 'total',
    headerName: 'Monto total',
    width: 150
  },
  {
    field: 'isPaid',
    headerName: 'Pagada',
    width: 150,
    renderCell: ({ row }) => {
      return row.isPaid
        ? ( <Chip variant='outlined' label='Pagada' color='success' /> )
        : ( <Chip variant='outlined' label='Pendiente' color='error' /> )
    }
  },
  {
    field: 'nItems',
    headggerName: 'No. Productos',
    align: 'center',
    width: 100
  },
  {
    field: 'check',
    headerName: 'Ver Orden',
    renderCell: ({ row }) => {
      return (
        <a
          href={ `/admin/orders/${ row.id }` }
          target='_blank'
        >
          Ver orden
        </a>
      )
    }
  },
  {
    field: 'createdAt',
    headggerName: 'Creada en',
    width: 300
  }
];

const OrdersPage = () => {
  const { data, error } = useSWR( '/api/admin/orders' );

  if ( !data && !error ) return <></>

  const { totalOrders } = data;

  const rows= totalOrders.map( order => ({
    id: order._id,
    email: order.user.email,
    name: order.user.name,
    total: order.total,
    isPaid: order.isPaid,
    nItems: order.numberOfItems,
    createdAt: order.createdAt
  }));

  return (
    <AdminLayout
      title='Ordenes'
      subTitle='Mantenimiento de Ordenes'
      icon={ <ConfirmationNumberOutlined /> }
    >
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
    </AdminLayout>
  );
}

export default OrdersPage;
