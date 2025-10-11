import UserService from '../services/user.service.js';

class UserController {
  constructor() {
    if (UserController.instance) {
      return UserController.instance;
    }
    this.userService = new UserService();

    this.createUser = this.createUser.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    UserController.instance = this;
  }

  async createUser(req, res) {
    try {
      const { name, username, email, password } = req.body;

      // Register user
      const userData = { name, username, email, password };
      const user = await this.userService.register(userData);

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async authenticate(req, res) {
    try {
      const { username, password } = req.body;
      const user = await this.userService.authenticate(username, password);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await this.userService.getUser(req.params.username);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    const { name, password } = req.body;
    const userData = { name, password };
    try {
      const updatedUser = await this.userService.updateUser(
        req.params.username,
        userData
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await this.userService.deleteUser(req.params.username);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

// Singleton instance
const userController = new UserController();

export default userController;
