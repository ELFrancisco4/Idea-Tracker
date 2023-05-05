import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const connectToDb = () => {
  console.log('Connecting to MongoDB', process.env.MONGO_URI)

  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to mongodb')
    })
    .catch((err) => {
      console.log(err)
    })
}
