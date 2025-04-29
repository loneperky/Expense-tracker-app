import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authToken = (req,res,next) =>{
  const token = req.cookies.token
  try {
    if(!token) return res.json({status:false,message:"User not authorised"})
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.json({message:"there was a server error"})
  }
}


export default authToken
