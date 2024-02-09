import { BookRepository } from '../repositories/bookRepository';
import { Book } from '../entities/book';

export class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    public async getAllBooks(): Promise<Book[]> {
        return await this.bookRepository.findAll();
    }

    public async getBookById(bookId: number): Promise<Book | null> {
        return await this.bookRepository.findById(bookId);
    }

    public async createBook(bookData: any) {
        return this.bookRepository.createBook(bookData);
      }
    
      public async updateBook(bookId: number, bookData: any) {
        return this.bookRepository.updateBook(bookId, bookData);
      }
    
    public async rateBook(bookId: number, rating: number) {
        return this.bookRepository.rateBook(bookId, rating);
      }
    

    // Implement more service methods here
}

// export default new BookService();