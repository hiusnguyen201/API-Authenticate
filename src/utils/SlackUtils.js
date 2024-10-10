import { WebClient } from "@slack/web-api";
import config from "#src/config.js";

const { token, channelId } = config.slack;
const web = new WebClient(token);

function sendMessage(message, channel = channelId) {
  try {
    if (token && web) {
      const res = web.chat.postMessage({
        text: message,
        channel,
      });
      return res;
    }

    return null;
  } catch (err) {
    console.log(err);
  }
}

async function sendMessageSync(message, channel = channelId) {
  if (token && web) {
    const res = await web.chat.postMessage({
      text: message,
      channel,
    });
    return res;
  }

  return null;
}

export default { sendMessage, sendMessageSync };
