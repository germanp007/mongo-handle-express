import { sessionDao } from "../dao/index.js";

export class UsersService {
  static createUsers() {
    return sessionDao.createUsers();
  }
  static getUserByEmail(email) {
    return sessionDao.getUserByEmail(email);
  }
  static getUserById(id) {
    return sessionDao.getUserById(id);
  }
}
