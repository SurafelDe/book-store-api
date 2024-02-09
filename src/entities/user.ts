import { Order } from "./order";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    points: number;
    createdAt: Date;
    updatedAt: Date;
    orders?: Order[];
  }