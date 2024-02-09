import { OrderRepository } from '../repositories/orderRepository';
import { Order } from '../entities/order';
import { BookService } from './bookService';

export class OrderService {
    private orderRepository: OrderRepository;
    private bookService: BookService;
    constructor() {
        this.orderRepository = new OrderRepository();
        this.bookService = new BookService();

    }

    // public async getAllOrders(): Promise<Order[]> {
    //     return await this.orderRepository.findAll();
    // }
    

    public async createOrder(userId: number, bookId: number) {
        const book = await this.bookService.getBookById(bookId);
        
        if (!book) {
          throw new Error('Book not found');
        }
        await this.orderRepository.createOrder(userId, bookId, book.price);
      }
    
      public async cancelOrder(orderId: number, userId: number) {
        await this.orderRepository.cancelOrder(orderId, userId);
      }
}
