import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const BusTypeList = () => {
  
  const [busTypes, setBusTypes] = useState([]);

  const [isDeleted, setIsDeleted] = useState(false);

  //call backend API - retriew bustypes
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/bustype/")
      .then((res) => {
        setBusTypes(res?.data?.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isDeleted]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Do you want to delete this type?");

    if (confirm) {
      axios
        .delete(`http://localhost:8000/api/v1/bustype/${id}`)
        .then((res) => {
          setIsDeleted(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsDeleted(false);
  };

  return (
    <>
      <div className="mx-auto mt-4 ml-10 mr-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p>
              <b>View all bus types</b>
            </p>
          </div>

          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            <Link to="/add-bus-types">Add a bus type</Link>
          </button>
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
                        Type Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Type Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {busTypes.map((busTypes, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">#</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {busTypes.no}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {busTypes.type}
                          </td>
                          <td className="flex px-6 py-4 text-xl whitespace-nowrap">
                            <Link to="/#" className="me-4">
                              <AiOutlineEye />
                            </Link>
                            <Link to="/#" className="me-4">
                              <AiOutlineEdit />
                            </Link>
                            <Link to="/bus-types">
                              <AiOutlineDelete
                                onClick={() => handleDelete(busTypes._id)}
                              />
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

export default BusTypeList;
