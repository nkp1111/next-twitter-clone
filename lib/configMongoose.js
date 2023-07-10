import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL

export default async function configMongoose() {
  try {
    await mongoose.connect(mongoUrl)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.log("MongoDB Connection failed")
    console.log(error);
  }
}



