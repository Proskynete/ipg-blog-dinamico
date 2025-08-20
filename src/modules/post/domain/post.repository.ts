import type { CreatePost, Post } from "./post.domain";

export interface PostRepository {
  getAll: (bellowTo?: string) => Promise<Post[]>;
  getBySlug: (slug: string) => Promise<Post | null>;
  create: (data: CreatePost, uid: string) => Promise<void>;
  edit: (id: string, data: CreatePost) => Promise<void>;
  toggleActive: (id: string, isActive: boolean) => Promise<void>;
  verifySlug: (slug: string) => Promise<boolean>;
}
