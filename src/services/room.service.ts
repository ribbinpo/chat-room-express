import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import "dotenv/config";

import { connectToMongoDB, closeMongoDBConnection } from "@/configs/db.config";
import { randomName, randomPass } from "./random.service";
import { RoomModel } from "@/models/room.model";

const getRoomById = async (id: ObjectId) => {
  const { client, db } = await connectToMongoDB();
  try {
    const room: RoomModel | null = await db
      .collection<RoomModel>("rooms")
      .findOne({ _id: id });
    if (!room) return undefined;
    const { pass, ..._room } = room;
    return _room;
  } catch (error) {
    throw new Error(`[get room by id]: ${error}`);
  } finally {
    closeMongoDBConnection(client);
  }
};

const createRoom = async () => {
  // generate random anonymous user
  const name = randomName();
  // create room without password
  const { client, db } = await connectToMongoDB();
  const session = client.startSession();
  try {
    const res = await session.withTransaction(async () => {
      const room = db.collection("rooms");
      // create password for a room with the id
      const roomPass = randomPass();
      const encryptedRoomPass = await bcrypt.hash(
        roomPass,
        +(process.env.ROOM_KEY_HASH_ROOM || 1)
      );
      // insert room to db
      const cols = await room.insertOne(
        { users: [{ name }], pass: encryptedRoomPass },
        { session }
      );
      return { _id: cols.insertedId, yourName: name, pass: roomPass };
    });
    return res;
  } catch (error) {
    throw new Error(`[creating room]: ${error}`);
  } finally {
    await session.endSession();
    closeMongoDBConnection(client);
  }
};

const joinRoom = async (id: ObjectId, pass: string) => {
  const { client, db } = await connectToMongoDB();
  try {
    const room: RoomModel | null = await db
      .collection<RoomModel>("rooms")
      .findOne({ _id: id });

    if (!room) return undefined;

    const valid = await bcrypt.compare(pass, room.pass);

    if (!valid) return undefined;

    const name = randomName();

    await db.collection<RoomModel>("rooms").updateOne(
      {
        _id: room._id,
      },
      { $push: { users: { name: name } } }
    );
    return { name, _id: room._id };
  } catch (error) {
    throw new Error(`[join room]: ${error}`);
  } finally {
    closeMongoDBConnection(client);
  }
};

export default {
  getRoomById,
  createRoom,
  joinRoom,
};
