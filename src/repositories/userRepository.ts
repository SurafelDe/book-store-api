import { User } from '../entities/user';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


export class UserRepository {
    

    public async findAll(): Promise<User[]> {
        return await prisma.user.findMany();
    }

    public async findUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
      }

      public async findUser(email: string) {
        return prisma.user.findUnique({ include: { orders: true }, where: { email } });
      }
    
      public async createUser(userData: any) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return prisma.user.create({
          data: {
            ...userData,
            password: hashedPassword,
          },
        });
      }
    
      public async updateUserPoints(userId: number, points: number) {
        return prisma.user.update({
          where: { id: userId },
          data: { points: { increment: points } },
        });
      }

    // Implement more repository methods here
}