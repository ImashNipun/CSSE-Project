// import { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import react_logo from "../../assets/react.svg";

// function ProfilePage() {
//   const [profilePic, setProfilePic] = useState(null);

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("Required"),
//     lastName: Yup.string().required("Required"),
//     email: Yup.string().email("Invalid email address").required("Required"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .required("Required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Required"),
//   });

//   const onSubmit = (values) => {
//     console.log(values);
//   };

//   const handleProfilePicChange = (event) => {
//     setProfilePic(event.target.files[0]);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="mt-8 mb-4 flex flex-col items-center">
//         <img
//           src={react_logo}
//           alt="Profile Pic"
//           className="w-32 h-32 rounded-full object-cover"
//         />
//         <div className="mt-2">
//           <input type="file" onChange={handleProfilePicChange} />
//         </div>
//       </div>
//       <div className="w-full">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           {({ errors, touched }) => (
//             <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//               <div className="mb-4">
//                 <label
//                   htmlFor="firstName"
//                   className="block text-gray-700 font-bold mb-2"
//                 >
//                   First Name
//                 </label>
//                 <Field
//                   type="text"
//                   name="firstName"
//                   id="firstName"
//                   className={
//                     "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
//                     (errors.firstName && touched.firstName
//                       ? " border-red-500"
//                       : "")
//                   }
//                 />
//                 <ErrorMessage
//                   name="firstName"
//                   component="div"
//                   className="text-red-500 text-xs italic"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-gray-700 font-bold mb-2"
//                 >
//                   Last Name
//                 </label>
//                 <Field
//                   type="text"
//                   name="lastName"
//                   id="lastName"
//                   className={
//                     "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
//                     (errors.lastName && touched.lastName
//                       ? " border-red-500"
//                       : "")
//                   }
//                 />
//                 <ErrorMessage
//                   name="lastName"
//                   component="div"
//                   className="text-red-500 text-xs italic"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-gray-700 font-bold mb-2"
//                 >
//                   Email
//                 </label>
//                 <Field
//                   type="email"
//                   name="email"
//                   id="email"
//                   className={
//                     "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
//                     (errors.email && touched.email ? " border-red-500" : "")
//                   }
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-xs italic"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-gray-700 font-bold mb-2"
//                 >
//                   Password
//                 </label>
//                 <Field
//                   type="password"
//                   name="password"
//                   id="password"
//                   className={
//                     "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
//                     (errors.password && touched.password
//                       ? " border-red-500"
//                       : "")
//                   }
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-xs italic"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-gray-700 font-bold mb-2"
//                 >
//                   Confirm Password
//                 </label>
//                 <Field
//                   type="password"
//                   name="confirmPassword"
//                   id="confirmPassword"
//                   className={
//                     "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
//                     (errors.confirmPassword && touched.confirmPassword
//                       ? " border-red-500"
//                       : "")
//                   }
//                 />
//                 <ErrorMessage
//                   name="confirmPassword"
//                   component="div"
//                   className="text-red-500 text-xs italic"
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 >
//                   Save
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hook/useAuth";
import { config } from "../../config/config";
import axios from "axios";

const UserProfile = () => {
  const { auth, onLogout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [deletemodalOpen, setDeleteModalOpen] = useState(false);
  // const user = {
  //   name: 'John Doe',
  //   username: 'johndoe',
  //   bio: 'Front-end Developer | Cat Lover | Coffee Enthusiast',
  //   location: 'New York, USA',

  //   profilePicUrl: 'https://placekitten.com/200/200',
  //   email: 'johndoe@example.com',
  //   password: '********', // Replace with user's actual password
  // };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    bio: Yup.string(),
    location: Yup.string(),
    website: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      location: "",
      website: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await axios.put(
          `${config.BASE_URL}/api/v1/users/${auth?.user?._id}`,
          {
            user_name: values.name,
            user_bio: values.bio,
            user_address: values.location,
            user_contact: values.website,
          }
        );

        setIsUserUpdated((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleAccountDelete = async () => {
    try {
      const result = await axios.delete(
        `${config.BASE_URL}/api/v1/users/${auth?.user?._id}`
      );
      onLogout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `${config.BASE_URL}/api/v1/users/${auth?.user?._id}`
      );
      console.log(data?.data);
      setUser(data?.data);
      formik.setFieldValue("name", data?.data?.user_name);
      formik.setFieldValue("bio", data?.data?.user_bio);
      formik.setFieldValue("location", data?.data?.user_address);
      formik.setFieldValue("website", data?.data?.user_contact);
    };
    fetchUser();
  }, [isUserUpdated]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="text-center">
        <img
          src="https://placekitten.com/200/200"
          alt={`profile picture`}
          className="w-32 h-32 mx-auto rounded-full object-cover"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.user_name}</h2>
        <p className="text-gray-600">@{user.user_name}</p>
        <p className="text-gray-600">{user.user_address}</p>
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-6">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded-lg p-2"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-600 text-sm mt-2">
              {formik.errors.name}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-600"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-600"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-600"
          >
            Contact number
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded-lg p-2"
          />
          {formik.touched.website && formik.errors.website && (
            <div className="text-red-600 text-sm mt-2">
              {formik.errors.website}
            </div>
          )}
        </div>
        <div class="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete Account
          </button>
        </div>
      </form>
      {deletemodalOpen ? (
        <div
          className={`fixed inset-0 flex items-center justify-center transition-opacity ${
            deletemodalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>

          <div className="bg-white p-4 rounded-lg z-10">
            <p className="mb-4">Are you sure you want to confirm?</p>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleAccountDelete}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
