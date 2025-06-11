import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_API}/user/login`, {
        email,
        password,
      });

      const userdata = response.data;
      console.log(userdata);

      toast.success('Đăng nhập thành công!', {
        position: 'top-center',
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });

      setTimeout(() => {
        navigate('/MainPage', {});
      }, 1800);
    } catch (error) {
      toast.error('Đăng nhập thất bại: ' + (error.response?.data?.message || error.message), {
        position: 'top-center',
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
  };

  return (
    <div className="overlay d-flex justify-content-center align-items-center vh-100">
      <ToastContainer />
      <div
        className="account-box p-4 rounded shadow mb-5"
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#121C57', fontWeight: 700, letterSpacing: 1 }}>
          Đăng Nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Nhập email..."
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: '10px' }}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              Mật khẩu
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              placeholder="Nhập mật khẩu..."
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: '10px' }}
              required
            />
          </div>
          <div className="float-end mb-3">
            <a href="#" style={{ fontSize: '0.95em', color: '#4f46e5' }}>
              Quên mật khẩu?
            </a>
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Ghi nhớ đăng nhập
            </label>
          </div>
          <button
            type="submit"
            className="btn w-100 p-2 text-white fw-bold"
            style={{
              background: 'linear-gradient(90deg, #057a55 60%, #43e97b 100%)', // xanh lá đậm chuyển sắc
              borderRadius: '10px',
              fontSize: '1.1em',
              letterSpacing: 1,
              boxShadow: '0 2px 12px rgba(67,233,123,0.25)',
              marginBottom: '10px',
            }}
          >
            Đăng nhập
          </button>
          <p className="text-center mt-3" style={{ fontSize: '0.97em' }}>
            Chưa có tài khoản?{' '}
            <a href="#" className="text-decoration-none" style={{ color: '#6366f1' }}>
              Đăng ký
            </a>
          </p>
          <div className="text-center mt-3">
  <Link 
    className="btn btn-danger text-decoration-none fw-bold px-4 py-2"
    to="/" 
    style={{ 
      borderRadius: '10px',
      fontSize: '0.95em',
      letterSpacing: '0.5px'
    }}
  >
    <i className="fas fa-arrow-left me-2"></i>
    Quay lại
  </Link>
</div>
        </form>
      </div>
    </div>
  );
}
