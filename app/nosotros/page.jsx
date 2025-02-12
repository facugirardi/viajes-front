"use client";
import React, { useState } from "react";
import Footer from "@/layouts/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/public/assets/vendor/boxicons/css/boxicons.min.css";
// import "@/public/assets/vendor/glightbox/css/glightbox.min.css";
// import "@/public/assets/vendor/remixicon/remixicon.css";
// import "@/public/assets/vendor/swiper/swiper-bundle.min.css";
// import "swiper/css";
// import "swiper/css/pagination";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
                  <li><a className="nav-link scrollto" href="/">INICIO</a></li>
                  <div className="vertical-line" style={{ height: "25px" }}></div>
                  <li><a className="nav-link scrollto" href="/destinos">DESTINOS</a></li>
                  <div className="vertical-line" style={{ height: "25px" }}></div>
                  <li><a className="nav-link scrollto" href="#services">SERVICIOS</a></li>
                  <div className="vertical-line" style={{ height: "25px" }}></div>
                  <li><a className="nav-link scrollto active" href="/nosotros">NOSOTROS</a></li>  
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
      <section id="hero3">
        <div className="hero-container2 hero-container">
          <h1 className="title-hero">SOBRE NOSOTROS</h1>
        </div>
      </section>

      <main id="main">
      <div className="margin-destinos2"></div>

      <section id="portfolio" className="portfolio">
        <div className="container">

            <h3 className="title-nosotros">¿Quienes Somos?</h3>
            <p className="p-nosotros">Fundada en 2001 en Córdoba, Argentina, Vaya Pasajes y Turismo comenzó con el sueño de crear experiencias de viaje únicas,  ofreciendo desde escapadas nacionales hasta aventuras internacionales. Hoy, somos referentes en turismo, conectando a nuestros clientes con destinos inolvidables alrededor del mundo.</p>
            <hr style={{width:'100%', textAlign: 'center', marginLeft: 'auto', marginRight:'auto', color:'#968778', borderWidth: '2px'}} />

            <h3 className="title-nosotros">Objetivos Alcanzados</h3>
            <p className="p-nosotros">A lo largo de más de 20 años, Vaya Pasajes y Turismo ha logrado consolidar su presencia en el mercado local, ofrecer paquetes de viajes adaptados a las necesidades de nuestros clientes y construir relaciones duraderas con proveedores clave. Estos logros nos permiten brindar experiencias confiables y memorables a cada viajero.</p>
            <hr style={{width:'100%', textAlign: 'center', marginLeft: 'auto', marginRight:'auto', color:'#968778', borderWidth: '2px'}} />

            <h3 className="title-nosotros">Nuestras Proyecciones</h3>
            <p className="p-nosotros">Nos apasiona seguir innovando. Con tecnologías 
            avanzadas y un fuerte compromiso social, nuestro objetivo es ofrecer experiencias 
            cada vez más enriquecedoras y sostenibles.</p>
            <hr style={{width:'100%', textAlign: 'center', marginLeft: 'auto', marginRight:'auto', color:'#968778', borderWidth: '2px'}} />

            <h3 className="title-nosotros">Ubicación</h3>
            <iframe 
                style={{border: '0', width: '100%', height: '400px'}}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.0047358729003!2d-64.1869131!3d-31.4139956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a28266a166eb%3A0x5c8fb41493b33695!2sGaleria%20Via%20De%20La%20Fontana!5e0!3m2!1ses-419!2sar!4v1735163487861!5m2!1ses-419!2sar" 
                frameborder="0" 
                allowfullscreen>
            </iframe>

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
