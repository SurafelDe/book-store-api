import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
          const { email, password } = req.body;
          const token = await this.userService.login(email, password);
          if(token === 'invalid_password') {
            res.json({ error: 'Incorrect password' });
          }
          else {
            res.json({ message: 'User logged in successfully', ...token });
          }
        } catch (error) {
          console.error('Error during login:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    
      public async register(req: Request, res: Response): Promise<void> {
        try {
          const userData = req.body;
          await this.userService.register(userData);
          res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
          if(error === Error('existingUser')) {
            res.status(500).json({ error: 'User already exists' });
          }
          else {
            res.status(500).json({ error: 'Internal server error' });
          }
          console.error('Error during registration:', error);
        }
      }
    
      public async addPoints(req: Request, res: Response): Promise<void> {
        try {
          const { userId, points } = req.body;
          await this.userService.addPoints(userId, points);
          res.json({ message: 'Points added successfully' });
        } catch (error) {
          console.error('Error adding points:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }

      public async getUser(req: Request, res: Response): Promise<void> {
        try {
          const { email } = req.body;
          const user = await this.userService.getUser(email);
          const userWithoutPassword = { ...user };
          delete userWithoutPassword.password; // Remove the password field
          res.json({ message: 'User loaded successfully', user: userWithoutPassword });
        } catch (error) {
          console.error('Error adding points:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
}
