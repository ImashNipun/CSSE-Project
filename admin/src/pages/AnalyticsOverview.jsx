import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaChartPie,
  FaUsers,
  FaMoneyBillWave,
  FaUserTie,
  FaSmile,
  FaMapMarkerAlt,
  FaBusAlt,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "../pages/Analytics.css";

const AnalyticsOverview = () => {
  const [numBusTypes, setNumBusTypes] = useState(0);

  const [numRoutes, setNumRoutes] = useState(0);

  const [busTypes, setBusTypes] = useState([]);

  const routedata = [
    {
      name: "Bus Types",
      count: numBusTypes,
    },
    {
      name: "Routes",
      count: numRoutes,
    },
  ];

  // const data = [
  //   {
  //     name: "Jan",
  //     firstWeek: 4000,
  //     secondWeek: 2400,
  //     thirdWeek: 3000,
  //     fourthWeek: 5000,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Feb",
  //     firstWeek: 3000,
  //     secondWeek: 1398,
  //     thirdWeek: 3500,
  //     fourthWeek: 4000,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Mar",
  //     firstWeek: 2000,
  //     secondWeek: 9800,
  //     thirdWeek: 2000,
  //     fourthWeek: 8000,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Apr",
  //     firstWeek: 2780,
  //     secondWeek: 3908,
  //     thirdWeek: 1000,
  //     fourthWeek: 3200,
  //     amt: 2000,
  //   },
  //   {
  //     name: "May",
  //     firstWeek: 1890,
  //     secondWeek: 4800,
  //     thirdWeek: 3600,
  //     fourthWeek: 9500,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Jun",
  //     firstWeek: 2390,
  //     secondWeek: 3800,
  //     thirdWeek: 5000,
  //     fourthWeek: 7500,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Jul",
  //     firstWeek: 3490,
  //     secondWeek: 4300,
  //     thirdWeek: 5600,
  //     fourthWeek: 5000,
  //     amt: 2100,
  //   },
  //   {
  //     name: "Aug",
  //     firstWeek: 3490,
  //     secondWeek: 4300,
  //     thirdWeek: 3000,
  //     fourthWeek: 5000,
  //     amt: 2100,
  //   },
  //   {
  //     name: "Sep",
  //     firstWeek: 3490,
  //     secondWeek: 4300,
  //     thirdWeek: 3000,
  //     fourthWeek: 5070,
  //     amt: 2100,
  //   },
  //   {
  //     name: "Oct",
  //     firstWeek: 3490,
  //     secondWeek: 4300,
  //     thirdWeek: 3000,
  //     fourthWeek: 5000,
  //     amt: 2100,
  //   },
  //   {
  //     name: "Nov",
  //     firstWeek: 3490,
  //     secondWeek: 4300,
  //     thirdWeek: 3500,
  //     fourthWeek: 7000,
  //     amt: 2100,
  //   },
  //   {
  //     name: "Dec",
  //     firstWeek: 3490,
  //     secondWeek: 4300,
  //     thirdWeek: 2000,
  //     fourthWeek: 6000,
  //     amt: 2100,
  //   },
  // ];

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/bustype/")
      .then((res) => {
        setNumBusTypes(res?.data?.data.length); // Set the number of bus types
        setBusTypes(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/busroute/")
      .then((res) => {
        setNumRoutes(res?.data?.data.length); // Set the number of routes
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card" data-testid="card">
          <div className="card-inner">
            <h3>No of Bus Types</h3>

            <FaBusAlt className="card_icon" />
          </div>
          <h1>{numBusTypes}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>No of Routes</h3>
            <FaMapMarkerAlt className="card_icon" />
          </div>
          <h1>{numRoutes}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Fare Collection</h3>
            <FaMoneyBillWave className="card_icon" />
          </div>
          <h1>$33</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Ticket Inspectors</h3>
            <FaUserTie className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className="bus-types-list">
        <h2>Bus Types List</h2>
        <ul>
          {busTypes.map((busType, index) => (
            <li key={index}>{busType.type}</li>
          ))}
        </ul>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data-testid="bar-chart"
            width={500}
            height={300}
            data={routedata}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#418886" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data-testid="line-chart"
            width={500}
            height={300}
            data={routedata}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#337b7f"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data-testid="bar-chart"
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="firstWeek" fill="#8884d8" />
            <Bar dataKey="secondWeek" fill="#82ca9d" />
            <Bar dataKey="thirdWeek" fill="#24817b" />
            <Bar dataKey="fourthWeek" fill="#491851" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data-testid="line-chart"
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="firstWeek"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="secondWeek" stroke="#82ca9d" />
            <Line type="monotone" dataKey="thirdWeek" stroke="#24817b" />
            <Line type="monotone" dataKey="fourthWeek" stroke="#491851" />
          </LineChart>
        </ResponsiveContainer> */}
      </div>
    </main>
  );
};

export default AnalyticsOverview;
