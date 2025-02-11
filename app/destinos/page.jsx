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

const page = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Estado del menú móvil
  const [packages, setPackages] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  const toggleNav = () => {
    console.log('gs')
    setIsNavOpen(!isNavOpen);
  };
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/packages");
        const data = await response.json();
  
        if (response.ok) {
          setPackages([]); // 🔄 Limpiar antes de actualizar (evita problemas de renderizado)
          setTimeout(() => {
            setPackages(data);
          }, 0); // 🔄 Forzar re-render
        } else {
          setFetchError(true);
        }
      } catch (err) {
        console.error("Error al obtener los paquetes:", err);
        setFetchError(true);
      }
    };
  
    fetchPackages();
  }, []);

  useEffect(() => {
    const container = document.querySelector(".portfolio-container");
    if (container) {
      container.style.height = "auto"; // Ajusta la altura automáticamente
      container.style.display = "flex";
      container.style.flexWrap = "wrap";
    }
  }, [packages]); // Se ejecuta cada vez que `packages` cambia

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
            <nav id="navbar" className={`navbar col-lg-4 col-md-4 justify-content-end ${isNavOpen ? "open" : ""}`}>
              <ul className={`nav-menu ${isNavOpen ? "active" : ""}`}>
                  <li><a className="nav-link scrollto " href="/">INICIO</a></li>
                  <div className="vertical-line" style={{ height: "25px" }}></div>
                  <li><a className="nav-link scrollto active" href="/destinos">DESTINOS</a></li>
                  <div className="vertical-line" style={{ height: "25px" }}></div>
                  <li><a className="nav-link scrollto" href="#services">SERVICIOS</a></li>
                  <div className="vertical-line" style={{ height: "25px" }}></div>
                  <li><a className="nav-link scrollto" href="/nosotros">NOSOTROS</a></li>  
                  <li><a className="nav-link scrollto contact-li" href="/contacto">CONTACTO</a></li>  
              </ul>
              <button className="mobile-nav-toggle" onClick={toggleNav}>
                <i className={`bi ${isNavOpen ? "bi-x" : "bi-list"}`}></i>
              </button>
            </nav>
            <div className="col-lg-4 col-md-4 d-flex justify-content-end cont-li" >
              <a className="contact-button nav-link scrollto" href="/contacto">CONTACTO</a>
            </div>
        </div>
        </div>
      </header>
      <section id="hero2">
        <div className="hero-container2 hero-container">
          <h1 className="title-hero">ENCUENTRA TU PRÓXIMO DESTINO</h1>
        </div>
      </section>

      <main id="main">
      <div className="margin-destinos2"></div>

      <section id="portfolio" className="portfolio">
  <div className="container">
    <div className="section-title">
      <h3>Destinos <span>Destacados</span></h3>
    </div>

    <div className="row portfolio-container ">
      {packages?.length > 0 ? (
        packages.map((pack) => (
          <div key={pack.id} className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-app">
            <img src={pack.images?.[0] || "/assets/images/places/image.png"} className="container-destinos img-fluid" alt={pack.name} />
            <div className="portfolio-info d-flex align-items-center justify-content-center">
              <h4>{pack.name}</h4>
            </div>
          </div>
        ))
      ) : (
        !fetchError && (
          <div className="col-12 text-center">
            <p className="alert alert-warning">No hay paquetes disponibles.</p>
          </div>
        )
      )}
    </div>

    {/* Botón "VER TODOS" solo si hay paquetes */}
    {packages?.length > 0 && (
      <div className="text-center">
        <button 
          className="btn-load-more contact-button" 
          onClick={() => window.location.href = '/destinos'}
        >
          VER TODOS
        </button>
      </div>
    )}
  </div>
</section>
      <a href="https://wa.me/5493513934673" target="_blank" class="whatsapp-float">
        <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" class="whatsapp-icon" />
      </a>
      <div className="margin-destinos"></div>
    </main>

    <Footer />   
    </>         
  );
};
export default page;
