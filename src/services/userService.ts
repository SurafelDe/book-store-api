import { UserRepository } from '../repositories/userRepository';
import { User } from '../entities/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // public async getAllUsers(): Promise<User[]> {
    //     return await this.userRepository.findAll();
    // }
    
    public async login(email: string, password: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
          throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return 'invalid_password';
        }
        const token = jwt.sign({ userId: user.id }, process.env.TokenSecret || "secret", { expiresIn: '1d' });
        return {token: token, user: user };
      }
    
    public async register(userData: any) {
        const existingUser = await this.userRepository.findUserByEmail(userData.email);
        if (existingUser) {
          throw new Error('Email already exists');
        }
        return this.userRepository.createUser(userData);
      }
    
    public async addPoints(userId: number, points: number) {
        return this.userRepository.updateUserPoints(userId, points);
      }

      public async getUser(email: any) {
        return await this.userRepository.findUser(email);
      }

    // Implement more service methods here
}
