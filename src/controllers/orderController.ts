import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    // public async getAllOrders(req: Request, res: Response): Promise<void> {
    //     try {
    //         const orders = await this.orderService.getAllOrders();
            
    //         res.json(orders);
    //     } catch (error) {
    //         console.error('Error fetching orders:', error);
    //         res.status(500).json({ error: 'Internal server error' });
    //     }
    // }

    // Implement more controller methods here
    public async createOrder(req: Request, res: Response): Promise<void> {
        try {
          const { userId, bookId } = req.body;
          await this.orderService.createOrder(userId, bookId);
          res.status(200).json({ message: 'Book ordered successfully' });
        } catch (error) {
          console.error('Error ordering book:', error);
          res.status(500).json({ error: (error as Error).message});
        }
      }
    
      public async cancelOrder(req: Request, res: Response): Promise<void> {
        try {
          const { orderId, userId } = req.body;
          await this.orderService.cancelOrder(Number(orderId), Number(userId));
          res.json({ message: 'Order cancelled successfully' });
        } catch (error) {
          console.error('Error cancelling order:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
}

