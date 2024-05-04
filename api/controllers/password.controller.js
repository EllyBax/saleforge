import * as argon2 from "argon2";

export default class PasswordHandler {
  static async hashPassword(password) {
    try {
      const hash = await argon2.hash(password);
      return hash;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw error;
    }
  }

  static async comparePassword(password, hashedPassword) {
    try {
      const verified = await argon2.verify(hashedPassword, password);
      return verified;
    } catch (error) {
      console.error("Error comparing password:", error);
      throw error;
    }
  }
}
