import React from "react";
import { useState, useEffect } from "react";

export default function Temperature() {
  const [isOn, setIsOn] = useState(null);
  // const [flowRate, setFlowRate] = useState(null);

  // const [lighton, setlighton] = useState(null);
  // const [lightrate, setlightrate] = useState(null);

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedTime, setSelectedTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  const toggleWater = () => {
    if (!isRunning) {
      setIsOn(true);
      setIsRunning(true);
      setTimeRemaining(selectedTime);

      // Start countdown timer
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Stop watering when time is up
            setIsOn(false);
            setIsRunning(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Manual stop
      setIsOn(false);
      setIsRunning(false);
      setTimeRemaining(0);
    }
  };

  // const toggleLight = () => setlighton(!lighton);

  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [light, setLight] = useState(null);
  const [soil, setSoil] = useState(null);
  const [ai, setAi] = useState(null);

  const [error, setError] = useState(null);

  // const temperature = 28; // Sample temperature data
  // const humidity = 65; // Sample humidity data
  // const light = 350; // Sample light data

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BASE_API}/sensor/temp/stream`
    );

    const eventSource1 = new EventSource(
      `${import.meta.env.VITE_BASE_API}/sensor/light/stream`
    );

    const eventSource2 = new EventSource(
      `${import.meta.env.VITE_BASE_API}/sensor/humidity/stream`
    );

    const eventSource3 = new EventSource(
      `${import.meta.env.VITE_BASE_API}/sensor/soil/stream`
    );

    const eventSource4 = new EventSource(
      `${import.meta.env.VITE_BASE_API}/sensor/ai/stream`
    );

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.topic === "temperature") {
          setTemperature(data.data);
        }
      } catch (error) {
        console.error("Error parsing temperature data:", error);
        setError("Error parsing temperature data");
      }
    };

    eventSource1.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.topic === "light") {
          setLight(data.data);
        }
      } catch (error) {
        console.error("Error parsing light data:", error);
        setError("Error parsing light data");
      }
    };

    eventSource2.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.topic === "humidity") {
          setHumidity(data.data);
        }
      } catch (error) {
        console.error("Error parsing Humidity data:", error);
        setError("Error parsing Humidity data");
      }
    };

    eventSource3.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.topic === "soil_moisture") {
          setSoil(data.data);
        }
      } catch (error) {
        console.error("Error parsing Soil data:", error);
        setError("Error parsing Soil data");
      }
    };

    eventSource4.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.topic === "ai") {
          setAi(data.data);
        }
      } catch (error) {
        console.error("Error parsing Ai data:", error);
        setError("Error parsing Ai data");
      }
    };

    eventSource.onerror = () => {
      setError("Error connecting to the server");
      eventSource.close();
    };

    eventSource1.onerror = () => {
      setError("Error connecting to the server");
      eventSource1.close();
    };

    eventSource2.onerror = () => {
      setError("Error connecting to the server");
      eventSource2.close();
    };

    eventSource3.onerror = () => {
      setError("Error connecting to the server");
      eventSource3.close();
    };

    eventSource4.onerror = () => {
      setError("Error connecting to the server");
      eventSource4.close();
    };

    return () => {
      eventSource.close();
      eventSource1.close();
      eventSource2.close();
      eventSource3.close();
      eventSource4.close();
    };
  }, []);

  return (
    <section
      className="container-fluid"
      style={{
        background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
      }}
    >
      <div className="justify-content-center d-flex flex-column">
        {/* Phần 3 card */}
        <div className="container-fluid py-4">
          {/* Hero Section */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="text-center text-black mt-5">
                <h1
                  className="display-4 fw-bold mb-3"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
                >
                  🌿 BK GreenHouse Dashboard
                </h1>
                <p className="lead">
                  Monitor and control your smart greenhouse system
                </p>
              </div>
            </div>
          </div>

          <div className="d-flex flex-row ms-5">
            <div className="col-md-4 ms-5 me-4 mt-4">
              <div
                className=" card welcome-section mb-4 align-items-center justify-content-center d-flex flex-column transition-all duration-700 hover:scale-105 hover:shadow-xl"
                style={{
                  width: "120%",
                  height: "300px",
                  border: "3px solid black",
                  borderRadius: "30px",
                }}
              >
                <h1 className="mt-5 text-white animate-bounce">Welcome back</h1>
                <h2>BK GreenHouse</h2>
                <p className="text-white fw-bold">
                  Let's check out your garden !{" "}
                  <a className="btn btn-primary">Learn more</a>{" "}
                </p>
              </div>
            </div>

            <div className="col-md-6 offset-md-1 mt-5">
              <div className="row h-100 ">
                {/* Temperature Analytics Card - Compact Version */}
                <div className="col-md-6">
                  <div
                    className="card shadow-lg h-100"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                      border: "none",
                      borderRadius: "25px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      maxHeight: "280px", // Giới hạn chiều cao
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-5px) scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 30px rgba(0,0,0,0.1)";
                    }}
                  >
                    {/* Header - Compact */}
                    <div
                      className="card-header text-center py-2 border-0"
                      style={{ background: "transparent" }}
                    >
                      <div
                        className="d-inline-block p-2 rounded-circle mb-1"
                        style={{ background: "rgba(255,255,255,0.3)" }}
                      >
                        <i className="fas fa-thermometer-half text-white"></i>
                      </div>
                      <h6
                        className="text-white fw-bold mb-0"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Temperature Analytics
                      </h6>
                    </div>

                    {/* Body - Compact */}
                    <div className="card-body p-2 ">
                      {/* Stats Grid - Smaller */}
                      <div className="row g-1 text-center mb-2">
                        <div className="col-4">
                          <div
                            className="p-2 rounded-3"
                            style={{ background: "rgba(220, 53, 69, 0.2)" }}
                          >
                            <i
                              className="fas fa-arrow-up text-danger mb-1 d-block"
                              style={{ fontSize: "0.8rem" }}
                            ></i>
                            <h6
                              className="text-white fw-bold mb-0"
                              style={{ fontSize: "0.8rem" }}
                            >
                              42°C
                            </h6>
                            <small
                              className="text-white-50"
                              style={{ fontSize: "0.6rem" }}
                            >
                              Highest
                            </small>
                          </div>
                        </div>

                        <div className="col-4">
                          <div
                            className="p-2 rounded-3"
                            style={{ background: "rgba(13, 110, 253, 0.2)" }}
                          >
                            <i
                              className="fas fa-arrow-down text-primary mb-1 d-block"
                              style={{ fontSize: "0.8rem" }}
                            ></i>
                            <h6
                              className="text-white fw-bold mb-0"
                              style={{ fontSize: "0.8rem" }}
                            >
                              20°C
                            </h6>
                            <small
                              className="text-white-50"
                              style={{ fontSize: "0.6rem" }}
                            >
                              Lowest
                            </small>
                          </div>
                        </div>

                        <div className="col-4">
                          <div
                            className="p-2 rounded-3"
                            style={{ background: "rgba(255, 193, 7, 0.2)" }}
                          >
                            <i
                              className="fas fa-chart-bar text-warning mb-1 d-block"
                              style={{ fontSize: "0.8rem" }}
                            ></i>
                            <h6
                              className="text-white fw-bold mb-0"
                              style={{ fontSize: "0.8rem" }}
                            >
                              22°C
                            </h6>
                            <small
                              className="text-white-50"
                              style={{ fontSize: "0.6rem" }}
                            >
                              Range
                            </small>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar - Smaller */}
                      <div className="mb-2 mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small
                            className="text-white fw-bold"
                            style={{ fontSize: "1.0rem" }}
                          >
                            Today's Range
                          </small>
                          <small
                            className="text-white fw-bold"
                            style={{ fontSize: "0.7rem" }}
                          >
                            20°C - 38°C
                          </small>
                        </div>
                        <div
                          className="progress"
                          style={{
                            height: "4px",
                            background: "rgba(255,255,255,0.2)",
                          }}
                        >
                          <div
                            className="progress-bar"
                            style={{
                              width: "75%",
                              background:
                                "linear-gradient(90deg, #007bff, #dc3545)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data History Card */}
                <div className="col-md-6">
                  <div
                    className="card shadow-lg h-100 ms-3"
                    style={{
                      background:
                        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                      border: "none",
                      borderRadius: "25px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      maxHeight: "280px", // Giới hạn chiều cao
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-5px) scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 30px rgba(0,0,0,0.1)";
                    }}
                  >
                    {/* Header */}
                    <div
                      className="card-header text-center py-2 border-0"
                      style={{ background: "transparent" }}
                    >
                      <div
                        className="d-inline-block p-2 rounded-circle mb-1"
                        style={{ background: "rgba(255,255,255,0.3)" }}
                      >
                        <i className="fas fa-history text-primary"></i>
                      </div>
                      <h6
                        className="text-dark fw-bold mb-0"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Data History
                      </h6>
                    </div>

                    {/* Body */}
                    <div className="card-body p-2 text-center">
                      {/* History Stats */}
                      <div className="row g-1 mb-2">
                        <div className="col-6">
                          <div
                            className="p-2 rounded-3"
                            style={{ background: "rgba(255,255,255,0.4)" }}
                          >
                            <i
                              className="fas fa-database text-info mb-1 d-block"
                              style={{ fontSize: "0.9rem" }}
                            ></i>
                            <h6
                              className="text-primary fw-bold mb-0"
                              style={{ fontSize: "0.8rem" }}
                            >
                              54
                            </h6>
                            <small
                              className="text-muted"
                              style={{ fontSize: "0.6rem" }}
                            >
                              Records
                            </small>
                          </div>
                        </div>

                        <div className="col-6">
                          <div
                            className="p-2 rounded-3"
                            style={{ background: "rgba(255,255,255,0.4)" }}
                          >
                            <i
                              className="fas fa-calendar text-success mb-1 d-block"
                              style={{ fontSize: "0.9rem" }}
                            ></i>
                            <h6
                              className="text-success fw-bold mb-0"
                              style={{ fontSize: "0.8rem" }}
                            >
                              16
                            </h6>
                            <small
                              className="text-muted"
                              style={{ fontSize: "0.6rem" }}
                            >
                              Days
                            </small>
                          </div>
                        </div>
                      </div>

                      {/* Mini Timeline */}
                      <div className="row g-1 mb-2 mt-4">
                        <div className="col-3 text-center">
                          <div
                            style={{
                              height: "18px",
                              width: "4px",
                              background: "#28a745",
                              margin: "0 auto",
                              borderRadius: "2px",
                            }}
                          ></div>
                          <small
                            className="text-muted d-block"
                            style={{ fontSize: "1.0rem" }}
                          >
                            Today
                          </small>
                        </div>
                        <div className="col-3 text-center">
                          <div
                            style={{
                              height: "18px",
                              width: "4px",
                              background: "#ffc107",
                              margin: "0 auto",
                              borderRadius: "2px",
                            }}
                          ></div>
                          <small
                            className="text-muted d-block"
                            style={{ fontSize: "1.0rem" }}
                          >
                            Week
                          </small>
                        </div>
                        <div className="col-3 text-center">
                          <div
                            style={{
                              height: "18px",
                              width: "4px",
                              background: "#dc3545",
                              margin: "0 auto",
                              borderRadius: "2px",
                            }}
                          ></div>
                          <small
                            className="text-muted d-block"
                            style={{ fontSize: "1.0rem" }}
                          >
                            Month
                          </small>
                        </div>
                        <div className="col-3 text-center">
                          <div
                            style={{
                              height: "18px",
                              width: "4px",
                              background: "#6c757d",
                              margin: "0 auto",
                              borderRadius: "2px",
                            }}
                          ></div>
                          <small
                            className="text-muted d-block"
                            style={{ fontSize: "1.0rem" }}
                          >
                            Year
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1
            className="text-black text-center mb-5 fw-bold mt-5"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
          >
            📊 Real-time Sensor Data
          </h1>

          {/* Main Sensor Grid */}
          <div className="container-fluid px-4">
            <div className="row g-4 justify-content-center">
              {/* Temperature Card */}
              <div className="col-lg-3 col-md-6">
                <div
                  className="card h-100 border-0 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px rgba(255, 107, 107, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(0,0,0,0.1)";
                  }}
                >
                  <div className="card-body p-4 text-center text-white">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <i className="fas fa-thermometer-half fa-2x"></i>
                    </div>
                    <h6
                      className="text-uppercase fw-bold mb-2"
                      style={{ letterSpacing: "1px", fontSize: "0.85rem" }}
                    >
                      Temperature
                    </h6>
                    <div className="mb-3">
                      {error ? (
                        <h3 className="fw-bold text-warning">Error</h3>
                      ) : (
                        <h2
                          className="fw-bold mb-0"
                          style={{ fontSize: "2.5rem" }}
                        >
                          {temperature}°C
                        </h2>
                      )}
                    </div>

                    <div className="row g-2 text-center">
                      <div className="">
                        <small className="text-muted d-block">Unit</small>
                        <strong>Celsius (°C)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Humidity Card */}
              <div className="col-lg-3 col-md-6">
                <div
                  className="card h-100 border-0 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px rgba(79, 172, 254, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(0,0,0,0.1)";
                  }}
                >
                  <div className="card-body p-4 text-center text-white">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <i className="fas fa-tint fa-2x"></i>
                    </div>
                    <h6
                      className="text-uppercase fw-bold mb-2"
                      style={{ letterSpacing: "1px", fontSize: "0.85rem" }}
                    >
                      Air Humidity
                    </h6>
                    <div className="mb-3">
                      {error ? (
                        <h3 className="fw-bold text-warning">Error</h3>
                      ) : (
                        <h2
                          className="fw-bold mb-0"
                          style={{ fontSize: "2.5rem" }}
                        >
                          {humidity}%
                        </h2>
                      )}
                    </div>

                    <div className="row g-2 text-center">
                      <div className="">
                        <small className="text-muted d-block">Unit</small>
                        <strong>Percentage (%)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Light Card */}
              <div className="col-lg-3 col-md-6">
                <div
                  className="card h-100 border-0 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px rgba(252, 182, 159, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(0,0,0,0.1)";
                  }}
                >
                  <div className="card-body p-4 text-center text-dark">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "rgba(255,255,255,0.4)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <i className="fas fa-sun fa-2x text-warning"></i>
                    </div>
                    <h6
                      className="text-uppercase fw-bold mb-2"
                      style={{ letterSpacing: "1px", fontSize: "0.85rem" }}
                    >
                      Light Intensity
                    </h6>
                    <div className="mb-3">
                      {error ? (
                        <h3 className="fw-bold text-danger">Error</h3>
                      ) : (
                        <h2
                          className="fw-bold mb-0"
                          style={{ fontSize: "2.5rem" }}
                        >
                          {light}
                        </h2>
                      )}
                    </div>
                    <div className="row g-2 text-center">
                      <div className="">
                        <small className="text-muted d-block">Unit</small>
                        <strong>LUX</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soil Moisture Card */}
              <div className="col-lg-3 col-md-6">
                <div
                  className="card h-100 border-0 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px rgba(168, 237, 234, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(0,0,0,0.1)";
                  }}
                >
                  <div className="card-body p-4 text-center text-dark">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "rgba(255,255,255,0.4)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <i className="fas fa-seedling fa-2x text-success"></i>
                    </div>
                    <h6
                      className="text-uppercase fw-bold mb-2"
                      style={{ letterSpacing: "1px", fontSize: "0.85rem" }}
                    >
                      Soil Moisture
                    </h6>
                    <div className="mb-3">
                      {error ? (
                        <h3 className="fw-bold text-danger">Error</h3>
                      ) : (
                        <h2
                          className="fw-bold mb-0"
                          style={{ fontSize: "2.5rem" }}
                        >
                          {soil}%
                        </h2>
                      )}
                    </div>
                    <div className="row g-2 text-center">
                      <div className="">
                        <small className="text-muted d-block">Unit</small>
                        <strong>Percentage (%)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Prediction Section */}
          <div className="container-fluid px-4 mt-5 ">
            <div className="row justify-content-center ">
              <div className="col-lg-8">
                <div
                  className="card border-0 shadow-lg  transition-all duration-700 hover:scale-105 hover:shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "25px",
                    overflow: "hidden",
                  }}
                >
                  <div className="card-body p-5 text-center text-white">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <div
                          className="d-inline-flex align-items-center justify-content-center rounded-circle"
                          style={{
                            width: "100px",
                            height: "100px",
                            background: "rgba(255,255,255,0.2)",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          <i className="fas fa-brain fa-3x"></i>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h4 className="fw-bold mb-2">🌱 AI Smart Prediction</h4>
                        <p className="mb-3 text-white-50">
                          Advanced machine learning analysis for optimal plant
                          growth
                        </p>
                        <div className="mb-2">
                          {error ? (
                            <h4 className="fw-bold text-warning">
                              Analysis Error
                            </h4>
                          ) : (
                            <h3 className="fw-bold mb-0">{ai}</h3>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="row g-2">
                          <div className="col-12">
                            <div
                              className="p-2 rounded-3 text-center"
                              style={{ background: "rgba(255, 193, 7, 0.3)" }}
                            >
                              <i className="fas fa-check-circle text-success mb-1 d-block"></i>
                              <small className="text-white-50">Accuracy</small>
                              <div className="fw-bold">94%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////// */}

          <h1
            className="text-black text-center mb-5 fw-bold mt-5"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
          >
            🎛️ Device Controls
          </h1>

          <div className="col-md-6 mx-auto mb-5 ">
            <div
              className="card border-0 shadow-lg transition-all duration-700 hover:scale-105 hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)",
                borderRadius: "20px",
              }}
            >
              <div
                className="card-header border-0 text-center py-4 "
                style={{ background: "transparent" }}
              >
                <div
                  className="p-3 rounded-circle d-inline-block mb-3"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <i className="fas fa-faucet fa-2x text-white"></i>
                </div>
                <h5 className="text-white mb-0 fw-bold">
                  💦 Water Control System
                </h5>
              </div>
              <div className="card-body text-center p-4">
                {/* Time Selection */}
                {!isRunning && (
                  <div className="mb-4">
                    <label className="text-white fw-bold mb-2 d-block">
                      ⏱️ Set Watering Time
                    </label>
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                      <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() =>
                          setSelectedTime(Math.max(5, selectedTime - 5))
                        }
                        disabled={isRunning}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <div
                        className="px-4 py-2 rounded-pill bg-white text-primary fw-bold"
                        style={{ minWidth: "80px" }}
                      >
                        {selectedTime}s
                      </div>
                      <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() =>
                          setSelectedTime(Math.min(300, selectedTime + 5))
                        }
                        disabled={isRunning}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <small className="text-white-50">
                      Range: 5-300 seconds
                    </small>
                  </div>
                )}

                {/* Status Display */}
                <div className="mb-4">
                  <div
                    className="p-3 rounded-3 d-inline-block mb-3"
                    style={{
                      background: isOn
                        ? "rgba(40, 167, 69, 0.2)"
                        : "rgba(220, 53, 69, 0.2)",
                      border: `2px solid ${isOn ? "#28a745" : "#dc3545"}`,
                    }}
                  >
                    <h6
                      className="mb-0 fw-bold"
                      style={{ color: isOn ? "#28a745" : "#dc3545" }}
                    >
                      Status: {isOn ? "ACTIVE" : "INACTIVE"}
                    </h6>
                    {isRunning && (
                      <div className="mt-2">
                        <small className="text-white fw-bold">
                          Time Remaining: {timeRemaining}s
                        </small>
                        <div
                          className="progress mt-2"
                          style={{
                            height: "6px",
                            background: "rgba(255,255,255,0.3)",
                          }}
                        >
                          <div
                            className="progress-bar bg-warning"
                            style={{
                              width: `${(timeRemaining / selectedTime) * 100}%`,
                              transition: "width 1s ease",
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Control Button */}
                <button
                  className={`btn btn-lg rounded-pill px-5 py-3 fw-bold ${
                    isRunning ? "btn-danger" : "btn-success"
                  }`}
                  onClick={toggleWater}
                  style={{
                    transition: "all 0.3s ease",
                    transform: "scale(1)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  <i
                    className={`fas ${isRunning ? "fa-stop" : "fa-play"} me-2`}
                  ></i>
                  {isRunning
                    ? "Stop Watering"
                    : `Start Watering (${selectedTime}s)`}
                </button>

                {/* Quick Time Presets */}
                {!isRunning && (
                  <div className="mt-4">
                    <small className="text-white-50 d-block mb-2">
                      Quick Select:
                    </small>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      {[10, 30, 60, 120].map((time) => (
                        <button
                          key={time}
                          className={`btn btn-sm rounded-pill ${
                            selectedTime === time
                              ? "btn-light"
                              : "btn-outline-light"
                          }`}
                          onClick={() => setSelectedTime(time)}
                          style={{ minWidth: "50px" }}
                        >
                          {time}s
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
