import { config } from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { role } from "../types/user.js";
config();

class JWT {
  private secretKey = process.env.SECRET_KEY || "MY_SECRET_KEY";

  public generateAccessToken(name: string, id: number, role: string) {
    const payload = {
      name,
      id,
      role,
    };
    
    const token = jwt.sign(payload, this.secretKey, { expiresIn: "24h" });
    return token
  }
  public getPayLoad(token: string) {
    const payload = jwt.verify(token, this.secretKey) as JwtPayload;
    return payload;
  }
}

export default new JWT();
