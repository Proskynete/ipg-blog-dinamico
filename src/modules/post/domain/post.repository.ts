import type { CreatePost, Post } from "./post.domain";

export interface PostRepository {
  getAll: (bellowTo?: string) => Promise<Post[]>;
  getById: (id: string) => Promise<Post | null>;
  create: (data: CreatePost, uid: string) => Promise<void>;
  toggleActive: (id: string, isActive: boolean) => Promise<void>;
}
