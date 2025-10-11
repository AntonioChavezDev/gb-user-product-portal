import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserService {
  JWT_SECRET;
  users;
  constructor() {
    this.users = [];
    this.JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Secret key for JWT
  }

  async register(userData) {
    const { username, email, password } = userData;
    // Validate required fields
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required.');
    }
    // Check if user already exists
    const existingUser = this.getUserByUsernameOrEmail(username, email);
    if (existingUser) {
      throw new Error('Username or email already in use.');
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { ...userData, password: hashedPassword };
    this.users.push(newUser);
    return { ...newUser, password: undefined }; // Don't return password
  }

  async authenticate(username, password) {
    const user = this.users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT token
      const token = jwt.sign({ username: user.username }, this.JWT_SECRET, {
        expiresIn: '1h',
      });
      return { user, token };
    }
    return null;
  }

  /**
   * Retrieves all users.
   * @param {object} [filter] - Optional filter object (e.g., { username, email }).
   * @returns {object[]} Array of user objects without passwords.
   */
  getUsers(filter = {}) {
    let filteredUsers = this.users;
    if (filter.username) {
      filteredUsers = filteredUsers.filter(
        (u) => u.username === filter.username
      );
    }
    if (filter.email) {
      filteredUsers = filteredUsers.filter((u) => u.email === filter.email);
    }
    return filteredUsers.map((u) => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
  }

  /**
   * Retrieves a user by username.
   * @param {string} username - The username of the user to retrieve.
   * @returns {object|undefined} The user object without the password, or undefined if not found.
   */
  getUser(username) {
    const user = this.users.find((u) => u.username === username);
    if (!user) return undefined;
    // Return user object without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Retrieves a user by username or email.
   * @param {string} username - The username to search for.
   * @param {string} email - The email to search for.
   * @returns {object|undefined} The user object without the password, or undefined if not found.
   */
  getUserByUsernameOrEmail(username, email) {
    const user = this.users.find(
      (u) => u.username === username || u.email === email
    );
    if (!user) return undefined;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  updateUser(username, updatedData) {
    const userIndex = this.users.findIndex((u) => u.username === username);
    updatedData.password = updatedData.password
      ? bcrypt.hashSync(updatedData.password, 10)
      : this.users[userIndex].password;
    if (userIndex > -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updatedData };
      const { password, ...userWithoutPassword } = this.users[userIndex];
      return userWithoutPassword;
    }
    return undefined;
  }

  deleteUser(username) {
    const userIndex = this.users.findIndex((u) => u.username === username);
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}

export default UserService;
