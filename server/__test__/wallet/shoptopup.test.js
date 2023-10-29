import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import User from "../../src/api/user/v1/models/user.model";
import Foreign from "../../src/api/user/v1/models/foreign_user.model";
import topupRoute from "../../src/api/wallet/v1/controller";
import config from "../../src/config";

const app = express();
app.use(express.json());
app.use(topupRoute);

beforeAll(async () => {
  if (config.NODE_ENV === "test") {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
    });
  }
});

afterAll(async () => {
  if (config.NODE_ENV === "test") {
    await mongoose.connection.close();
  }
});

describe("POST /shop/topup", () => {
  // Positive Test Case: User exists (local)
  it("should create a new transaction successfully for local user", async () => {
    const mockRequestBody = {
      user_id: "652cfe3990d210c8cfd5a9ed",
      user_type: "local",
      transaction_id: "6fc6b293-0ace-4ffb-ae42-f40111c2c568",
      amount: 100,
    };

    // Mock the User.findOne function to return a valid user
    User.findOne = jest
      .fn()
      .mockResolvedValue({ _id: "652cfe3990d210c8cfd5a9ed" });

    const response = await request(app)
      .post("/shop/topup")
      .send(mockRequestBody);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("New transaction created successfully!");
  });

  // Positive Test Case: User exists (foreign)
  it("should create a new transaction successfully for foreign user", async () => {
    const mockRequestBody = {
      user_id: "652cfcf16baffbc0781edf23",
      user_type: "foreign",
      transaction_id: "fb5e36be-6f84-4f74-bb9f-875ce1317b9d",
      amount: 200,
    };

    // Mock the Foreign.findOne function to return a valid user
    Foreign.findOne = jest
      .fn()
      .mockResolvedValue({ _id: "652cfcf16baffbc0781edf23" });

    const response = await request(app)
      .post("/shop/topup")
      .send(mockRequestBody);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("New transaction created successfully!");
  });

  // Negative Test Case: User does not exist
  it("should return a 401 error if the user does not exist", async () => {
    const mockRequestBody = {
      user_id: "1gfrhrbfhrhfh",
      user_type: "local",
      transaction_id: "efefuufehfueufh",
      amount: 150,
    };

    // Mock the User.findOne function to return null (user doesn't exist)
    User.findOne = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .post("/shop/topup")
      .send(mockRequestBody);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "No user exist with this transaction id"
    );
  });
});
