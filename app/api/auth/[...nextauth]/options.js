import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/user";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password"
        }
      },
      async authorize(credentials) {
        const user = await User.findOne({ email: credentials?.username });
        const passwordMatch = await user.comparePassword(credentials?.password)
        if (user && passwordMatch) {
          return user;
        } else {
          return null;
        }
      }
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  // pages: {
  //   signIn: "/api/register/"
  // },
}