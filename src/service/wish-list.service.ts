import { getDb } from "../gateway/mongo";

interface Wish {
  name: string;
  type: string;
  isPossible: boolean;
  priority: 1 | 2 | 3;
}

export const getWishesListCollection = async () => {
  const db = await getDb();
  return db.collection<Wish>("wishes");
};
export const createWish = async (wish: Wish) => {
  const col = await getWishesListCollection();
  if (!wish.isPossible) {
    throw new Error("Wish is not possible");
  }
  const { insertedId } = await col.insertOne(wish);
  return insertedId.toString();
};

export const getWishes = async () => {
  const col = await getWishesListCollection();
  return col.find().toArray();
};
