import database from "../config/database";

const db = database;

export class UserRepository {
  static async create(email: string, hashedPassword: string, name: string) {
    return db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      }
    });
  }

  static async findByEmail(email: string) {
    return db.user.findUnique({
      where: {
        email: email
      }
    });
  }

  static async findById(id: number) {
    return db.user.findUnique({
      where: {
        id: id
      }
    });
  }
}