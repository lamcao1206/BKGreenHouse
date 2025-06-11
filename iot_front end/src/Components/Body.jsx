import React from 'react';
import logo from '../assets/a6.jpg';

const Body = () => {
  return (
    <div>
      <section id="page-header" className="about-header">
        <h2 className="text-9xl font-extrabold text-green-700 mb-4">BK Green House - Group 5</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Green House is a platform for sharing knowledge about green technologies and practices in HCMUT. We aim to empower students, educators, and
          professionals to contribute to the advancement of green sustainability.
        </p>
      </section>

      <section id="about-head" class="section-p1">
        <img src={logo} alt="" className=" rounded-2xl shadow-lg"></img>
        <div className="mb-30">
          <h2>Who We Are?</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum rerum tempora aliquam voluptatem, libero expedita sapiente, ullam ad
            corrupti iste necessitatibus totam tenetur quia minima porro nostrum nobis, dolores magni.
          </p>

          <abbr title="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum itaque earum quaerat animi eaque cum maiores nam perspiciatis architecto!
            Optio, dolores neque quisquam atque similique inventore quas quidem totam vel?
          </abbr>

          <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%" className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolores officia impedit cum, nisi incidunt asperiores enim. Ipsa quae ut
            excepturi, fugiat id dolores voluptates voluptatibus asperiores aut sit maiores.
          </marquee>
        </div>
      </section>
    </div>
  );
};

export default Body;
