import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const connectToDb = () => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to mongodb')
    })
    .catch((err) => {
      console.log(err)
    })
}
