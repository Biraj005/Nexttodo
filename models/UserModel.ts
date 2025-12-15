import mongoose, { models } from 'mongoose';
import { IUserSchema } from '../schemas/UserSchema';


const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    name: { type: String, required: true, minlength: 2 },   
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
  },{
    timestamps: true,
  }
)
const UserModel = models?.User || mongoose.model<IUserSchema>('User', UserSchema);

export default UserModel;