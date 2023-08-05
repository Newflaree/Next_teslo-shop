// Material UI
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography
} from '@mui/material';
// Material Icons
import { AirplaneTicketOutlined, CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
// Components
import { CartList, CartOrderSumary } from '@/components';
// Database
import { dbOrders } from '@/database';
// Layouts
import { AdminLayout } from '@/components/layouts';


const OrderByIdPage = ({ currentOrder }) => {
  const {
    _id,
    isPaid,
    orderItems,
    numberOfItems,
    shippingAddress
  } = currentOrder;

  return (
    <AdminLayout
      title='Resumen de la Orden'
      subTitle={ `OrdenID: ${ _id }` }
    icon={ <AirplaneTicketOutlined /> }
    >
      {
        isPaid 
          ? (
            <Chip
              label='Pagada con éxito'
              variant='outlined'
              color='success'
              icon={ <CreditScoreOutlined /> }
              sx={{
                my: 2
              }}
            />
          )
          : (
            <Chip
              label='Pendiente de pago'
              variant='outlined'
              color='error'
              icon={ <CreditCardOutlined /> }
              sx={{
                my: 2
              }}
            />
          )
      }

      <Grid
        container
        mt={ 4 }
      >
        <Grid
          item
          xs={ 12 }
          sm={ 7 }
        >
          <CartList
            products={ orderItems }
          />
        </Grid>
        <Grid
          item
          xs={ 12 }
          sm={ 5 }
        >
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ({ numberOfItems } { numberOfItems > 1 ? 'productos' : 'producto' })</Typography>
              <Divider sx={{ my: 1 }} />

              <Box
                display='flex'
                justifyContent='space-between'
              >
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
              </Box>

              <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
              <Typography>{ shippingAddress.address } { shippingAddress.address2 && `, ${ shippingAddress.address2 }` }</Typography>
              <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
              <Typography>{ shippingAddress.country }</Typography>
              <Typography>{ shippingAddress.phone }</Typography>

              <Divider sx={{ my: 1 }} />


              <CartOrderSumary
                orderValues={{
                  numberOfItems: currentOrder.numberOfItems,
                  subTotal: currentOrder.subtotal,
                  total: currentOrder.total,
                  tax: currentOrder.tax
                }}
              />

              <Box
                display='flex'
                flexDirection='column'
                sx={{ mt: 3 }}
              >
                {
                  isPaid 
                    ? (
                      <Chip
                        label='Pagada con éxito'
                        variant='outlined'
                        color='success'
                        icon={ <CreditScoreOutlined /> }
                        sx={{
                          my: 2,
                          flex: 1
                        }}
                      />
                    )
                    : (
                      <Chip
                        label='Pendiente de pago'
                        variant='outlined'
                        color='error'
                        icon={ <CreditCardOutlined /> }
                        sx={{
                          my: 2,
                          flex: 1
                        }}
                      />
                    )
                }
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

export const getServerSideProps = async ({ req, query }) => {
  const { id = '' } = query;

  const currentOrder = await dbOrders.getOrderById( id.toString() );

  if ( !currentOrder ) return {
    redirect: {
      destination: '/admin/orders',
      permanent: false
    }
  }

  return {
    props: {
      currentOrder: currentOrder.order
    },
  }
}

export default OrderByIdPage;
