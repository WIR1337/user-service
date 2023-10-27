import jwt from "jsonwebtoken";

const secretKey = "MY_SECRET_KEY";

const generateAccessToken = (name: string) => {
  const payload = {
    name,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

export default { generateAccessToken, secretKey };
