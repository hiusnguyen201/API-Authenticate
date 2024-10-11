import rateLimit from "express-rate-limit";
import ResponseUtils from "#src/utils/ResponseUtils.js";

// Docs: https://github.com/express-rate-limit/express-rate-limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  handler: (_, res) => {
    return ResponseUtils.status429(
      res,
      "Too many requests from this IP. Please try again in 15 minutes."
    );
  },
});

export default limiter;
