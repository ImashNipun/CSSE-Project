import * as Yup from "yup";

export const busRouteValidationSchema = Yup.object().shape({
  routeName: Yup.string().required("Required"),
  routeNumber: Yup.string().required("Required"),
  beginning: Yup.string().required("Required"),
  destination: Yup.string().required("Required"),
  // intermediateStops: Yup.string().required("Required"),
  distance: Yup.string().required("Required"),
  travelTime: Yup.string().required("Required"),
  schedule: Yup.string().required("Required"),
});

export const busTypeValidationSchema = Yup.object().shape({
  no: Yup.string()
    .matches(/^[1-9]\d*$/, "Only positive numbers are allowed")
    .required("Required"),
  type: Yup.string().required("Required"),
});

export const fareCycleValidationSchema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  fare: Yup.array().of(
    Yup.object().shape({
      // no: Yup.number().required("Fare number is required"),
      price: Yup.string()
        .required("Price is required")
        .min(0, "Price must be greater than or equal to 0")
        .max(10000, "Price must be less than or equal to 10,000")
        .test(
          "is-valid-price",
          "Price can not contain letters, special characters, and spaces",
          (value) => {
            return /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString());
          }
        ),
    })
  ),
});
