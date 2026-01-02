import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User allready exists with this email .Please Signin",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const token = jwt.sign(JWT_SECRET);
    const newUser = new User({
      email,
      password: hashedPass,
    });

    await newUser.save();
    return res.status(200).json({
      message: "User saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in saving user",
    });
  }
};
