import { OAuth2Client } from "google-auth-library";
import configs from "#src/configs.js";

export default { verify };

async function verify(credential, clientId) {
  if (!clientId) clientId = configs.google.clientId;
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: clientId,
  });
  return ticket.payload;
}
