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

  const toggleNav = () => {
    console.log('gs')
    setIsNavOpen(!isNavOpen);
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
            <h3>Nuestros <span>Destinos</span></h3>
          </div>

          <div className="row portfolio-container">

            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-app">
              <img src="assets/images/places/image.png" className="img-fluid" alt="" />
              <div className="portfolio-info d-flex align-items-center justify-content-center">
                <h4>Dubai</h4>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-web">
              <img src="assets/images/places/image2.png" className="img-fluid" alt="" />
              <div className="portfolio-info  d-flex align-items-center justify-content-center">
                <h4>Costa Rica</h4>
              </div>
            </div>
              
            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-app">
              <img src="assets/images/places/image3.png" className="img-fluid" alt="" />
              <div className="portfolio-info d-flex align-items-center justify-content-center">
                <h4>Islas Maldivas</h4>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-card">
              <img src="assets/images/places/image4.png" className="img-fluid" alt="" />
              <div className="portfolio-info d-flex align-items-center justify-content-center">
                <h4>Argentina</h4>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-web">
              <img src="assets/images/places/image5.png" className="img-fluid" alt="" />
              <div className="portfolio-info d-flex align-items-center justify-content-center">
                <h4>Egipto</h4>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-app">
              <img src="assets/images/places/image6.png" className="img-fluid" alt="" />
              <div className="portfolio-info d-flex align-items-center justify-content-center">
                <h4>Islas Mauricio</h4>
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
