import { firebaseDB } from "../../../../helpers/firebase.helper";
import type { CreatePost, Post } from "../../domain/post.domain";
import type { PostRepository } from "../../domain/post.repository";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";

const getAll = async (): Promise<Post[]> => {
  const querySnapshot = await getDocs(collection(firebaseDB, "posts"));
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Post),
  }));

  return posts;
};

const getById = async (id: string): Promise<Post | null> => {
  const postRef = doc(firebaseDB, "posts", id);
  const postSnapshot = await getDoc(postRef);

  if (postSnapshot.exists()) {
    return { ...(postSnapshot.data() as Post) };
  }
  return null;
};

const create = async (data: CreatePost): Promise<void> => {
  const newPost: Post = {
    ...data,
    readTime: 2,
    date: new Date(),
    createdAt: new Date(),
  };

  setDoc(doc(firebaseDB, "posts", crypto.randomUUID()), newPost);
};

const remove = async (id: string): Promise<void> => {};

export const postRepository: PostRepository = {
  getAll,
  getById,
  create,
  remove,
};
