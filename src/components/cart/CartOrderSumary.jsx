// React
import { useContext } from 'react';
// Material UI
import { Grid, Typography } from '@mui/material';
// Context
import { CartContext } from '@/context';
// Utils
import { currency } from '@/utils';


export const CartOrderSumary = ({ orderValues }) => {
  const { numberOfItems, subTotal, tax, total } = useContext( CartContext );

  const summaryValues = !orderValues
    ? { numberOfItems, subTotal, tax, total }
    : orderValues;


  return (
    <Grid
      container
    >
      <Grid
        item
        xs={ 6 }
      >
        <Typography>Nº Productos</Typography>
      </Grid>
      <Grid
        item
        xs={ 6 }
        display='flex'
        justifyContent='end'
      >
        <Typography>
          { summaryValues.numberOfItems } { summaryValues.numberOfItems > 1 ? 'productos' : 'producto' }
        </Typography>
      </Grid>

      <Grid
        item
        xs={ 6 }
      >
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid
        item
        xs={ 6 }
        display='flex'
        justifyContent='end'
      >
        <Typography>
          { currency.format( summaryValues.subTotal ) }
        </Typography>
      </Grid>
      <Grid
        item
        xs={ 6 }
      >
        <Typography>
          Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)
        </Typography>
      </Grid>
      <Grid
        item
        xs={ 6 }
        display='flex'
        justifyContent='end'
      >
        <Typography>
          { currency.format( summaryValues.tax ) }
        </Typography>
      </Grid>
      <Grid
        item
        xs={ 6 }
        sx={{
          mt: 2
        }}
      >
        <Typography variant='subtitle1'>Total: </Typography>
      </Grid>
      <Grid
        item
        xs={ 6 }
        sx={{
          mt: 2
        }}
        display='flex'
        justifyContent='end'
      >
        <Typography variant='subtitle1'>
          { currency.format( summaryValues.total ) }
        </Typography>
      </Grid>
    </Grid>
  );
}
