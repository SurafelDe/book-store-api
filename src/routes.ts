import express from 'express';
import { BookController } from './controllers/bookController';
import { UserController } from './controllers/userController';
import { OrderController } from './controllers/orderController';
import { verifyToken } from './middleware/auth';

const router = express.Router();

const bookController = new BookController();
const userController = new UserController();
const orderController = new OrderController();

router.get('/book/get', verifyToken, bookController.getAllBooks.bind(bookController));
router.post('/book/create', bookController.createBook.bind(bookController));
router.post('/book/rate', verifyToken, bookController.rateBook.bind(bookController));
router.post('/book/update', bookController.updateBook.bind(bookController));

router.post('/user/login', userController.login.bind(userController));
router.post('/user/register', userController.register.bind(userController));
router.post('/user/addPoints', verifyToken, userController.addPoints.bind(userController));
router.post('/user/get', verifyToken, userController.getUser.bind(userController));

router.post('/order/create', verifyToken, orderController.createOrder.bind(orderController));
router.post('/order/cancel', verifyToken, orderController.cancelOrder.bind(orderController));

export default router;
