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
import './globals2.css'

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
                  <li><a className="nav-link scrollto active" href="/">INICIO</a></li>
                  <div className="vertical-line" style={{ height: "25px" }}></div>
                  <li><a className="nav-link scrollto" href="/destinos">DESTINOS</a></li>
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
      <section id="hero">
        <div className="hero-container">
          <h1 className="title-hero">ENCUENTRA TU<br/>PRÓXIMA <span className="title2-hero">AVENTURA</span></h1>
          <div className="deslizadiv">
          <img src="assets/image.png" className="deslizapng" alt="" />
          <p className="p-desliza">Desliza</p>
          </div>
        </div>
      </section>

      <main id="main">

      <section id="portfolio" className="portfolio">
        <div className="container">

          <div className="section-title">
            <h3>Destinos <span>Destacados</span></h3>
          </div>

          <div className="row portfolio-container">

            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-app">
              <img src="assets/images/places/image.png" className="container-destinos img-fluid" alt="" />
              <div className="portfolio-info d-flex align-items-center justify-content-center">
                <h4>Dubai</h4>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-web">
              <img src="assets/images/places/image2.png" className="container-destinos img-fluid" alt="" />
              <div className="portfolio-info  d-flex align-items-center justify-content-center">
                <h4>Costa Rica</h4>
              </div>
            </div>
              
            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-app">
              <img src="assets/images/places/image3.png" className="container-destinos img-fluid" alt="" />
              <div className="portfolio-info d-flex align-items-center justify-content-center">
                <h4>Islas Maldivas</h4>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-card">
              <img src="assets/images/places/image4.png" className="container-destinos img-fluid" alt="" />
              <div className="portfolio-info d-flex align-items-center justify-content-center">
                <h4>Argentina</h4>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-web">
              <img src="assets/images/places/image5.png" className="container-destinos img-fluid" alt="" />
              <div className="portfolio-info d-flex align-items-center justify-content-center">
                <h4>Egipto</h4>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 portfolio-item filter-app">
              <img src="assets/images/places/image6.png" className="container-destinos img-fluid" alt="" />
              <div className="portfolio-info d-flex align-items-center justify-content-center">
                <h4>Islas Mauricio</h4>
              </div>
            </div>


          </div>
          <div className="text-center">
            <button 
              className="btn-load-more contact-button" 
              onClick={() => window.location.href = '/destinos'}
            >
              VER TODOS
            </button>
          </div>

        </div>
      </section>

      <section id="services" className="services">
      <div className="services-section">
        <h2>Nuestros <span className="highlight">Servicios</span></h2>
        <p className="description descpro">Tu próxima aventura por el mundo está aquí. Estos son los servicios que ofrecemos.</p>
      
        <div className="services-container">
          <div className="service-item hoteleria">
              <img src="assets/images/1.png" alt="" />
              <p className="service-title">HOTELERIA</p>
          </div>
          <div className="service-item traslados">
            <img src="assets/images/4.png" alt="" />
            <p className="service-title">TRASLADOS</p>
          </div>
          <div className="service-item experiencias">
            <img src="assets/images/3.png" alt="" />
            <p className="service-title">EXPERIENCIAS <span className="highlight">ÚNICAS</span></p>
          </div>
          <div className="service-item turismo">
            <img src="assets/images/2.png" alt="" />
            <p className="service-title">TURISMO</p>
          </div>
        </div>
      </div>
    </section>
    <section id="faq" className="faq">
      <div className="container">

        <div className="section-title">
          <h3>Preguntas <span>Frecuentes</span></h3>
        </div>

        <ul className="faq-list">

          <li>
            <div data-bs-toggle="collapse" className="collapsed question" href="#faq1">Non consectetur a erat nam at lectus urna duis? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
            <div id="faq1" className="collapse" data-bs-parent=".faq-list">
              <p>
                Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
              </p>
            </div>
          </li>

          <li>
            <div data-bs-toggle="collapse" href="#faq2" className="collapsed question">Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
            <div id="faq2" className="collapse" data-bs-parent=".faq-list">
              <p>
                Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
              </p>
            </div>
          </li>

          <li>
            <div data-bs-toggle="collapse" href="#faq3" className="collapsed question">Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
            <div id="faq3" className="collapse" data-bs-parent=".faq-list">
              <p>
                Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
              </p>
            </div>
          </li>

          <li>
            <div data-bs-toggle="collapse" href="#faq4" className="collapsed question">Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
            <div id="faq4" className="collapse" data-bs-parent=".faq-list">
              <p>
                Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
              </p>
            </div>
          </li>

          <li>
            <div data-bs-toggle="collapse" href="#faq5" className="collapsed question">Tempus quam pellentesque nec nam aliquam sem et tortor consequat? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
            <div id="faq5" className="collapse" data-bs-parent=".faq-list">
              <p>
                Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in
              </p>
            </div>
          </li>

          <li>
            <div data-bs-toggle="collapse" href="#faq6" className="collapsed question">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
            <div id="faq6" className="collapse" data-bs-parent=".faq-list">
              <p>
                Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Nibh tellus molestie nunc non blandit massa enim nec.
              </p>
            </div>
          </li>

        </ul>

      </div>
    </section>
    <a href="https://wa.me/5493513934673" target="_blank" class="whatsapp-float">
        <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" class="whatsapp-icon" />
    </a>

    </main>
    <Footer />  

    </>            
  );
};
export default page;
