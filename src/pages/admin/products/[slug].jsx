// React Hook Form
import { useForm } from 'react-hook-form';
// Material UI
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio, 
  RadioGroup, 
  TextField
} from '@mui/material';
// Material Icons
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined
} from '@mui/icons-material';
// Layouts
import { AdminLayout } from '@/components/layouts';
// Database
import { dbProducts } from '@/database';


const validTypes  = [ 'shirts', 'pants', 'hoodies', 'hats' ];
const validGender = [ 'men', 'women', 'kid', 'unisex' ];
const validSizes = [ 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL' ];


const ProductAdminPage = ({ product }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: product
  });

  const onDeleteTag = ( tag ) => {
    // Write your code here
  }

  const onSubmit = ( formData ) => {
    // Write your code here
    console.log( formData );
  }

  return (
    <AdminLayout
      title={'Producto'} 
      subTitle={`Editando: ${ product.title }`}
      icon={ <DriveFileRenameOutline /> }
    >
      <form onSubmit={ handleSubmit( onSubmit ) }>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button 
            color="secondary"
            startIcon={ <SaveOutlined /> }
            sx={{ width: '150px' }}
            type="submit"
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={ 6 }>
            <TextField
              label="Título"
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              { ...register('title', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              })}
              error={ !!errors.title }
              helperText={ errors.title?.message }
            />

            <TextField
              label="Descripción"
              variant="filled"
              fullWidth 
              multiline
              sx={{ mb: 1 }}
              { ...register('description', {
                required: 'Este campo es requerido',
              })}
              error={ !!errors.description }
              helperText={ errors.description?.message }
            />

            <TextField
              label="Inventario"
              type='number'
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              { ...register('inStock', {
                required: 'Este campo es requerido',
                min: { value: 0, message: 'Mínimo de valor 0' }
              })}
              error={ !!errors.inStock }
              helperText={ errors.inStock?.message }
            />

            <TextField
              label="Precio"
              type='number'
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              { ...register('price', {
                required: 'Este campo es requerido',
                min: { value: 0, message: 'Mínimo de valor 0' }
              })}
              error={ !!errors.price }
              helperText={ errors.price?.message }
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                // value={ status }
                // onChange={ onStatusChanged }
              >
                {
                  validTypes.map( option => (
                    <FormControlLabel 
                      key={ option }
                      value={ option }
                      control={ <Radio color='secondary' /> }
                      label={ capitalize(option) }
                    />
                  ))
                }
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                // value={ status }
                // onChange={ onStatusChanged }
              >
                {
                  validGender.map( option => (
                    <FormControlLabel 
                      key={ option }
                      value={ option }
                      control={ <Radio color='secondary' /> }
                      label={ capitalize(option) }
                    />
                  ))
                }
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
                {
                  validSizes.map(size => (
                    <FormControlLabel
                      key={ size }
                      control={ <Checkbox /> }
                      label={ size } 
                    />
                  ))
                }
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={ 6 }>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              { ...register('slug', {
                required: 'Este campo es requerido',
                validate: ( val ) => val.trim().includes( ' ' )
                  ? 'No puede tener espacios en blanco'
                  : undefined
              })}
              error={ !!errors.slug }
              helperText={ errors.slug?.message }
            />

            <TextField
              label="Etiquetas"
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
            />
                      
            <Box 
              component="ul"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
            >
              {
                product.tags.map((tag) => {
                  return (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={ () => onDeleteTag(tag)}
                      color="primary"
                      size='small'
                      sx={{ ml: 1, mt: 1}}
                    />
                  );
                })
              }
            </Box>

            <Divider sx={{ my: 2  }}/>
                      
            <Box display='flex' flexDirection="column">
              <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={ <UploadOutlined /> }
                sx={{ mb: 3 }}
              >
                Cargar imagen
              </Button>

              <Chip 
                label="Es necesario al 2 imagenes"
                color='error'
                variant='outlined'
              />

              <Grid container spacing={2}>
                {
                  product.images.map( img => (
                    <Grid item xs={4} sm={3} key={img}>
                      <Card>
                        <CardMedia 
                          component='img'
                          className='fadeIn'
                          image={ `/products/${ img }` }
                          alt={ img }
                        />
                        <CardActions>
                          <Button fullWidth color="error">
                            Borrar
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { slug = ''} = query;
  const product = await dbProducts.getProductBySlug( slug.toString() );

  if ( !product ) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      }
    }
  }

  return {
    props: {
      product
    }
  }
}


export default ProductAdminPage;
