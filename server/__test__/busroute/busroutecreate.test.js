import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import config from "../../src/config";
import busRouteRoute from "../../src/api/bus-routes/v1/controller";
import BusRoute from "../../src/api/bus-routes/v1/models/bus_route.model";

const app = express();
app.use(express.json());
app.use(busRouteRoute); 

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

describe("POST /", () => {
  // Positive Test Case: Bus route creation
  it("should create a new bus route successfully", async () => {
    const mockRequestBody = {
      busType: "60a3f1370f020b002298a2a6",
      routeName: "Sample Route",
      routeNumber: "123",
      beginning: "Start Location",
      destination: "End Location",
      intermediateStops: [
        {
          no: 1,
          stop: "Stop 1",
          fare: "5.00",
        },
        {
          no: 2,
          stop: "Stop 2",
          fare: "6.00",
        },
      ],
      distance: 20,
      travelTime: "2 hours",
      schedule: "Mon-Fri: 8 AM - 6 PM",
    };

    // Mock the BusRoute.create function to return a valid bus route
    BusRoute.create = jest.fn().mockResolvedValue(mockRequestBody);

    const response = await request(app).post("/").send(mockRequestBody);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("New bus route created successfully!");
    expect(response.body.data).toEqual(mockRequestBody);
  });

  // Negative Test Case: Error during bus route creation
  it("should return a 400 error if an error occurs during bus route creation", async () => {
    const mockRequestBody = {
      busType: "60a3f1370f020b002298a2a67", 
      routeName: "Sample Route",
      routeNumber: "123",
      beginning: "Start Location",
      destination: "End Location",
      intermediateStops: [
        {
          no: 1,
          stop: "Stop 1",
          fare: "5.00",
        },
        {
          no: 2,
          stop: "Stop 2",
          fare: "6.00",
        },
      ],
      distance: 20,
      travelTime: "2 hours",
      schedule: "Mon-Fri: 8 AM - 6 PM",
    };

    // Mock the BusRoute.create function to simulate an error
    BusRoute.create = jest
      .fn()
      .mockRejectedValue(new Error("Some error message"));

    const response = await request(app).post("/").send(mockRequestBody);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "An error occurred while creating a bus route"
    );
  });

  // Negative Test Case: Invalid request body
  it("should return a 400 error if the request body is invalid", async () => {
    const mockRequestBody = {
      busType: "60a3f1370f020b002298a2a6", 
      routeNumber: "123",
      beginning: "Start Location",
      destination: "End Location",
      intermediateStops: [
        {
          no: 1,
          stop: "Stop 1",
          fare: "5.00",
        },
        {
          no: 2,
          stop: "Stop 2",
          fare: "6.00",
        },
      ],
      distance: 20,
      travelTime: "2 hours",
      schedule: "Mon-Fri: 8 AM - 6 PM",
    };

    const response = await request(app).post("/").send(mockRequestBody);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "An error occurred while creating a bus route"
    );
  });
});
