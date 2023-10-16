import mongoose from "mongoose";

const busRouteSchema = new mongoose.Schema({
  busType: {
    type: mongoose.Schema.Types.ObjectId, // Reference to BusType model
    ref: "BusType",
    // required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
  routeNumber: {
    type: String,
    required: true,
  },
  beginning: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  intermediateStops: [
    {
      no: Number,
      stop: String,
      fare: {
        type: mongoose.Schema.Types.ObjectId, // Reference to FareCycle model
        ref: "FareCycle",
      },
    },
  ],
  distance: {
    type: Number,
    required: true,
  },
  travelTime: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
});

const busRouteModel = mongoose.model("BusRoute", busRouteSchema);

export default busRouteModel;
