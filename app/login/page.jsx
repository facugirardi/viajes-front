'use client'

// import node module libraries
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
import Swiper, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import GLightbox from 'glightbox';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Isotope from "isotope-layout";
import "@/public/assets/js/main.js";
import './login-styles.css'
import '../globals2.css'
import axios from "axios";
import { useRouter } from "next/navigation"; // Hook de Next.js para navegación

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", formData);
      const { token, user } = response.data;

      // Guardar token en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirigir al usuario
      window.location.href = "/dashboard"; // Redirección si está logueado
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
<>
<hr className="top-line" />
      <header id="header" className="fixed-top ">
        <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 d-flex align-items-center">
            {/* <h1 className="logo"><a href="/">LOGO</a></h1> */}
            <a href="/" className="logo"><img src="assets/images/logo.png" alt="" className="img-fluid"/></a>
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
          <img src="/assets/images/vaidpng3.png" alt="" className="imgLogo_login" />
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
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>

    </>
  );
};

export default SignIn;
