import * as dotenv from "dotenv";
dotenv.config();

const env = process.env;

const configs = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT || 3001,

  mongoUri: env.MONGO_URI, // example: mongodb://localhost:27017/api-authenticate,

  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN || "7d",

  mailer: {
    host: env.MAILER_HOST || "smtp.gmail.com",
    port: env.MAILER_PORT || 465,
    user: env.MAILER_AUTH_USER,
    pass: env.MAILER_AUTH_PASS,
  },

  google: {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  },
};

export default configs;
