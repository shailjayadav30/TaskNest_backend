import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    if(!email || !password || !userName){
      return res.status(400).json({
  message:"All the fields are required "
 })
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User allready exists with this email .Please Signin",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPass,
    });

    
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(201).json({
      message: "User saved successfully",
      token,
    });
  } catch (error) {
    console.log("Error is ",error)
    return res.status(500).json({
      message: "Error in saving user",
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(404).json({
        message: "user does not exist with This email",
      });
    }

    const isPassCorrect = await bcrypt.compare(password, existingUser.password);
    if  (!isPassCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

      const token =await jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"7d"})

    res.status(200).json({
message:"User logged in successfully",
token
    })
  } catch (error) {
    console.log("Error",error)
    res.status(500).json({
      message:"Error in logging user"
    })
  }
};
