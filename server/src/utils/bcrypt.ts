import bcrypt from "bcryptjs";

const bcryptApi = {
  comparePasswords: function (password: string, hashedpass: string) {
    return bcrypt.compareSync(password, hashedpass);
  },
  createHash: function (password:string) {
    const salt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
  }
};

export default bcryptApi;
