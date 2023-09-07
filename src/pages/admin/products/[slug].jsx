// React
import {
  useEffect,
  useRef,
  useState
} from 'react';
// Next.js
import { useRouter } from 'next/router';
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
// Api
import { tesloApi } from '@/api';
// Layouts
import { AdminLayout } from '@/components/layouts';
// Models
import { Product } from '@/models';
// Database
import { dbProducts } from '@/database';



const validTypes  = [ 'shirts', 'pants', 'hoodies', 'hats' ];
const validGender = [ 'men', 'women', 'kid', 'unisex' ];
const validSizes = [ 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL' ];


const ProductAdminPage = ({ product }) => {
  const router = useRouter();
  const fileInputRef = useRef( null );
  const [ newTagValue, setNewTagValue ] = useState( '' );
  const [ isSaving, setIsSaving ] = useState( false );

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch
  } = useForm({
    defaultValues: product
  });

  useEffect( () => {
    const subscription = watch( ( value, { name, type } ) => {
      if ( name === 'title' ) {
        const newSlug = value.title?.trim()
          .replaceAll( ' ', '_' )
          .replaceAll( "'", '' )
          .toLocaleLowerCase() || '';

        setValue( 'slug', newSlug );
      }
    });

    return () => subscription.unsubscribe();
  }, [ watch, setValue ] );

  const onChangeSizes = ( size = '' ) => {
    const currentSizes = getValues( 'sizes' ) || [];

    if ( currentSizes.includes( size ) ) {
      return setValue( 'sizes', currentSizes.filter( s => s !== size ), { shouldValidate: true } );
    }

    setValue( 'sizes', [ ...currentSizes, size ], { shouldValidate: true } );
  }

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue( '' );
    const currentTags = getValues( 'tags' );

    if ( currentTags.includes( newTag ) ) return;

    currentTags.push( newTag );
  }

  const onDeleteTag = ( tag ) => {
    const updatedTags = getValues( 'tags' ).filter( t => t !== tag );
    setValue( 'tags', updatedTags, { shouldValidate: true } );
  }
    
  const onFilesSelected = async ({ target }) => {
    if ( !target.files || target.files.length === 0 ) {
      return;
    }

    try {
      for ( const file of target.files ) {
        const formData = new FormData();
        formData.append( 'file', file );
        const { data } = await tesloApi.post( '/admin/upload', formData );
        console.log({ data });
      }
    } catch ( error ) {
      console.log({ error });
    }
  } 

  const onSubmit = async ( formData ) => {
    if ( formData.images.length < 2 ) return alert( 'Mínimo 2 imágenes' );

    setIsSaving( true );

    try {
      const { data } = await tesloApi({
        url: '/admin/products',
        method: formData._id ? 'PUT' : 'POST',
        data: formData
      })

      if ( !formData._id ) {
        // TODO: recargar el navegador
        router.replace( `/admin/products/${ formData.slug }` )
      } else {
        setIsSaving( false );
      }
    } catch ( error ) {
      console.log( error );
      setIsSaving( false );
    }
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
            disabled={ isSaving }
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
                value={ getValues( 'type' ) }
                onChange={ ({ target }) => setValue( 'type', target?.value, { shouldValidate: true } ) }
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
                value={ getValues( 'gender' ) }
                onChange={ ({ target }) => setValue( 'gender', target?.value, { shouldValidate: true } ) }
                //{ ...register( 'gender' )}
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
                      control={
                        <Checkbox checked={ getValues( 'sizes' ).includes( size ) } /> 
                      }
                      label={ size } 
                      onChange={ () => onChangeSizes( size ) }
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
              value={ newTagValue }
              onChange={ ({ target }) => setNewTagValue( target.value ) }
              onKeyUp={ ({ code }) => code === 'Space' ? onNewTag() : undefined }
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
                getValues( 'tags' ).map((tag) => {
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
                onClick={ () => fileInputRef.current?.click() }
              >
                Cargar imagen
              </Button>

              <input
                ref={ fileInputRef }
                type='file'
                multiple
                accept='image/png, image/gif, image/jpeg'
                style={{
                  display: 'none'
                }}
                onChange={ onFilesSelected }
              />

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

  let product;

  if ( slug === 'new' ) {
    // TODO: Crear un producto
    const tempProduct = JSON.parse( JSON.stringify( new Product() ) );
    delete tempProduct._id;
    tempProduct.images = [ 'img1.jpg', 'img2.jpg' ];

    product = tempProduct;

  } else {
    product = await dbProducts.getProductBySlug( slug.toString() );
  }

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
