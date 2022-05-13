import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.js";

export function issueJwtAsync(user) {
  const payload = {
    id: user._id,
  };

  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error) {
          reject();
        }
        resolve(token);
      }
    );
  });
}
