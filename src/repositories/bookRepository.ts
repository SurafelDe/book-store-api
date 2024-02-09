import { Book } from '../entities/book';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export class BookRepository {
    

    public async findAll(): Promise<Book[]> {
        return await prisma.book.findMany();
    }

    public async findById(bookId: number): Promise<Book | null> {
        const book = await prisma.book.findFirst({ where: { id: bookId } });
        return book;
    }

    public async createBook(bookData: any) {
        return prisma.book.create({ data: bookData });
      }
    
    public async updateBook(bookId: number, bookData: any) {
        return prisma.book.update({ where: { id: bookId }, data: bookData });
    }

    public async rateBook(bookId: number, rating: number) {
        const book = await prisma.book.findUnique({ where: { id: bookId } });
        if (!book) {
            throw new Error('Book not found');
        }
        const updatedRating = (book.rating * book.number_of_review + rating) / (book.number_of_review + 1);
        await prisma.book.update({
            where: { id: bookId },
            data: {
            rating: updatedRating,
            number_of_review: { increment: 1 },
            },
        });
    }

}
