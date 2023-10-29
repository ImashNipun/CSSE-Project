import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import User from "../../src/api/user/v1/models/user.model";
import refundRoute from "../../src/api/wallet/v1/controller";
import config from "../../src/config";

const app = express();
app.use(express.json());
app.use(refundRoute);

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

describe("POST /shop/refund", () => {
  // Positive Test Case: Shop exists
  it("should create a new refund transaction successfully", async () => {
    const mockRequestBody = {
      user_id: "652cfe3990d210c8cfd5a9ed",
      transaction_id: "4227e858-50a1-4e7d-adf4-14de799432c8",
      amount: 100,
    };

    // Mock the User.findOne function to return a valid shop
    User.findOne = jest
      .fn()
      .mockResolvedValue({ _id: "652cfe3990d210c8cfd5a9ed" });

    const response = await request(app)
      .post("/shop/refund")
      .send(mockRequestBody);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("New transaction created successfully!");
  });

  // Negative Test Case: Shop does not exist
  it("should return a 401 error if the shop does not exist", async () => {
    const mockRequestBody = {
      user_id: "652cfe3990d210c8cfd5a9ed",
      transaction_id: "4227e858-50a1-4e7d-adf4-14de799432c5",
      amount: 150,
    };

    // Mock the User.findOne function to return null (shop doesn't exist)
    User.findOne = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .post("/shop/refund")
      .send(mockRequestBody);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "No user exist with this transaction id"
    );
  });

  // Positive Test Case: Shop exists (with different transaction_id)
  it("should create a new refund transaction successfully for an existing shop with different transaction_id", async () => {
    const mockRequestBody = {
      user_id: "652cfe3990d210c8cfd5a9ed",
      transaction_id: "4227e858-50a1-4e7d-adf4-14de799432c8",
      amount: 200,
    };

    // Mock the User.findOne function to return a valid shop
    User.findOne = jest
      .fn()
      .mockResolvedValue({ _id: "652cfe3990d210c8cfd5a9ed" });

    const response = await request(app)
      .post("/shop/refund")
      .send(mockRequestBody);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("New transaction created successfully!");
  });
});
