import { v2 } from 'cloudinary'

export default async function configCloudinary() {
  v2.config({
    cloud_name: process.env["CLOUDINARY_CLOUD_NAME"],
    api_key: process.env["CLOUDINARY_API_KEY"],
    api_secret: process.env["CLOUDINARY_API_SECRET"]
  })

  console.log("Cloudinary connected successfully")
}

