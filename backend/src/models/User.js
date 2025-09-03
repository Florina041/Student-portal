import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true,"Password is required"],
  },
  refreshToken:{
    type:String,
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  }
},{timestamps:true});

// Encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//token generation functions
userSchema.methods.generateAccessToken = function(){
  const jti = crypto.randomUUID();
  return jwt.sign(
    {
      sub:this._id.toString(),
      jti,
      type:"access"
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
      issuer:"KSAC_MANAGEMENT_PORTAL"
    }
  );
};

userSchema.methods.generateRefreshToken = function(){
  const jti = crypto.randomUUID();
  return jwt.sign(
    {
      sub:this._id.toString(),
      jti,
      type:"refresh"
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
      issuer:"KSAC_MANAGEMENT_PORTAL"
    }
  );
};

export const User = mongoose.model("User", userSchema);



