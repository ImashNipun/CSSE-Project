import React from "react";
import { render } from "@testing-library/react";
import AnalyticsOverview from "./AnalyticsOverview"; // Adjust the import path as needed

describe("AnalyticsOverview Component", () => {
  it("renders the component without errors", () => {
    render(<AnalyticsOverview />);
  });

  it("displays the correct number of cards", () => {
    const { getAllByTestId } = render(<AnalyticsOverview />);
    const cards = getAllByTestId("card");
    expect(cards).toHaveLength(4); // Assuming you have 4 cards
  });

  it("displays the correct chart components", () => {
    const { getAllByTestId } = render(<AnalyticsOverview />);
    const barChart = getAllByTestId("bar-chart");
    const lineChart = getAllByTestId("line-chart");

    expect(barChart).toHaveLength(1);
    expect(lineChart).toHaveLength(1);
  });

  it("displays the correct card values", () => {
    const { getByTestId } = render(<AnalyticsOverview />);
    const fareCollected = getByTestId("fare-collected");
    const noOfRoutes = getByTestId("no-of-routes");
    const customers = getByTestId("customers");
    const alerts = getByTestId("alerts");

    expect(fareCollected).toHaveTextContent("Rs.300");
    expect(noOfRoutes).toHaveTextContent("12");
    expect(customers).toHaveTextContent("33");
    expect(alerts).toHaveTextContent("42");
  });
});
