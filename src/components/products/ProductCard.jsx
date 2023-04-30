// React
import { useMemo, useState } from 'react';
import NextLink from 'next/link';
// Material UI
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography
} from '@mui/material';


export const ProductCard = ({ product }) => {
  const [ isHovered, setIsHovered ] = useState( false );
  const [ isImageLoaded, setIsImageLoaded ] = useState( false );

  const productImage = useMemo( () => {
    return isHovered
      ? `/products/${ product.images[1] }`
      : `/products/${ product.images[0] }`
  }, [ isHovered, product.images ] );

  return (
    <Grid
      item
      xs={ 6 }
      sm={ 4 }
      onMouseEnter={ () => setIsHovered( true ) }
      onMouseLeave={ () => setIsHovered( false ) }
    >
      <Card>
        <NextLink
          href={ `/products/${ product.slug }` }
          passHref
          prefetch={ false }
          legacyBehavior
        >
          <Link>
            <CardActionArea>
              <CardMedia
              className='fadeIn'
              component='img'
              onLoad={ () => setIsImageLoaded( true ) }
              image={ productImage }
              alt={ product.title }
            />

            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box
        className='fadeIn'
        sx={{
          mt: 1,
          display: isImageLoaded ? 'block' : 'none'
        }}
      >
        <Typography fontWeight={ 700 }>{ product.title }</Typography>
        <Typography fontWeight={ 500 }>{ `$${ product.price }` }</Typography>
      </Box>
    </Grid>
  );
}
