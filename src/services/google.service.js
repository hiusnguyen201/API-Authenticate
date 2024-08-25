import { OAuth2Client } from "google-auth-library";
import * as dotenv from "dotenv";
dotenv.config();

export default { verify };

async function verify(credential, clientId) {
  if (!clientId) clientId = process.env.GOOGLE_CLIENT_ID;
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: clientId,
  });
  return ticket.payload;
}
