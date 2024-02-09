import { Request, Response } from 'express';
import { BookService } from '../services/bookService';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }
    
    public async getAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const books = await this.bookService.getAllBooks();
            
            res.json({message: "successful", books: books});
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Implement more controller methods here
    public async createBook(req: Request, res: Response): Promise<void> {
        try {
          const bookData = req.body;
          await this.bookService.createBook(bookData);
          res.status(201).json({ message: 'Book created successfully' });
        } catch (error) {
          console.error('Error creating book:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    
      public async updateBook(req: Request, res: Response): Promise<void> {
        try {
          const { bookId } = req.params;
          const bookData = req.body;
          await this.bookService.updateBook(Number(bookId), bookData);
          res.json({ message: 'Book updated successfully' });
        } catch (error) {
          console.error('Error updating book:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    
      public async rateBook(req: Request, res: Response): Promise<void> {
        try {
          const { bookId, rating } = req.body;
          await this.bookService.rateBook(Number(bookId), rating);
          res.json({ message: 'Book rated successfully' });
        } catch (error) {
          console.error('Error rating book:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
}

