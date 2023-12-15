import { Collection, Db, Document, MongoClient } from "mongodb";

let _mongo_connector: MongoClient | null = null;
let _mongo_db: Db | null = null;

export function getMongoDB(): Db {
  if (_mongo_db == null) {
    const { MONGO_URL, MONGO_DB } = process.env;
    _mongo_connector = new MongoClient(MONGO_URL ?? "");
    _mongo_db = _mongo_connector.db(MONGO_DB);
  }
  return _mongo_db;
}

export function getMongoCollection<T extends Document>(
  table: string,
): Collection<T> {
  const db = getMongoDB();
  return db.collection<T>(table);
}
