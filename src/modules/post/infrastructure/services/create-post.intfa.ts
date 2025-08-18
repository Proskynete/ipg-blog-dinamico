import type { Post } from "../../domain/post.domain";
import type { PostRepository } from "../../domain/post.repository";

const getAll = async (): Promise<Post[]> => {};

const getById = async (id: string): Promise<Post | null> => {};

const create = async (info: Post): Promise<void> => {};

const remove = async (id: string): Promise<void> => {};

export const postRepository: PostRepository = {
  getAll,
  getById,
  create,
  remove,
};
