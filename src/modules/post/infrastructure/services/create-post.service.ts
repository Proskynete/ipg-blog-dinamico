import { calculateReadingTime } from "../../../../helpers/common.helper";
import { firebaseDB } from "../../../../helpers/firebase.helper";
import type { CreatePost, Post } from "../../domain/post.domain";
import type { PostRepository } from "../../domain/post.repository";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

const getAll = async (bellowTo?: string): Promise<Post[]> => {
  const postsCollection = collection(firebaseDB, "posts");
  let _query = where("isActive", "==", true);

  if (bellowTo) {
    _query = where("bellowTo", "==", bellowTo);
  }

  const q = query(postsCollection, _query);
  const querySnapshot = await getDocs(q);

  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, "id">),
  }));

  return posts;
};

const getBySlug = async (slug: string): Promise<Post | null> => {
  const postsCollection = collection(firebaseDB, "posts");
  const q = query(postsCollection, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;
  const doc = querySnapshot.docs[0];

  return {
    id: doc.id,
    ...(doc.data() as Omit<Post, "id">),
  };
};

const create = async (data: CreatePost, uid: string): Promise<void> => {
  const newPost: Omit<Post, "id"> = {
    ...data,
    isActive: true,
    bellowTo: uid,
    readTime: calculateReadingTime(data.content),
    date: Timestamp.fromDate(new Date()),
    createdAt: Timestamp.fromDate(new Date()),
  };

  setDoc(doc(firebaseDB, "posts", crypto.randomUUID()), newPost);
};

const toggleActive = async (id: string, isActive: boolean): Promise<void> => {
  const postsCollection = doc(firebaseDB, "posts", id);

  const data = {
    isActive: !isActive,
    updatedAt: Timestamp.fromDate(new Date()),
  };

  await updateDoc(postsCollection, data);
};

const verifySlug = async (slug: string): Promise<boolean> => {
  const postsCollection = collection(firebaseDB, "posts");
  const q = query(postsCollection, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const postRepository: PostRepository = {
  getAll,
  getBySlug,
  create,
  toggleActive,
  verifySlug,
};
