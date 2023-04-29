import mongoose, { Schema, model, Model } from 'mongoose';


const ProductSchema = new Schema({
  description: {
    type: String,
    required: true
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
    }
  }],
  slug: {
    type: String,
    required: true,
    unique: true
  },
  tags: [{
    type: String
  }],
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: {
      values: [ 'shirts', 'pants', 'hoodies', 'hats' ],
      message: '{VALEU} no es un tipo válido'
    }
  },
  gender: {
    type: String,
    enum: {
      values: [ 'men', 'women', 'kid', 'unisex' ],
      message: '{VALEU} no es un genero válido'
    }
  }
}, {
  timestamps: true
});



// TODO: Crear indice de Mongo
const Product = mongoose.models.Product || model( 'Product', ProductSchema );

export default Product
