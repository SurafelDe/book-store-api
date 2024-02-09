import { User } from "./user";
import { Book } from "./book";

export interface Order {
    id: number;
    orderCode: string;
    userId: number;
    bookId: number;
    user?: User;
    book?: Book;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }