import type { CreatePost, Post } from "./post.domain";

export interface PostRepository {
  getAll: () => Promise<Post[]>;
  getById: (id: string) => Promise<Post | null>;
  create: (data: CreatePost) => Promise<void>;
  remove: (id: string) => Promise<void>;
}
