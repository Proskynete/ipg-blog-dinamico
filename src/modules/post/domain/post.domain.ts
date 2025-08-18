import type { Timestamp } from "firebase/firestore";

export interface Post {
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
  | "bellowTo"
  | "isActive"
  | "readTime"
  | "date"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
>;
