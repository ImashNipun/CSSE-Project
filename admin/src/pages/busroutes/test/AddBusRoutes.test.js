import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import AddBusRoutes from "../AddBusRoutes";

jest.mock("axios"); // Mock axios to simulate API requests

describe("AddBusRoutes Component", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: "Success" });
    axios.get.mockResolvedValue({
      data: { data: [{ _id: "1", type: "Bus Type 1" }] },
    });
  });

  it("submits the form with valid data and displays success message", async () => {
    render(<AddBusRoutes />);

    // Positive Assertion: Form submission with valid data
    // displays the success message and clears the form fields after submission

    // Fill in form fields with valid data
    fireEvent.change(screen.getByLabelText("Route name"), {
      target: { value: "Sample Route" },
    });
    fireEvent.change(screen.getByLabelText("Rote number"), {
      target: { value: "123" },
    });

    // Mock the select element value
    fireEvent.change(screen.getByLabelText("Bus Type"), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByText("Submit"));

    // Wait for the success alert
    await waitFor(() => {
      expect(screen.getByText("Succsessfully added.")).toBeInTheDocument(); // Positive Assertion
    });

    // Ensure the form is cleared after successful submission
    expect(screen.getByLabelText("Route name")).toHaveValue("");
    expect(screen.getByLabelText("Rote number")).toHaveValue("");
  });

  it("displays error messages for required fields when submitting with invalid data", async () => {
    render(<AddBusRoutes />);

    // Negative Assertion: Submitting the form without filling in any data
    // should display error messages for the required fields

    // Submit the form without filling in any data
    fireEvent.click(screen.getByText("Submit"));

    // Ensure that error messages are displayed for the required fields
    expect(screen.getByText("Route name is required")).toBeInTheDocument(); // Negative Assertion
    expect(screen.getByText("Rote number is required")).toBeInTheDocument(); // Negative Assertion
  });

  it("displays an error message when the API request fails", async () => {
    axios.post.mockRejectedValue(new Error("API Error"));
    render(<AddBusRoutes />);

    // Negative Assertion: An error message should be displayed when
    // an API request fails during form submission

    // Fill in form fields with valid data
    fireEvent.change(screen.getByLabelText("Route name"), {
      target: { value: "Sample Route" },
    });
    fireEvent.change(screen.getByLabelText("Rote number"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Bus Type"), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByText("Submit"));

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText("API Error")).toBeInTheDocument(); // Negative Assertion
    });
  });
});
