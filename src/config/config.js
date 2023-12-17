import dotenv from "dotenv";
dotenv.config();

export const config = {
  server: {
    secretSession: process.env.SECRET_SESSION,
    env: process.env.NODE_ENVIRONMENT || "development",
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
  github: {
    callbackUrl: process.env.CALLBACK_URL,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  admin: {
    admin: process.env.ADMIN_EMAIL,
  },
  gmail: {
    account: process.env.ADMIN_GMAIL_EMAIL,
    password: process.env.SUPORT_ADMIN_GMAIL,
    secretToken: process.env.TOKEN_EMAIL,
  },
};
