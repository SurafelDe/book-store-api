import { Order } from "./order";

export interface Book {
  id: number;
  title: string;
  writer: string;
  cover_image: string;
  price: number;
  tags: string[];
  rating: number;
  number_of_review: number;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];
}
