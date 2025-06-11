import React from "react";
import logo from "../assets/a6.jpg";

const Body = () => {
  return (
    <div className="bg-gradient-to-b from-white to-green-50">
      {/* Header Section */}
      <section id="page-header" className="about-header text-center py-12 px-6">
        <h2 className="text-5xl md:text-7xl font-extrabold text-green-700 drop-shadow fw-bold mb-4">
          BK Green House - Group 5
        </h2>

        
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Green House is a platform for sharing knowledge about green
          technologies and practices in HCMUT. We aim to empower students,
          educators, and professionals to contribute to the advancement of green
          sustainability.
        </p>
      </section>

      

      {/* About Us Section */}
      <section
        id="about-head"
        className="section-p1 flex flex-col md:flex-row items-center justify-center gap-10 bg-white rounded-2xl shadow-2xl p-10 my-10 mx-6"
      >
        <img
          src={logo}
          alt="Green House Logo"
          className="w-64 h-64 object-cover rounded-2xl shadow-xl"
          style={{marginBottom: "180px"}}
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Who We Are?
          </h2>
          <p className="mb-2 text-gray-700 leading-relaxed">
            We are Group 5 from the Multidisciplinary Project course, consisting
            of:
          </p>
          <ul className="mb-6 list-disc list-inside text-gray-800 space-y-1">
            <li>
              <span className="font-semibold">Trịnh Anh Minh</span> - Student
              ID: 2252493
            </li>
            <li>
              <span className="font-semibold">Cao Ngọc Lâm</span> - Student ID:
              2252419
            </li>
            <li>
              <span className="font-semibold">Nguyễn Châu Hoàng Long</span> -
              Student ID: 2252444
            </li>
            <li>
              <span className="font-semibold">Nguyễn Tấn Bảo Lễ</span> - Student
              ID: 2252428
            </li>
          </ul>

          

          {/* Mission Section */}
          <div className="bg-gradient-to-br from-green-100 to-blue-100 border-l-4 border-green-500 rounded-lg p-6 mb-6 shadow-md">
            <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Together, we are developing the{" "}
              <span className="font-bold text-green-700">
                "Green House System"
              </span>{" "}
              — an innovative smart agriculture solution that revolutionizes
              environmental monitoring and optimization.
            </p>

            {/* Sensor Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4 me-5">
              {[
                { icon: "🌡️", label: "Temperature" },
                { icon: "💧", label: "Humidity" },
                { icon: "🌱", label: "Soil Moisture" },
                { icon: "☀️", label: "Light Intensity" },
              ].map(({ icon, label }, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 text-center shadow hover:shadow-md transition-shadow duration-200"
                >
                  <div className="text-3xl me-4 mb-2">{icon}</div>
                  <span className="text-sm ml-3 font-medium text-gray-600">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 italic text-sm">
              Through interdisciplinary collaboration, we're building tomorrow's
              sustainable farming solutions today.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
