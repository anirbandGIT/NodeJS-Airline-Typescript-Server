import * as mongoose from "mongoose";
import User from "../../interfaces/user/user.interface";

const userSchema = new mongoose.Schema({
  username: String,
  role: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model<User & mongoose.Document>("users", userSchema);

export default UserModel;
