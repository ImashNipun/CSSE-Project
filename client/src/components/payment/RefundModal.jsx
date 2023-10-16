import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PayPalButton } from "react-paypal-button-v2";

const RefundModal = ({ isOpen, onClose, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .positive("Amount must be a positive number")
      .required("Amount is required"),
    transaction_id: Yup.string().required("Transaction ID is required"),
  });

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 `}
    >
      <div className="bg-white w-1/3 mx-h-1/2 overflow-y-auto p-4 rounded-lg">
        <div className=" flex flex-row justify-between">
          <span className="text-2xl font-bold mb-4">Add Credit</span>
          <img
            onClick={onClose}
            style={{ width: "30px", height: "30px" }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2az2oUQRDGf6dsPCgRNPFmbhHxpCe9KZIgRPQYkmdQQt4irgdFQbz6COqivkEQzya7ycn8YcXFszGSkoYSlnFme6amZ6Y35IMPFra7pr6pmp6q7oFTnFycBx4AbaADbAE/gUOl+72p/7V17BSRoAWsAB+BP4AUpJvzAVhWW7VjElgD9g3OZ3EPWFXbteAesBNQQJLbwEKVAlzon1coIMk3wJnQImaALzWKEOVnYDqUiFkNtzTEnvpQChd1GZWGuQNcsoqYbCidZESamZboVxE4Lwm+sCyxEinn84pw4etG4LBkcDvvS3MtAmfFw8d5orEXgaPi4a7vwV8xGL0JXAf6hrl9nXvLMHdplJBPBoPOEYerBcX0dY7DDcN1O6P6CUspPuxQXjGWOZLgEXAuTcjDEjn7HbimduaAg5xjr3jGioeLaUKeljCY9y6HiIQM8UmakE5Jo77IhIyEKN+mCekFMJx110NHQpSuoP0Pg0DG08RUIUKAH2lCDgNeIJlKIdNJhvirCSFzdQkZnJTU6o7hw75Zx/KbfCaKvDSlzPLbriASljFSgOtVlii+1SlkZBbThEyNWdH4O6toRDejx6WMf88ILBsM3tbGyNpYubl3QjdWrTFqdSfwYDUCR8XDRz4R/6ISwzapZLBXZMdxIQKHJYXHwF0K4mUEjkuCzzCgpRvHEgk38jzgWbgQ0bHCDCUxG7ANtrALXCYQphtKsw09bKrkMPS4JhGvqz57n6841bYsS6wVLd3a3w0o4Ju+sRv5AmJCi7eO7sUWdf5Iq9ilMktraLje4L5uY77Tfnow9FGN+/1V29N1bYrOBvfiFMSBv49GF6BdKh2TAAAAAElFTkSuQmCC"
          />
        </div>

        <Formik
          initialValues={{ amount: "", transaction_id: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <Field
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter the amount"
                className="mt-1 p-2 w-full rounded-md border border-gray-300"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Transaction ID
              </label>
              <Field
                type="text"
                id="transaction_id"
                name="transaction_id"
                placeholder="Enter the transaction id"
                className="mt-1 p-2 w-full rounded-md border border-gray-300"
              />
              <ErrorMessage
                name="transaction_id"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RefundModal;
