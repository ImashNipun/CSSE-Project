import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FiMail, FiMapPin, FiPhone, FiGlobe } from "react-icons/fi";
import generatePDF from "react-to-pdf";
import "../busroutes/pdf.css";

const BusRoutePdf = (props) => {
  const location = useLocation();

  const [busRoutes, setBusRoutes] = useState(location.state.busRoutes);

  const targetRef = useRef();

  const generatePdfButtonRef = useRef(null);

  useEffect(() => {
    // Check if the event listener is already added to the button
    if (generatePdfButtonRef.current && !generatePdfButtonRef.current.clicked) {
      generatePdfButtonRef.current.clicked = true; // Mark the button as clicked

      generatePdfButtonRef.current.addEventListener("click", function () {
        // Hide the button
        generatePdfButtonRef.current.style.display = "none";

        // Generate the PDF
        generatePDF(targetRef, {
          filename: "Bus Route Details Report.pdf",
          onComplete: function () {
            generatePdfButtonRef.current.style.display = "block";
            generatePdfButtonRef.current.clicked = false;
          },
        });
      });
    }
  }, []);

  return (
    <div>
      <div ref={targetRef}>
        <div className="letterhead-container">
          <div className="blue-line"></div>
          <img
            className="company-logo mb-2"
            src={logo}
            alt="Company Logo"
            style={{ width: "400px" }}
          />
          <p style={{ fontSize: "20px" }}>
            20 Mile Post Avenue, Colombo 03, Sri Lanka
          </p>

          <div className="contact-info" style={{ fontSize: "18px" }}>
            <p>
              <FiGlobe style={{ marginRight: "10px", fontSize: "18px" }} />
              routewallet.com
            </p>
            <p>
              <FiMail
                style={{
                  marginRight: "10px",
                  fontSize: "18px",
                  fontWeight: "",
                }}
              />
              routewallet@gmail.com
            </p>
            <p>
              <FiPhone style={{ marginRight: "10px", fontSize: "18px" }} />
              (+94) ( 011) 3007458
            </p>
          </div>

          <div className="blue-line-last"></div>
        </div>

        <div
          style={{
            fontSize: "18px",
            paddingLeft: "150px",
            paddingRight: "150px",
          }}
          className="mb-5"
        >
          <h2 className="my-5 bold-heading">Route Wallet Bus Route Report</h2>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="btn btn-primary"
              id="generate-pdf-button"
              ref={generatePdfButtonRef}
            >
              Download PDF
            </button>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="mt-3"
          >
            <table style={{ width: "100%", border: "1px solid black" }}>
              <thead style={{ width: "100%", border: "1px solid black" }}>
                <tr style={{ border: "1px solid black" }}>
                  <th style={{ border: "1px solid black" }}>#</th>
                  {/* <th style={{ border: "1px solid black" }}>Bus Type</th> */}
                  <th style={{ border: "1px solid black" }}>Route Name</th>
                  <th style={{ border: "1px solid black" }}>Route Number</th>
                  <th style={{ border: "1px solid black" }}>Begining</th>
                  <th style={{ border: "1px solid black" }}>Destination</th>
                  <th style={{ border: "1px solid black" }}>Distance</th>
                  <th style={{ border: "1px solid black" }}>Travel Time</th>
                </tr>
              </thead>
              <tbody style={{ width: "100%", border: "1px solid black" }}>
                {busRoutes
                  ? busRoutes.map((busRoutes, index) => (
                      <tr key={index + 1}>
                        <td style={{ border: "1px solid black" }}>
                          {index + 1}
                        </td>
                        <td style={{ border: "1px solid black" }}>
                          {busRoutes.routeName}
                        </td>
                        <td style={{ border: "1px solid black" }}>
                          {busRoutes.routeNumber}
                        </td>
                        <td style={{ border: "1px solid black" }}>
                          {busRoutes.beginning}
                        </td>
                        <td style={{ border: "1px solid black" }}>
                          {busRoutes.destination}
                        </td>
                        <td style={{ border: "1px solid black" }}>
                          {busRoutes.distance}
                        </td>
                        <td style={{ border: "1px solid black" }}>
                          {busRoutes.travelTime}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusRoutePdf;
