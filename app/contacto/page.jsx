"use client";
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
import '../globals2.css'
import axios from 'axios';

const page = () => {
  const [activeTab, setActiveTab] = useState("viajes");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value, // Si 'id' no existe, se agrega automáticamente
    }));
  };
    
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    console.log("Form data:", formData); // Verifica los datos aquí
  
    const message = Object.entries(formData)
      .filter(([key]) => key !== "name" && key !== "email")
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      message,
    };
  
    console.log("Data to send:", dataToSend); // Verifica los datos aquí
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/contact_messages", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
        });
      }
    } catch (err) {
      console.error("Error in Axios request:", err.response || err.message);
      setError("Error al enviar el mensaje. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  

  const renderFormContent = () => {
    switch (activeTab) {
      case "viajes":
        return (
          <form className="custom-form" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="form-control cmpo"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre completo"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email o Teléfono
                </label>
                <input
                  type="email"
                  className="form-control cmpo"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingresa un email o teléfono"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="destino" className="form-label">
                  Destino
                </label>
                <input
                  type="text"
                  className="form-control cmpo"
                  id="destino"
                  value={formData.destino || ""}
                  onChange={handleChange}
                  placeholder="Ingrese el destino"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="personas" className="form-label">
                  Cantidad de Personas
                </label>
                <input
                  type="number"
                  className="form-control cmpo"
                  id="personas"
                  value={formData.personas || ""}
                  onChange={handleChange}
                  placeholder="Ingrese la cantidad de personas"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="tipoAlojamiento" className="form-label">
                  Tipo de Alojamiento
                </label>
                <select
                  className="form-select"
                  id="tipoAlojamiento"
                  value={formData.tipoAlojamiento || ""}
                  onChange={handleChange}
                >
                  <option value="">Seleccione el alojamiento</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Apartamento">Apartamento</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="mensajeAdicional" className="form-label">
                Mensaje
              </label>
              <textarea
                className="form-control aeatext"
                id="mensajeAdicional"
                value={formData.mensajeAdicional || ""}
                onChange={handleChange}
                placeholder="Escriba un mensaje"
              ></textarea>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="contact1-button" disabled={loading}>
                {loading ? "Enviando..." : "ENVIAR"}
              </button>
            </div>
            {success && <div className="alert alert-success mt-3">¡Mensaje enviado con éxito!</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        );
        case "aereos":
          return (
            <form className="custom-form" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-5">
                  <label htmlFor="nombreCompleto" className="form-label">
                    Nombre del Pasajero
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control cmpo"
                    id="name"
                    value={formData.name || ""}
                    placeholder="Ingresa el nombre del pasajero"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="email" className="form-label">
                    Email o Teléfono
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control cmpo"
                    id="email"
                    value={formData.email || ""}
                    placeholder="Ingresa un email o teléfono"
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="asistencia" className="form-label">
                    Asistencia al viajero
                  </label>
                  <select className="form-select" id="asistencia" onChange={handleChange} value={formData.asistencia || ""}>
                    <option className="disabled-select">Seleccione una opción</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="origen" className="form-label">
                    Origen
                  </label>
                  <input
                    type="text"
                    className="form-control cmpo"
                    id="origen"
                    onChange={handleChange}
                    value={formData.origen || ""}
                    placeholder="Ingrese el origen"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="destino" className="form-label">
                    Destino
                  </label>
                  <input
                    type="text"
                    className="form-control cmpo"
                    id="destino"
                    onChange={handleChange}
                    value={formData.destino || ""}
                    placeholder="Ingrese el destino"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="personas" className="form-label">
                    Cantidad de Pasajeros
                  </label>
                  <input
                    type="number"
                    className="form-control cmpo"
                    id="personas"
                    onChange={handleChange}
                    value={formData.personas || ""}
                    placeholder="Ingresar cantidad"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="partida" className="form-label">
                    Partida
                  </label>
                  <input type="date" className="form-control cmpo" id="partida" onChange={handleChange} value={formData.partida || ""}/>
                </div>
                <div className="col-md-4">
                  <label htmlFor="regreso" className="form-label">
                    Regreso
                  </label>
                  <input type="date" className="form-control cmpo" id="regreso" onChange={handleChange} value={formData.regreso || ""}/>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">
                  Mensaje
                </label>
                <textarea
                  className="form-control aeatext"
                  id="mensajeAdicional"
                  placeholder="Escriba un mensaje"
                  value={formData.mensajeAdicional || ""}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="contact1-button">
                  ENVIAR
                </button>
              </div>
              {success && <div className="alert alert-success mt-3">¡Mensaje enviado con éxito!</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          );
        
        case "alojamiento":
          return (
            <form className="custom-form" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="nombreCompleto" className="form-label">
                    Nombre del Pasajero
                  </label>
                  <input
                    type="text"
                    className="form-control cmpo"
                    id="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="Ingresa el nombre del pasajero"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email o Teléfono
                  </label>
                  <input
                    type="text"
                    className="form-control cmpo"
                    id="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="Ingresa un email o teléfono"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="destino" className="form-label">
                    Destino
                  </label>
                  <input
                    type="text"
                    className="form-control cmpo"
                    onChange={handleChange}
                    id="destino"
                    value={formData.destino || ""}
                    placeholder="Ingrese el destino"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="tipoAlojamiento" className="form-label">
                    Tipo de Alojamiento
                  </label>
                  <select className="form-select" id="tipoAlojamiento" value={formData.tipoAlojamiento || ""} onChange={handleChange}> 
                    <option className="disabled-select">Seleccione una opción</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Apartamento">Apartamento</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="personas" className="form-label">
                    Cantidad de Personas
                  </label>
                  <input
                    type="number"
                    className="form-control cmpo"
                    id="personas"
                    value={formData.personas || ""}
                    onChange={handleChange}
                    placeholder="Ingresar cantidad"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="ingreso" className="form-label">
                    Ingreso
                  </label>
                  <input type="date" value={formData.ingreso || ""} className="form-control cmpo" id="ingreso" onChange={handleChange}/>
                </div>
                <div className="col-md-4">
                  <label htmlFor="salida" className="form-label">
                    Salida
                  </label>
                  <input type="date" value={formData.salida || ""} className="form-control cmpo" id="salida" onChange={handleChange}/>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">
                  Mensaje
                </label>
                <textarea
                  className="form-control aeatext"
                  id="mensajeAdicional"
                  value={formData.mensajeAdicional || ""}
                  onChange={handleChange}
                  placeholder="Escriba un mensaje"
                ></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="contact1-button">
                  ENVIAR
                </button>
              </div>
              {success && <div className="alert alert-success mt-3">¡Mensaje enviado con éxito!</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          );
        
        case "paquetes":
          return (
            <form className="custom-form" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="nombreCompleto" className="form-label">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="form-control cmpo"
                    id="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email o Teléfono
                  </label>
                  <input
                    type="text"
                    className="form-control cmpo"
                    id="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="Ingresa un email o teléfono"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="destino" className="form-label">
                    Destino
                  </label>
                  <input
                    type="text"
                    className="form-control cmpo"
                    id="destino"
                    value={formData.destino || ""}
                    onChange={handleChange}
                    placeholder="Ingrese el destino"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="personas" className="form-label">
                    Cantidad de Personas
                  </label>
                  <input
                    type="number"
                    className="form-control cmpo"
                    id="personas"
                    onChange={handleChange}
                    value={formData.personas || ""}
                    placeholder="Ingrese la cantidad de personas"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="tipoAlojamiento" className="form-label">
                    Tipo de Alojamiento
                  </label>
                  <select className="form-select" id="tipoAlojamiento" value={formData.tipoAlojamiento || ""} onChange={handleChange}>
                    <option className="disabled-select">Seleccione el alojamiento</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Apartamento">Apartamento</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">
                  Mensaje
                </label>
                <textarea
                  className="form-control aeatext"
                  value={formData.mensajeAdicional || ""}
                  id="mensajeAdicional"
                  onChange={handleChange}
                  placeholder="Escriba un mensaje"
                ></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="contact1-button">
                  ENVIAR
                </button>
              </div>
              {success && <div className="alert alert-success mt-3">¡Mensaje enviado con éxito!</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          );
        
      default:
        return null;
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
                  <li><a className="nav-link scrollto" href="/nosotros">NOSOTROS</a></li>  
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
      <section id="hero4">
        <div className="hero-container2 hero-container">
          <h1 className="title-hero">CONTACTO</h1>
        </div>
      </section>

      <main id="main">
      <div className="margin-destinos2"></div>

      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="row">
            <div className="ubicacion2-contacto">
            <div className="container mt-5">
      <ul className="nav custom-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "viajes" ? "active" : ""}`} onClick={() => setActiveTab("viajes")}>
            VIAJES
          </button>
        </li>
        <div className="vertical-line" style={{ height: "25px", marginTop: "10px"  }}></div>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "aereos" ? "active" : ""}`} onClick={() => setActiveTab("aereos")}>
            AÉREOS
          </button>
        </li>
        <div className="vertical-line" style={{ height: "25px", marginTop: "10px"  }}></div>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "alojamiento" ? "active" : ""}`} onClick={() => setActiveTab("alojamiento")}>
            ALOJAMIENTO
          </button>
        </li>
        <div className="vertical-line" style={{ height: "25px", marginTop: "10px" }}></div>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "paquetes" ? "active" : ""}`} onClick={() => setActiveTab("paquetes")}>
            PAQUETES
          </button>
        </li>
      </ul>
      <div className="tab-content mt-3">{renderFormContent()}</div>
    </div>
            </div>
          </div>

          <div className="row">
            <div className="ubicacion-contacto">
            <h3 className="text-center title-nosotros">Búscanos en esta <span className="direccion">dirección</span></h3>
            <div className="d-flex justify-content-center">
            <iframe 
                style={{border: '0', width: '85%', height: '350px', borderRadius: '4px', marginBottom: '70px'}}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.0047358729003!2d-64.1869131!3d-31.4139956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a28266a166eb%3A0x5c8fb41493b33695!2sGaleria%20Via%20De%20La%20Fontana!5e0!3m2!1ses-419!2sar!4v1735163487861!5m2!1ses-419!2sar" 
                frameborder="0" 
                allowfullscreen>
            </iframe>

            </div>
              
            </div>
          </div>

        </div>
      </section>
      <div className="margin-destinos"></div>
    </main>

    <Footer />   
    </>         
  );
};
export default page;
