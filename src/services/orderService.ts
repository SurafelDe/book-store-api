import { OrderRepository } from '../repositories/orderRepository';
import { Order } from '../entities/order';
import { BookService } from './bookService';
import { UserService } from './userService';

export class OrderService {
    private orderRepository: OrderRepository;
    private bookService: BookService;
    private userService: UserService;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.bookService = new BookService();
        this.userService = new UserService();
    }

    public async createOrder(userId: number, bookId: number) {
        const book = await this.bookService.getBookById(bookId);
        const user = await this.userService.getUserById(userId);
        if (!book) {
          throw new Error('Book not found');
        }
        
        if(user && user?.points < book?.price) {
          throw new Error("User don't have enough points.");
        }
        
        await this.orderRepository.createOrder(userId, bookId, book.price);
      }
    
      public async cancelOrder(orderId: number, userId: number) {
        await this.orderRepository.cancelOrder(orderId, userId);
      }
}
