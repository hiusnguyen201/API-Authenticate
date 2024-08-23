import { v4 as uuidv4 } from "uuid";

class UuidUtils {
  static genUUID() {
    return uuidv4();
  }
}

export default UuidUtils;
