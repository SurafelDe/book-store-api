import express from 'express';
import { BookController } from '../controllers/bookController';
import { UserController } from '../controllers/userController';
import { OrderController } from '../controllers/orderController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

const bookController = new BookController();
const userController = new UserController();
const orderController = new OrderController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - writer
 *         - cover_image     
 *         - price     
 *         - tags     
 *         - rating     
 *         - number_of_review          
 *         - createdAt     
 *         - updatedAt     
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         writer:
 *           type: string
 *           description: The book author
 *         cover_image:
 *           type: string 
 *           description: The cover image of the book
 *         tags:
 *           type: array
 *           description: The list of genre of the book
 *       example:
 *         id: 3
 *         title: The New Turing Omnibus
 *         writer: Alexander K. Dewdney
 *         cover_image: image_url
 *         tags: {fiction,drama} 
 *         rating: 4.0 
 *         number_of_review: 10 
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email     
 *         - password     
 *         - points     
 *         - createdAt     
 *         - updatedAt     
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *         points:
 *           type: float
 *           description: Points used by the user to purchase books
 *       example:
 *         id: 1
 *         firstName: John
 *         lastName: Daniel
 *         email: john@gmail.com
 *         points: 100 
 *     Order:
 *       type: object
 *       required:
 *         - orderCode
 *         - bookId
 *         - userId
 *         - status
 *       properties:
 *         orderCode:
 *           type: string
 *           description: The auto-generated id of the order
 *         bookId:
 *           type: integer
 *           description: The id of the ordered book
 *         userId:
 *           type: integer
 *           description: The id of the user                   
 *         status:
 *           type: string
 *           description: The status of the order
 *       example:
 *         orderCode: ASFOAIFKD
 *         bookId: 1
 *         userId: 2
 *         status: purchased 
 */

 /**
  * @swagger
  * tags:
  *   name: Books
  *   description: The books managing API
  */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The users managing API
  */

 /**
  * @swagger
  * tags:
  *   name: Order
  *   description: The order managing API
  */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/api/book/get', verifyToken, bookController.getAllBooks.bind(bookController));
router.post('/api/book/create', bookController.createBook.bind(bookController));
router.post('/api/book/rate', verifyToken, bookController.rateBook.bind(bookController));
router.post('/api/book/update', bookController.updateBook.bind(bookController));


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Unauthorized
 */
router.post('/api/user/login', userController.login.bind(userController));
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 */
router.post('/api/user/register', userController.register.bind(userController));

/**
 * @swagger
 * /api/user/addPoints:
 *   post:
 *     summary: Add points to user account
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer   
 *               points:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Points added successfully
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 */
router.post('/api/user/addPoints', verifyToken, userController.addPoints.bind(userController));
/**
 * @swagger
 * /api/user/get:
 *   post:
 *     summary: Get user information
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string   
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
 *       '401':
 *         description: Unauthorized
 */
router.post('/api/user/get', verifyToken, userController.getUser.bind(userController));



/**
 * @swagger
 * /api/order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Order created successfully
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 */
router.post('/api/order/create', verifyToken, orderController.createOrder.bind(orderController));

/**
 * @swagger
 * /api/order/cancel:
 *   post:
 *     summary: Cancel an existing order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Order canceled successfully
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 */
router.post('/api/order/cancel', verifyToken, orderController.cancelOrder.bind(orderController));

export default router;
