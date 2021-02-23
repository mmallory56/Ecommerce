import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;
  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ", [2]);

      const decode = jwt.verify(token[1], process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
    } catch (error) {
      console.log(error);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  next();
};

const admin =(req,res,next)=>{
    if(req.user&&req.user.isAdmin){
        next()
    }
    else{
        res.status(401).json({Message: "Not Athorized"})
        throw new Error("Not Authorized");

    }
}

export { protect,admin };
