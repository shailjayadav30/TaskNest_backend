import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    userName:{
        type:String,
        required:true,
    },
    avatar:String,
    isActive:{
        type:Boolean,
        default:true
    },  
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
