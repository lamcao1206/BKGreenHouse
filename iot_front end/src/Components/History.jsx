import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function WaterControlCard() {
  const [selectedData, setSelectedData] = useState("Temperature");
  const [historyData, setHistoryData] = useState([]);
  const [date, setDate] = useState("");

  const getApiUrl = (type) => {
    switch (type) {
      case "Temperature":
        return "http://127.0.0.1:3000/history/temp";
      case "Air Humidity":
        return "http://127.0.0.1:3000/history/humidity";
      case "Soil Moisture":
        return "http://127.0.0.1:3000/history/soil";
      case "All":
        return "http://127.0.0.1:3000/history/all";
      default:
        return "http://127.0.0.1:3000/history/temp";
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(getApiUrl(selectedData));
      if (res.data.status === "success") {
        setHistoryData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedData]);

  const handleSearch = () => {
    if (!date) return;

    const filtered = historyData.filter((item) => item.date === date);
    setHistoryData(filtered);
  };

  return (
    <div className="container-fluid bg-lime-200 p-2">
      <div
        className="bg-white shadow-lg rounded-xl p-6 mt-5 "
        style={{ width: "80vw", marginLeft: "9vw", marginBottom: "9vh" }}
      >
        <h1 className="text-center text-3xl font-bold text-gray-800">
          History
        </h1>

        <div className="justify-content-center d-flex flex-row ">
          <div
            className="d-flex justify-content-between"
            style={{ width: "90%" }}
          >
            {/* Radio Buttons */}
            <div className="ms-4 m-2 border-black" style={{ width: "48%" }}>
              <div className="mt-3">
                <p className="text-lg font-medium text-black mt-2">
                  Choose data you want to see:
                </p>
                <div className="mt-4 space-x-6">
                  {["Temperature", "Air Humidity", "Soil Moisture", "All"].map(
                    (item) => (
                      <label key={item} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="data"
                          value={item}
                          className="form-radio text-blue-600"
                          checked={selectedData === item}
                          onChange={(e) => {
                            setSelectedData(e.target.value);
                            setDate(""); // Reset date filter
                          }}
                        />
                        <span className="ml-2 text-black">{item}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Date Picker & Buttons */}
            <div className="m-2 border-black" style={{ width: "48%" }}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col">
                  <label className="font-medium text-gray-700 mt-3 mb-2">
                    Search by date:
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-md p-2 w-64 mt-1 shadow-sm focus:ring focus:ring-blue-200"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ width: "290px" }}
                  />
                </div>

                <button
                  className="btn btn-success ms-2 mt-5"
                  style={{ borderRadius: "10px" }}
                  onClick={handleSearch}
                >
                  Search
                </button>

                <Link to="/MainPage" className="btn btn-danger mt-5">
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Table Display */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-sm text-center">
            <thead>
              <tr className="bg-gradient-to-r from-green-400 to-green-800 text-white">
                <th className="py-2 px-4 border" style={{ width: "400px" }}>
                  Date
                </th>
                <th className="py-2 px-4 border">Highest Data</th>
                <th className="py-2 px-4 border">Lowest Data</th>
              </tr>
            </thead>
            <tbody>
              {historyData.length > 0 ? (
                historyData.map((item, idx) => (
                  <tr key={idx} className="text-center border">
                    <td className="py-2 px-4 border">{item.date}</td>
                    <td className="py-2 px-4 border">
                      {selectedData === "Temperature" && item.max_temperature}
                      {selectedData === "Air Humidity" && item.max_humidity}
                      {selectedData === "Soil Moisture" &&
                        item.max_soil_moisture}
                      {selectedData === "All" &&
                        `Temp: ${item.max_temperature}, Humid: ${item.max_humidity}, Soil: ${item.max_soil_moisture}`}
                    </td>
                    <td className="py-2 px-4 border">
                      {selectedData === "Temperature" && item.min_temperature}
                      {selectedData === "Air Humidity" && item.min_humidity}
                      {selectedData === "Soil Moisture" &&
                        item.min_soil_moisture}
                      {selectedData === "All" &&
                        `Temp: ${item.min_temperature}, Humid: ${item.min_humidity}, Soil: ${item.min_soil_moisture}`}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 border" colSpan="3">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
