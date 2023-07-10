import User from '@/models/user'
import sendToken from "@/lib/sendToken";
import { NextResponse } from "next/server";
import { v2 } from "cloudinary";

/**
 * @desc Registers user
 * @method POST /api/register
 * @param {*} req 
 * @param {*} res 
 */
export async function POST(request) {

  const {
    name,
    email,
    password,
    bio,
    avatar,
  } = await request.json();

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
      imgResult = await v2.uploader.upload(avatar, {
        folder: "tweeter"
      })

      user.avatar = {
        public_id: imgResult.public_id,
        url: imgResult.secure_url,
      }
    }

    // save user 
    let userSaved = await User.create(user)

    return sendToken(userSaved, NextResponse, "Successfully Register User")
  } catch (error) {
    return NextResponse.json({ error: error.message, stack: error.stack },
      { status: 500 });
  }
}