import { calculateReadingTime } from "../../../../helpers/common.helper";
import { firebaseDB } from "../../../../helpers/firebase.helper";
import type { CreatePost, Post } from "../../domain/post.domain";
import type { PostRepository } from "../../domain/post.repository";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

const getAll = async (bellowTo?: string): Promise<Post[]> => {
  const postsCollection = collection(firebaseDB, "posts");
  const queryBase = [where("isActive", "==", true)];

  if (bellowTo) queryBase.push(where("bellowTo", "==", bellowTo));

  const q = query(postsCollection, ...queryBase);
  const querySnapshot = await getDocs(q);

  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Post),
  }));

  return posts;
};

const getById = async (id: string): Promise<Post | null> => {
  const postsCollection = doc(firebaseDB, "posts", id);
  const postSnapshot = await getDoc(postsCollection);

  if (postSnapshot.exists()) {
    if (!postSnapshot.data()?.isActive) {
      return { ...(postSnapshot.data() as Post) };
    }
  }
  return null;
};

const create = async (data: CreatePost, uid: string): Promise<void> => {
  const newPost: Post = {
    ...data,
    isActive: true,
    bellowTo: uid,
    readTime: calculateReadingTime(data.content),
    date: Timestamp.fromDate(new Date()),
    createdAt: Timestamp.fromDate(new Date()),
  };

  setDoc(doc(firebaseDB, "posts", crypto.randomUUID()), newPost);
};

const remove = async (id: string): Promise<void> => {
  const postsCollection = doc(firebaseDB, "posts", id);

  const data = {
    deletedAt: Timestamp.fromDate(new Date()),
    isActive: false,
  };

  await updateDoc(postsCollection, data);
};

export const postRepository: PostRepository = {
  getAll,
  getById,
  create,
  remove,
};
