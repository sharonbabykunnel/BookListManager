import User from "./../models/userModel.js";
import bcrypt from "bcrypt";

class UserRepository {
  async verifyPassword(inputPassword, password) {
    return await bcrypt.compare(inputPassword, password);
  }

  async createUser(email, password, name) {
    return await User.create({ email, password, name });
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

}

export default new UserRepository();
