import multer from "multer";
import fs from "fs";
import path from "path";

import config from "#src/config.js";
import StringUtils from "./StringUtils.js";

const MAX_UPLOAD_FILE_SIZE = 1024 * 1024;
const ROOT_UPLOAD_PATH = path.join(config.dirname, "public/uploads");
if (!fs.existsSync(ROOT_UPLOAD_PATH)) fs.mkdirSync(ROOT_UPLOAD_PATH);

class UploadUtils {
  static config(customPath, allowMimes = [], limitFile = 1) {
    const uploadPath = path.join(ROOT_UPLOAD_PATH, customPath);
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

    const storage = multer.diskStorage({
      destination: uploadPath,
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-";

        cb(
          null,
          uniqueSuffix + StringUtils.removeAccents(file.originalname)
        );
      },
    });

    const options = {
      storage: storage,
      limits: { fileSize: MAX_UPLOAD_FILE_SIZE, files: limitFile },
    };

    if (allowMimes && allowMimes.length > 0) {
      options.fileFilter = (req, file, cb) => {
        if (allowMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type"));
        }
      };
    }

    return multer(options);
  }

  static handleFilePath(req, field) {
    if (typeof field === "string" && req?.file?.path) {
      // single upload file
      req.body.files = [req.file];
    }
  }

  static clearUploadFile(files = []) {
    files.forEach((e) => {
      if (fs.existsSync(e.path)) {
        fs.unlinkSync(e.path);
      }
    });
  }
}

export default UploadUtils;
