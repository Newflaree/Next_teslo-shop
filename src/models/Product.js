import mongoose, { Schema, model, models } from 'mongoose';


const ProductSchema = new Schema({
  description: {
    type: String,
    required: true,
    default: ''
  },
  images: [{
    type: String,
  }],
  inStock: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  sizes: [{
    type: String,
    enum: {
      values: [ 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL' ],
      message: '{VALEU} no es un tamaño válido'
    },
    default: 'M'
  }],
  slug: {
    type: String,
    required: true,
    unique: true,
    slug: ''
  },
  tags: [{
    type: String
  }],
  title: {
    type: String,
    required: true,
    default: ''
  },
  type: {
    type: String,
    enum: {
      values: [ 'shirts', 'pants', 'hoodies', 'hats' ],
      message: '{VALEU} no es un tipo válido'
    },
    default: 'shirts'
  },
  gender: {
    type: String,
    enum: {
      values: [ 'men', 'women', 'kid', 'unisex' ],
      message: '{VALEU} no es un genero válido'
    },
    default: 'unisex'
  }
}, {
  timestamps: true
});

ProductSchema.index({
  title: 'text',
  tags: 'text'
});


// TODO: Crear indice de Mongo
const ProductModel = models.Product || model( 'Product',  ProductSchema )

export default ProductModel;
