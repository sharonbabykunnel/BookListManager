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

  async changePassword(email, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findOneAndUpdate(
      { email }, 
      { password: hashedPassword }, 
      { new: true }
    );
    return updatedUser;
  }

}

export default new UserRepository();
