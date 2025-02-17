import mongoose, {Schema, HydratedDocument, Model } from "mongoose";
import bcrypt from 'bcryptjs';

//인터페이스 정의
export interface IUser extends Document {
  email:string;
  name: string;
  password: string;
  role: "admin"| "user";
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

//스키마 정의
const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowcase: true,
    },
    name: {
      type: String,
      required: true, 
    },
    password: {
      type: String,
      required: true, 
      minlength: 5
    },
    role:{
      type: String,
      eum:['admin', 'user'],
      default: 'user'
    }
  },
  {timestamps:true}
)

//비밀번호 해싱
UserSchema.pre<IUser>('save', async function (next){
  const user = this as HydratedDocument<IUser>;

  if(!user.isModified){
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  next();
})

//비밀번호 비교
UserSchema.methods.comparePassword = async function (candidatePassword:string):Promise<boolean>{
  return bcrypt.compare(candidatePassword, this.password);
}



const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;