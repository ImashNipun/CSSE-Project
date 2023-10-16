import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const BusRoutesList = () => {
  const [busRoutes, setBusRoutes] = useState([]);

  //call backend API - retriew busroutes
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/busroute/")
      .then((res) => {
        setBusRoutes(res?.data?.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="mx-auto mt-4 ml-10 mr-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p>View all bus routes</p>
          </div>

          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            <Link to="/add-bus-routes">Add routes</Link>
          </button>
        </div>

        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {/* table */}
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bus Type
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Route name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Route number
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Begining
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Destination
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Distance
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Travel time
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {busRoutes.map((busRoutes, index) => {
                      return (
                        <tr key={index}>
                          <td class="px-6 py-4 whitespace-nowrap">#</td>
                          <td class="px-6 py-4 whitespace-nowrap">Normal</td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            {busRoutes.routeName}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            {busRoutes.routeNumber}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            {busRoutes.beginning}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            {busRoutes.destination}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            {busRoutes.distance}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            {busRoutes.travelTime}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap flex text-xl">
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
