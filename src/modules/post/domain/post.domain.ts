import type { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  bellowTo: string;
  isActive: boolean;
  title: string;
  image: string;
  date: Timestamp;
  readTime: number;
  category: string;
  excerpt: string;
  content: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  deletedAt?: Timestamp;
}

export type CreatePost = Omit<
  Post,
  | "id"
  | "bellowTo"
  | "isActive"
  | "readTime"
  | "date"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
>;
