import type { Timestamp } from "firebase/firestore";

export interface Post {
  title: string;
  excerpt: string;
  date: Timestamp;
  readTime: number;
  category: string;
  image: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  deletedAt?: Timestamp;
}

export type CreatePost = Omit<
  Post,
  "readTime" | "date" | "createdAt" | "updatedAt" | "deletedAt"
>;
