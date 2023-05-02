import { Box, Button } from '@mui/material';


export const ProductSizeSelector = ({ selectedSizes, sizes, onSelectedSize }) => {
  return (
    <Box>
      {
        sizes.map( size => (
          <Button
            key={ size }
            size='small'
            color={ selectedSizes === size ? 'primary' : 'info' }
            onClick={ () => onSelectedSize( size ) }
          >
            { size }
          </Button>
        ))
      }
    </Box>
  );
}
