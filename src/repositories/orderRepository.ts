import { Order } from '../entities/order';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export class OrderRepository {
    

    // public async findAll(): Promise<Order[]> {
    //     return await prisma.order.findMany();
    // }

    // Implement more repository methods here
    public async createOrder(userId: number, bookId: number, price: number) {
        await prisma.order.create({
          data: {
            orderCode: generateRandomItemCode(),
            userId,
            bookId,
            status: 'purchased',
          },
        });
        await prisma.user.update({
          where: { id: userId },
          data: { points: { decrement: price } },
        });
      }
    
      public async cancelOrder(orderId: number, userId: number) {
        const order = await prisma.order.findUnique({ include: { book: true }, where: { id: orderId, userId: userId } });
        if (!order) {
          throw new Error('Order not found');
        }
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'cancelled' },
        });
        await prisma.user.update({
          where: { id: order.userId },
          data: { points: { increment: order.book.price } },
        });
      }
}

function generateRandomItemCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let itemCode = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    itemCode += characters.charAt(randomIndex);
  }

  return itemCode;
}
