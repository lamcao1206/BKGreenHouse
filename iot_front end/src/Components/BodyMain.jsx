import React from 'react';
import { useState, useEffect } from 'react';

export default function Temperature() {
  const [isOn, setIsOn] = useState(null);
  // const [flowRate, setFlowRate] = useState(null);

  // const [lighton, setlighton] = useState(null);
  // const [lightrate, setlightrate] = useState(null);

  const toggleWater = () => setIsOn(!isOn);
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
    const eventSource = new EventSource(`${import.meta.env.VITE_BASE_API}/sensor/temp/stream`);

    const eventSource1 = new EventSource(`${import.meta.env.VITE_BASE_API}/sensor/light/stream`);

    const eventSource2 = new EventSource(`${import.meta.env.VITE_BASE_API}/sensor/humidity/stream`);

    const eventSource3 = new EventSource(`${import.meta.env.VITE_BASE_API}/sensor/soil/stream`);

    const eventSource4 = new EventSource(`${import.meta.env.VITE_BASE_API}/sensor/ai/stream`);

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.topic === 'temperature') {
          setTemperature(data.data);
        }
      } catch (error) {
        console.error('Error parsing temperature data:', error);
        setError('Error parsing temperature data');
      }
    };

    eventSource1.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.topic === 'light') {
          setLight(data.data);
        }
      } catch (error) {
        console.error('Error parsing light data:', error);
        setError('Error parsing light data');
      }
    };

    eventSource2.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.topic === 'humidity') {
          setHumidity(data.data);
        }
      } catch (error) {
        console.error('Error parsing Humidity data:', error);
        setError('Error parsing Humidity data');
      }
    };

    eventSource3.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.topic === 'soil_moisture') {
          setSoil(data.data);
        }
      } catch (error) {
        console.error('Error parsing Soil data:', error);
        setError('Error parsing Soil data');
      }
    };

    eventSource4.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.topic === 'ai') {
          setAi(data.data);
        }
      } catch (error) {
        console.error('Error parsing Ai data:', error);
        setError('Error parsing Ai data');
      }
    };

    eventSource.onerror = () => {
      setError('Error connecting to the server');
      eventSource.close();
    };

    eventSource1.onerror = () => {
      setError('Error connecting to the server');
      eventSource1.close();
    };

    eventSource2.onerror = () => {
      setError('Error connecting to the server');
      eventSource2.close();
    };

    eventSource3.onerror = () => {
      setError('Error connecting to the server');
      eventSource3.close();
    };

    eventSource4.onerror = () => {
      setError('Error connecting to the server');
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
    <section className="container-fluid bg-lime-200">
      <div className="justify-content-center d-flex flex-column">
        {/* Phần 3 card */}
        <div className="d-flex flex-row ms-5">
          <div className="col-md-4 ms-5 me-4 mt-1">
            <div
              className="mt-5 card welcome-section mb-4 align-items-center justify-content-center d-flex flex-column transition-all duration-700 hover:scale-105 hover:shadow-xl"
              style={{ width: '120%', height: '300px' }}
            >
              <h1 className="mt-5 text-white">Welcome back</h1>
              <h2>BK GreenHouse</h2>
              <p className="text-white fw-bold">
                Let's check out your garden ! <a className="btn btn-primary">Learn more</a>{' '}
              </p>
            </div>
          </div>

          <div className="col-md-6 offset-md-1 mt-5">
            <div className="row">
              <div className="col-md-6">
                <div
                  className="card bg-warning bg-opacity-25 shadow-sm mt-5 transition-all duration-700 hover:scale-105 hover:shadow-xl"
                  style={{ border: '3px solid black', borderRadius: '30px' }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-center fw-bold " style={{ fontFamily: 'Sitka Display' }}>
                      Temperature Measurement History
                    </h5>
                    <p>
                      <strong>Highest Temperature:</strong> 38 <i class="fa-solid fa-temperature-arrow-up"></i>{' '}
                    </p>
                    <p>
                      <strong>Lowest Temperature:</strong> 20 <i class="fa-solid fa-temperature-arrow-down"></i>
                    </p>
                    <p>
                      <strong>Temperature Range</strong> 18 <i class="fa-solid fa-temperature-three-quarters"></i>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="card bg-success bg-opacity-25 shadow-sm ms-3 mt-5 transition-all duration-700 hover:scale-105 hover:shadow-xl"
                  style={{ border: '3px solid black', borderRadius: '30px' }}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title text-center fw-bold" style={{ fontFamily: 'Sitka Display' }}>
                      Irrigation System Notification
                    </h5>
                    <p>
                      <i class="fa-solid fa-filter"></i> Amount of water applied <strong>3</strong> liters
                    </p>
                    <p>
                      Number of waterings<strong> 18 </strong>times
                    </p>
                    <p className="fw-bold">
                      <a className="btn text-white" style={{ backgroundColor: 'coral' }}>
                        Here
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-center">Status</h1>
        <div className="justify-content-center d-flex flex-row mt-4">
          <div className="d-flex justify-content-between" style={{ width: '85%' }}>
            <div
              className="card text-center shadow-lg m-2 border-black transition-all duration-700 hover:scale-105 hover:shadow-xl"
              style={{ width: '48%', border: '3px solid black' }}
            >
              <div className="card-header bg-danger text-white p-4">
                <h5 className="mb-0">🌡️ Temperature Data</h5>
              </div>
              <div className="card-body">
                {error ? <h2 className="fw-bold text-danger">{error}</h2> : <h2 className="fw-bold">{temperature}°C</h2>}
              </div>
            </div>

            {/* Humidity Card */}
            <div
              className="card text-center shadow-lg m-2 border-black transition-all duration-700 hover:scale-105 hover:shadow-xl"
              style={{ width: '48%', border: '3px solid black' }}
            >
              <div className="card-header bg-primary text-white p-4">
                <h5 className="mb-0">💧 Air Humidity Data</h5>
              </div>
              <div className="card-body">{error ? <h2 className="fw-bold text-danger">{error}</h2> : <h2 className="fw-bold">{humidity} %</h2>}</div>
            </div>
          </div>
        </div>

        <div className="justify-content-center d-flex flex-row mt-5">
          <div className="d-flex justify-content-between" style={{ width: '85%' }}>
            {/* Temperature Card */}
            <div
              className="card text-center shadow-lg m-2 border-black transition-all duration-700 hover:scale-105 hover:shadow-xl"
              style={{ width: '48%', border: '3px solid black' }}
            >
              <div className="card-header bg-warning text-white p-4">
                <h5 className="mb-0">💡 Light Data</h5>
              </div>
              <div className="card-body">{error ? <h2 className="fw-bold text-danger">{error}</h2> : <h2 className="fw-bold">{light} LUX</h2>}</div>
            </div>

            {/* Humidity Card */}
            <div
              className="card text-center shadow-lg m-2 border-black transition-all duration-700 hover:scale-105 hover:shadow-xl"
              style={{ width: '48%', border: '3px solid black' }}
            >
              <div className="card-header  text-white p-4" style={{ backgroundColor: 'coral' }}>
                <h5 className="mb-0">⛰️ Soil Moisture Data</h5>
              </div>
              <div className="card-body">{error ? <h2 className="fw-bold text-danger">{error}</h2> : <h2 className="fw-bold">{soil} %</h2>}</div>
            </div>
          </div>
        </div>

        <div className="justify-content-center d-flex flex-row mt-5 ">
          <div className="d-flex justify-content-center" style={{ width: '85%' }}>
            {/* Card 1 */}
            <div
              className="card text-center shadow-lg m-2 d-flex justify-conten transition-all duration-700 hover:scale-105 hover:shadow-xl"
              style={{ width: '48%', border: '3px solid black' }}
            >
              <div className="card-header  text-white p-4" style={{ backgroundColor: '#0BDA51' }}>
                <h5 className="mb-0">🌱 AI Prediction</h5>
              </div>
              <div className="card-body">{error ? <h2 className="fw-bold text-danger">{error}</h2> : <h2 className="fw-bold">{ai}</h2>}</div>
            </div>
          </div>
        </div>

        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <h1 className="text-center mt-5">Devices</h1>

        <div className="justify-content-center d-flex flex-row mt-4" style={{ marginBottom: '9vh' }}>
          <div className="d-flex justify-content-center" style={{ width: '85%' }}>
            {/* Card 1 */}
            <div
              className="card text-center shadow-lg m-2 d-flex justify-conten transition-all duration-700 hover:scale-105 hover:shadow-xl"
              style={{ width: '48%', border: '3px solid black' }}
            >
              <div className="card-header bg-primary text-white p-4">
                <h5 className="mb-0">💦 Water Control Panel</h5>
              </div>
              <div className="card-body">
                {/* On/Off Toggle Button */}
                <h6 className="mt-2">Water Status: {isOn ? 'ON' : 'OFF'}</h6>
                <button className={`btn ${isOn ? 'btn-success' : 'btn-danger'} mb-3 mt-2`} onClick={toggleWater}>
                  {isOn ? 'Turn On' : 'Turn Off'}
                </button>

                {/* Flow Rate Slider
                <div className="mb-3">
                  <label className="form-label">Flow Rate: {flowRate}%</label>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="100"
                    value={flowRate}
                    onChange={(e) => setFlowRate(Number(e.target.value))}
                  />
                </div> */}

                {/* Apply Button
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    alert(
                      `Water is ${isOn ? "ON" : "OFF"} at ${flowRate}% flow`
                    )
                  }
                >
                  Apply Settings
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
