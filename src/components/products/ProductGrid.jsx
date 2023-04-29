// Material UI
import { Grid } from '@mui/material';
// Components
import { ProductCard } from './';



export const ProductGrid = ({ products }) => {
  return (
    <Grid
      container
      spacing={ 4 }
    >
      {
        products.map( product => (
          <ProductCard
            key={ product.slug }
            product={ product }
          />
        ))
      }
    </Grid>
  );
}
