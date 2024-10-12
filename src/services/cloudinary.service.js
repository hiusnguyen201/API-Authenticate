import { v2 as cloudinary } from "cloudinary";
import moment from "moment-timezone";

import config from "#src/config.js";
import StringUtils from "#src/utils/StringUtils.js";

const { cloudName, apiKey, apiSecret } = config.cloudinary;
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default { saveAvatar };

async function save(filePath, folder, fileName) {
  const res = await cloudinary.uploader.upload(filePath, {
    public_id: fileName,
    folder: folder,
  });

  return res;
}

async function saveAvatar(fileInfo, userId) {
  const fileName = `avatar-${moment().valueOf()}-${StringUtils.randomNumber(
    6
  )}`;
  return await save(fileInfo.path, `/users/${userId}/avatars`, fileName);
}
