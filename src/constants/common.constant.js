export const allowActionPermissions = {
  POST: "create",
  GET: "read",
  PATCH: "update",
  PUT: "update",
  DELETE: "delete",
};

export const allowImageMimeTypes = [
  "image/apng", // Animated Portable Network Graphics (APNG)
  "image/avif", // AV1 Image File Format (AVIF)
  "image/gif", // Graphics Interchange Format (GIF)
  "image/jpeg", // Joint Photographic Expert Group image (JPEG)
  "image/png", // Portable Network Graphics (PNG)
  "image/svg+xml", // Scalable Vector Graphics (SVG)
  "image/webp", // Web Picture format (WEBP)
];

export const regexPattern = {
  USERNAME: /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  PHONE: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  EMAIL:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  BEARER_TOKEN: /^Bearer ((?:\.?(?:[A-Za-z0-9-_]+)){3})$/,
  UUID: /^[0-9a-fA-F]{24}$/,
  VALUE_PERMISSION: /^([a-z]+)\.(create|read|update|delete)$/,
};

export const defaultRoleClient = "customer";

/**
 * Reference: https://www.mongodb.com/docs/manual/reference/operator/query/#comparison
 */
export const comparison = {
  "=": "$eq",
  "!=": "$ne",
  ">": "$gt",
  ">=": "$gte",
  "<": "$lt",
  "<=": "$lte",
  "[]": "$in",
  "![]": "$nin",
};
