const sendToken = async (user, NextResponse, message = true) => {
  if (!user) {
    return res.status(400)
      .json({ success: false, error: "User is not present" })
  }

  const token = await user.getJwtToken()
  const cookieOptions = {
    httpOnly: true,
    // 7 days from now
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    // sameSite: "None",
    // secure: true,
  }

  user.password = undefined

  let response = NextResponse.next()
  response.cookies.set("token", token)

  return NextResponse.json({ success: message, user, token })
}

export default sendToken