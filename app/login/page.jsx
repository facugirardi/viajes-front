'use client'

// Importar módulos necesarios
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "@/layouts/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/public/assets/vendor/boxicons/css/boxicons.min.css";
import "@/public/assets/vendor/glightbox/css/glightbox.min.css";
import "@/public/assets/vendor/remixicon/remixicon.css";
import "@/public/assets/vendor/swiper/swiper-bundle.min.css";
import "swiper/css";
import "swiper/css/pagination";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@/public/assets/js/main.js";
import './login-styles.css'
import '../globals2.css'
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa estilos de toastify

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Redirigir al dashboard si ya está logueado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard"; // Redirección si está logueado
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", formData);
      const { token, user } = response.data;

      // Guardar token en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirigir al usuario después de un breve retraso
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Container para mostrar las notificaciones */}
      <ToastContainer />

      <hr className="top-line" />
      <header id="header" className="fixed-top ">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 d-flex align-items-center">
              <a href="/" className="logo">
                <img src="/assets/images/logo.png" alt="" className="img-fluid" />
              </a>
            </div>
            <nav id="navbar" className="navbar col-lg-4 col-md-4 justify-content-end ">
              <ul>
                <li><a className="nav-link scrollto" href="/">INICIO</a></li>
                <div className="vertical-line" style={{ height: "25px" }}></div>
                <li><a className="nav-link scrollto " href="/destinos">DESTINOS</a></li>
                <div className="vertical-line" style={{ height: "25px" }}></div>
                <li><a className="nav-link scrollto" href="/">SERVICIOS</a></li>
                <div className="vertical-line" style={{ height: "25px" }}></div>
                <li><a className="nav-link scrollto " href="/nosotros">NOSOTROS</a></li>  
                <li><a className="nav-link scrollto contact-li" href="/contacto">CONTACTO</a></li>  
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav>
            <div className="col-lg-4 col-md-4 d-flex justify-content-end cont-li" >
              <a className="contact-button nav-link scrollto" href="/contacto">CONTACTO</a>
            </div>
          </div>
        </div>
      </header>

      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="flex-item-logo">
          </div>

          <div className="flex-item">
            <h3>¡Bienvenido!</h3>
          </div>

          <div className="input-box flex-item email-box">
            <label className="label_input">Correo electrónico</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>

          <div className="input-box flex-item">
            <label className="label_input">Contraseña</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <div className="flex-item">
            <button className="" type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
