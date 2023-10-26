import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const BusRoutesList = () => {
  const [busRoutes, setBusRoutes] = useState([]);

  const navigate = useNavigate();

  //call backend API - retriew busroutes
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/busroute/")
      .then((res) => {
        setBusRoutes(res?.data?.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigateToReportPage = () => {
    navigate("/#", {
      replace: true,
      state: {
        busRoutes,
      },
    });
  };

  return (
    <>
      <div className="mx-auto mt-4 ml-10 mr-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p>
              <b>View all bus routes</b>
            </p>
          </div>

          <div className="flex">
            <Link to="/add-bus-routes" className="me-5">
              <Button type="" name="Add routes"></Button>
            </Link>

            <button
              className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-100"
              onClick={navigateToReportPage}
            >
              Report
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                {/* table */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Bus Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Route name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Route number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Begining
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Destination
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Distance
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Travel time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {busRoutes.map((busRoutes, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">#</td>
                          <td className="px-6 py-4 whitespace-nowrap">Normal</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {busRoutes.routeName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {busRoutes.routeNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {busRoutes.beginning}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {busRoutes.destination}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {busRoutes.distance}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {busRoutes.travelTime}
                          </td>
                          <td className="flex px-6 py-4 text-xl whitespace-nowrap">
                            <Link to="/#" className="me-4">
                              <AiOutlineEye />
                            </Link>
                            <Link to="/update-bus-route" className="me-4">
                              <AiOutlineEdit />
                            </Link>
                            <Link to="/#">
                              <AiOutlineDelete />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusRoutesList;
