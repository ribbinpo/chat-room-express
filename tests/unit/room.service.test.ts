import { Db, MongoClient, ObjectId } from "mongodb";
import roomService from "@/services/room.service";
import * as randomService from "@/services/random.service";
import * as mongoConfig from "@/configs/db.config";
import bcrypt from "bcrypt";

describe("Room Service Unit Tests", () => {
  describe("getRoomById", () => {
    const mockId = new ObjectId();
    const mockRoom = {
      _id: mockId,
      users: [],
      pass: "hashedPassword",
    };
    let mockClient: MongoClient;
    beforeAll(() => {
      mockClient = {
        close: jest.fn(),
      } as unknown as MongoClient;
    });
    it("should return room if found", async () => {
      const mockDb: Db = {
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockResolvedValue(mockRoom),
      } as unknown as Db;
      jest
        .spyOn(mongoConfig, "connectToMongoDB")
        .mockResolvedValue({ client: mockClient, db: mockDb });
      const result = await roomService.getRoomById(new ObjectId(mockId));
      expect(result).toEqual({ _id: mockRoom._id, users: [], pass: undefined });
    });

    it("should return undefined if room not found", async () => {
      const mockDb: Db = {
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockResolvedValue(undefined),
      } as unknown as Db;
      jest
        .spyOn(mongoConfig, "connectToMongoDB")
        .mockResolvedValue({ client: mockClient, db: mockDb });
      const result = await roomService.getRoomById(new ObjectId());
      expect(result).toBeUndefined();
    });

    it("should throw an error if an error occurs", async () => {
      const errorMessage = "Fetching Error";

      const mockDb: Db = {
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockRejectedValue(errorMessage),
      } as unknown as Db;
      jest
        .spyOn(mongoConfig, "connectToMongoDB")
        .mockResolvedValue({ client: mockClient, db: mockDb });

      await expect(roomService.getRoomById(new ObjectId())).rejects.toThrow(
        errorMessage
      );
    });
  });
  describe("createRoom", () => {
    const mockId = new ObjectId();
    const mockRoom = {
      _id: mockId,
      users: [
        {
          name: "name",
        },
      ],
      pass: "hashedPassword",
    };
    let mockClient: MongoClient;
    beforeEach(() => {
      const mockSession = {
        withTransaction: jest
          .fn()
          .mockImplementation(async (callback) => await callback()),
        endSession: jest.fn(),
      };
      mockClient = {
        close: jest.fn(),
        startSession: jest.fn().mockReturnValue(mockSession),
      } as unknown as MongoClient;
      const mockDb: Db = {
        collection: jest.fn().mockReturnThis(),
        insertOne: jest.fn().mockResolvedValue({ insertedId: mockId }),
      } as unknown as Db;
      jest
        .spyOn(mongoConfig, "connectToMongoDB")
        .mockResolvedValue({ client: mockClient, db: mockDb });
      jest
        .spyOn(randomService, "randomName")
        .mockReturnValue(mockRoom.users[0].name);
    });
    it("should return room if created", async () => {
      const result = await roomService.createRoom();
      expect(result._id).toEqual(mockRoom._id);
      expect(result.yourName).toEqual(mockRoom.users[0].name);
    });
  });
  describe("joinRoom", () => {
    // Mock data
    const mockId = new ObjectId();
    const mockRoom = {
      _id: mockId,
      users: [
        {
          name: "name",
        },
      ],
      pass: "hashedPassword",
    };
    let mockClient: MongoClient;
    beforeEach(() => {
      const mockDb: Db = {
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockResolvedValue(mockRoom),
        updateOne: jest.fn(),
      } as unknown as Db;
      mockClient = {
        close: jest.fn(),
      } as unknown as MongoClient;
      jest
        .spyOn(mongoConfig, "connectToMongoDB")
        .mockResolvedValue({ client: mockClient, db: mockDb });
      jest
        .spyOn(randomService, "randomName")
        .mockReturnValue("player2");
    });
    it("should return room if joined", async () => {
      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;
      const result = await roomService.joinRoom(mockId, "password");
      expect(result?._id).toEqual(mockRoom._id);
      expect(result?.name).toEqual("player2");
    });
    it("should return undefined if room not found", async () => {
      const mockDb: Db = {
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockResolvedValue(undefined),
      } as unknown as Db;
      jest
        .spyOn(mongoConfig, "connectToMongoDB")
        .mockResolvedValue({ client: mockClient, db: mockDb });
      const result = await roomService.joinRoom(new ObjectId(), "password");
      expect(result).toBeUndefined();
    });
  });
});
