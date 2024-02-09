import express from 'express';
import { BookController } from './controllers/bookController';
import { UserController } from './controllers/userController';
import { OrderController } from './controllers/orderController';
import { verifyToken } from './middleware/auth';

const router = express.Router();

const bookController = new BookController();
const userController = new UserController();
const orderController = new OrderController();

router.get('/api/book/get', verifyToken, bookController.getAllBooks.bind(bookController));
router.post('/api/book/create', bookController.createBook.bind(bookController));
router.post('/api/book/rate', verifyToken, bookController.rateBook.bind(bookController));
router.post('/api/book/update', bookController.updateBook.bind(bookController));

router.post('/api/user/login', userController.login.bind(userController));
router.post('/api/user/register', userController.register.bind(userController));
router.post('/api/user/addPoints', verifyToken, userController.addPoints.bind(userController));
router.post('/api/user/get', verifyToken, userController.getUser.bind(userController));

router.post('/api/order/create', verifyToken, orderController.createOrder.bind(orderController));
router.post('/api/order/cancel', verifyToken, orderController.cancelOrder.bind(orderController));

export default router;
