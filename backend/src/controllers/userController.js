import { User } from "../models/User.js"
import jwt from "jsonwebtoken"

//SIGN-UP
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    //password will be hashed in pre-save hook
    const user = new User({ name, email, password}); //User -> mongoose model
    await user.save(); // user -> document instance of the model

    const accessToken = generateAccessToken();
    const refreshToken = generateRefreshToken();

    user.refreshToken = refreshToken; //save refresh token in user object
    await user.save(); //save user -> password hashed in pre-save hook

    res.status(201).json({
      message: "User Registered Successfully",
      accessToken,
      refreshToken,
      user:{id:user._id,name:user.name,email:user.email}
    });
  } catch (error) {
    res.status(500).json({ message:"Server Error", error });
  }
};

//LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ message: "User not found"});

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateAccessToken();

    if (user && (await user.matchPassword(password))) {
      res.json({
        accessToken,
        refreshToken,
        user:{id:user._id,name:user.name,email:user.email},
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message:"Server Error",error });
  }
};

//REFRESH TOKEN
export const refreshAccessToken = async (req,res)=>{
  try{
    const { refreshToken } = req.body;
    if(!refreshToken) return res.status(401).json({ message: "Refresh Token missing"});

    //verify
    const payload = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);

    //finding user
    const user = await User.findOne(payload.sub);
    if(!user) return res.status(404).json({ message:"User not found"});

    //checking if refreshToken matches the stored one in user object
    if(user.refreshToken !== refreshToken){
      return res.status(403).json({ message:"Token has been revoked"});
    }

    //now generating new Access Token since its for limited time
    const newAccessToken = user.generateAccessToken();

    res.json({ accessToken:newAccessToken});
  }catch(error){
    res.status(403).json({ message:"Invalid or expired refresh token"})
  }
};



