import { ObjectId } from "mongodb";

export interface RoomModel {
  _id: ObjectId;
  name: string[];
  pass: string;
}