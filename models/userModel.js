import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  repPassword: {
    type: String,
    required: true
  },
  reset_password_token:{
    type: String
  },
  reset_password_expires:{
    type: String
  },
  email_verify_token:{
    type:String,
  },
  email_verified:{
    type:Boolean,
    default:false
  },
  role: {
    type: String,
    required: true
  },
},
 {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
