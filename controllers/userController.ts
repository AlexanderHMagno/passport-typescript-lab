import { userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  try {
    let user = userModel.findOne(email);
    if (user) {
      if (isUserValid(user, password)) {
        return user;
      }
    }
  } catch (error) {}
  return null;
};
const getUserById = (id: any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

function findOrCreate(
  id: number,
  name: string,
  email: string,
  password: string
) {
  try {
    return userModel.findById(id);
  } catch (error) {
    const newUSer = userModel.createNewAccount(id, name, email, password);
    return userModel.findById(id);
  }
}

export { getUserByEmailIdAndPassword, getUserById, findOrCreate };
