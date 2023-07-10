import mongoose from "mongoose";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  bio: String,
}, {
  timestamps: true,
})


/**
 * @desc Encrypts password before save
 */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next
  this.password = await hash(this.password, 10)
})


/**
 * @desc Check if password matches
 * @param {String} password 
 * @returns true if password matches the stored password
 */
UserSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password)
}


/**
 * @desc Get jwt token for user
 */
UserSchema.methods.getJwtToken = async function () {
  return sign(
    { id: this._id },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "30m" },
  )
}

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User 