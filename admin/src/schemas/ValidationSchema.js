import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  routeName: Yup.string().required("Required"),
  routeNumber: Yup.string().required("Required"),
  beginning: Yup.string().required("Required"),
  destination: Yup.string().required("Required"),
  // intermediateStops: Yup.string().required("Required"),
  distance: Yup.string().required("Required"),
  travelTime: Yup.string().required("Required"),
  schedule: Yup.string().required("Required"),
});
