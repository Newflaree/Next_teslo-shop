import { Schema, model, models } from 'mongoose';


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: [ 'ADMIN_ROLE', 'CLIENT_ROLE' ],
      message: '{VALUE} No es un role válido',
      default: 'CLIENT_ROLE',
      required: true
    }
  }
}, {
  timestamps: true
});

const User = models.User || model( 'User', UserSchema );

export default User;
