import User from '../../../models/user';
import sendToken from "../../../lib/sendToken";

export default async function login(req, res) {

  const { email, password } = req.body

  try {
    if (!email || !password) {
      console.log(email, password, "2")
      return res.status(400)
        .json({ error: "Email and password are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400)
        .json({ error: "User not found" })
    }

    const passwordMatched = await user.comparePassword(password)

    if (!passwordMatched) {
      return res.status(400)
        .json({ error: "Please check your password" })
    }

    await sendToken(user, res, "Successfully logged In")
    return
  } catch (error) {
    res.status(400)
      .json({ error: error.message, stack: error.stack })
  }
}
