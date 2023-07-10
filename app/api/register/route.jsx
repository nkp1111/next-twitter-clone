import cloudinary from "cloudinary"
import User from '../../../models/user'
import sendToken from "../../../lib/sendToken";

/**
 * @desc Registers user
 * @method POST /api/register
 * @param {*} req 
 * @param {*} res 
 */
export default async function register(req, res) {

  const {
    name,
    email,
    password,
    bio
  } = req.body

  let avatar = req.body.avatar
  let imgResult = {}
  try {

    // get user 
    let user = {
      name,
      email,
      password,
      bio,
      avatar: {
        public_id: "",
        url: "https://www.gravatar.com/avatar/",
      }
    }

    // if avatar is uploaded then set avatar
    if (avatar) {
      imgResult = await cloudinary.v2.uploader.upload(avatar, {
        folder: "tweeter"
      })

      user.avatar = {
        public_id: imgResult.public_id,
        url: imgResult.secure_url,
      }
    }

    // save user 
    let userSaved = await User.create(user)

    sendToken(userSaved, res, "Successfully Register User")
    return
  } catch (error) {
    res.status(400).json({ error: error.message, stack: error.stack })
  }
}