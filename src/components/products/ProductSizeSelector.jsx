import { Box, Button } from '@mui/material';


export const ProductSizeSelector = ({ selectedSizes, sizes }) => {
  return (
    <Box>
      {
        sizes.map( size => (
          <Button
            key={ size }
            size='small'
          color={ selectedSizes === size ? 'secondary' : 'primary' }
          >
            { size }
          </Button>
        ))
      }
    </Box>
  );
}
