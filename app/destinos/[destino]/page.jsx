"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/layouts/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/public/assets/vendor/boxicons/css/boxicons.min.css";
import "@/public/assets/vendor/glightbox/css/glightbox.min.css";
import "@/public/assets/vendor/remixicon/remixicon.css";
import "@/public/assets/vendor/swiper/swiper-bundle.min.css";
import { Container, Row, Col, Nav, Navbar, Spinner, Alert, Card, Form, Button, Modal, ListGroup, CloseButton  } from "react-bootstrap";
import { House, ChatText, Airplane, SignOut, CaretDown, MapTrifold, Bus, Phone, EnvelopeSimple, InstagramLogo  } from "phosphor-react";
import { CalendarIcon, CirclePlus  } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@/public/assets/js/main.js";
import '../../globals2.css'
import './style.css';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Fullscreen, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";

const page = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Estado del menú móvil
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    sections: [{ title: "", description: "", icon: <Bus size={24} /> }],
    destinationSections: [{ title: "", description: "", icon: <Bus size={24} /> }],
    uploadedImages: [],
  });
  const [loading, setLoading] = useState(true); // Estado para el loader
  const [packages, setPackages] = useState([]); // Estado para los paquetes
  const [fetchError, setFetchError] = useState(false); // Estado para manejar errores de conexión
  const [sections, setSections] = useState([]);
  const [destinationSections, setDestinationSections] = useState([]);
  const [sectionsToDelete, setSectionsToDelete] = useState([]);
  const [destinationSectionsToDelete, setDestinationSectionsToDelete] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(<Bus size={24} />);
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [iconType, setIconType] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]); // Imágenes nuevas
  const [existingImages, setExistingImages] = useState([]); // Imágenes actuales en el backend
  const urlPath = window.location.pathname; // Obtiene la ruta completa (ej: /messages/8)
  const packageId = urlPath.split("/").pop(); // Extrae el último segmento (ID)
  const iconMap = {
    "Bus": <Bus size={24} />,
    "Avión": <Airplane size={24} />,
    "Alojamiento": <House size={24} />,
    "Excursiones": <MapTrifold size={24} />,
  };
  const [cantidadDias, setCantidadDias] = useState(0);
  const [cantidadNoches, setCantidadNoches] = useState(0);
  const [fechaFormateada, setFechaFormateada] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [key, setKey] = useState(0);
  const images = existingImages.length > 0 ? existingImages.map((img) => ({ src: img })) : [{ src: "/assets/images/default.jpg" }];

  
  const calcularDiasYNoches = (departureDate, returnDate) => {
    if (!departureDate || !returnDate) return { dias: 0, noches: 0, fechaFormateada: "" };
  
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
  
    const cantidadDias = Math.round((returnD - departure) / (1000 * 60 * 60 * 24)) + 1;
    const cantidadNoches = cantidadDias - 1;
  
    const fechaFormateada = `${diasSemana[departure.getDay()]} ${departure.getDate()} de ${meses[departure.getMonth()]} de ${departure.getFullYear()} - ${diasSemana[returnD.getDay()]} ${returnD.getDate()} de ${meses[returnD.getMonth()]} ${returnD.getFullYear()}`;
  
    return { dias: cantidadDias, noches: cantidadNoches, fechaFormateada };
  };

  useEffect(() => {
    if (formData.departureDate && formData.returnDate) {
      const { dias, noches, fechaFormateada } = calcularDiasYNoches(formData.departureDate, formData.returnDate);
      setCantidadDias(dias);
      setCantidadNoches(noches);
      setFechaFormateada(fechaFormateada);
    }
  }, [formData.departureDate, formData.returnDate]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setKey((prevKey) => prevKey + 1), 100); // Asegura re-render
    }
  }, [isOpen]);


  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await fetch(`https://api.vayaturismo.com/api/packages/${packageId}`);
        if (!response.ok) throw new Error("Error al obtener el paquete");
  
        const data = await response.json();
        console.log("📥 Datos recibidos del backend:", data);
  
        setFormData({
          title: data.title,
          destination: data.destination,
          departureDate: data.departureDate ? new Date(data.departureDate).toISOString().split("T")[0] : "",
          returnDate: data.returnDate ? new Date(data.returnDate).toISOString().split("T")[0] : "",
        });
  
        setExistingImages(data.images || []);
        
        setSections(data.sections.map(section => {
          console.log("🔍 Sección cargada:", section); // Depurar cada sección
          return {
            ...section,
            iconType: section.iconType, // Guardar solo el nombre del icono
          };
        }));
  
        setDestinationSections(data.destinationSections.map(section => {
          console.log("🔍 Sección destino cargada:", section);
          return {
            ...section,
            iconType: section.iconType,
          };
        }));
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setFetchError(true);
      } 
    };
  
    if (packageId) fetchPackageData();
  }, [packageId]);

  const toggleNav = () => {
    console.log('gs')
    setIsNavOpen(!isNavOpen);
  };
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("https://api.vayaturismo.com/packages");
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
    setTimeout(() => setLoading(false), 1400);
  }, []);

  const formatTextWithLineBreaks = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  
  
  const packageIcons = [
    { name: "Bus", icon: <Bus size={24} /> },
    { name: "Avión", icon: <Airplane size={24} /> },
    { name: "Alojamiento", icon: <House size={24} /> },
    { name: "Excursiones", icon: <MapTrifold  size={24} /> },
  ];
  
  const destinationIcons = [
    { name: "Bus", icon: <Bus size={24} /> },
    { name: "Avión", icon: <Airplane size={24} /> },
    { name: "Alojamiento", icon: <House size={24} /> },
    { name: "Excursiones", icon: <MapTrifold  size={24} /> },
  ];
  if (loading) {
    // Mostrar el loader mientras el estado `loading` sea true
    return (
      <div className="loader-container">
        <Spinner animation="border" role="status" className="loader">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <hr className="top-line" />
      <header id="header" className="fixed-top ">
        <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 d-flex align-items-center">
            {/* <h1 className="logo"><a href="/">LOGO</a></h1> */}
            <a href="/" className="logo"><img src="/assets/images/logo.png" alt="" className="img-fluid"/></a>
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

      <main id="main">
      <div className="margin-destinos2"></div>
      <Container  className="container-main-package py-4">
              <Row className="mtrow d-flex justify-content-center">
                <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="card-package w-full max-w-3xl p-6 space-y-4  rounded-2xl">
                <div className="d-flex flex-column flex-md-row align-items-start w-100">
    
                  {/* Contenedor de la Imagen con el botón */}
                  <div className="col-12 col-md-8 position-relative">
                    <label htmlFor="imageUpload" className="package_image border-dashed border-2 p-10 d-flex justify-content-center align-items-center rounded-lg cursor-pointer">
                      <img 
                        src={existingImages[0]} 
                        alt="Paquete" 
                        className="img-package img-fluid rounded-lg"
                        onClick={() => !isOpen && setIsOpen(true)}
                      />

                    {/* Botón de Ver Fotos */}
                    <button 
                      className="btn-see-more btn btn-light position-absolute top-0 start-0 m-2" 
                      onClick={() => !isOpen && setIsOpen(true)}
                    >
                      Ver Fotos
                    </button>
                    </label>
                  </div>

                  {/* 🟦 Cuadrado al lado de la imagen */}
                  <div className="col-12 col-md-4 box-contact info-box border border-primary rounded p-4 ms-4" style={{ width: "200px", height: "200px" }}>
                    <h5 className="text-center text-primary title-contact-package">¡Consulta por este paquete!</h5>
                    <p className="p-contact"><Phone className="contact-icon"  size={20}/>351 393-4673</p>
                    <p className="p-contact"><EnvelopeSimple className="contact-icon" size={20}/>adriyornet@gmail.com</p>
                    <p className="p-contact"><InstagramLogo className="contact-icon" size={20}/>@vayaturismo</p>
                    <div className="d-flex justify-content-center">
                      <button type='button' onClick={() => window.location.href = "https://vayaturismo.com/contacto"} className="btn-contact-package">Consultar</button>
                    </div>
                  </div>
                </div>

                    {isOpen && (
                      <Lightbox
                      open={isOpen}
                      close={() => setIsOpen(false)}
                      slides={images}
                      index={photoIndex}
                      plugins={[Fullscreen, Thumbnails, Zoom]} // Opcional: Agrega zoom y miniaturas
                    />
                    )}

                    <h1 type="text" name='title' placeholder="Título del paquete" className="title-n1" >{formData.title}</h1>
                    <h1 type="text" name='title' placeholder="Título del paquete" className="title-n2" >{formData.destination} - {cantidadNoches} Noches</h1>

                    <div className="grid grid-cols-2 gap-4">
                    <h3 className="text-title-add font-semibold text-lg">Fecha de Salida y de Regreso</h3>
                    <div className="row">
                      <div className="date-container d-flex align-items-center col-12 col-md-5">
                      <CalendarIcon size={22} /> <span className="text-date">{fechaFormateada}</span>
                      </div>
                    </div>
                    </div>

                    <h3 className="text-title-add font-semibold text-lg">Este paquete incluye</h3>
                    {sections.map((section, index) => (
                      <Card key={index} className="card-section p-4 space-y-2">
                      <div className="d-flex align-items-center ">
                      {iconMap[section.iconType] ?? <Bus size={24} />}
                        <h1 className="title-section ">{section.title}</h1>
                      </div>
                        <h1 className="description-section ">{formatTextWithLineBreaks(section.description)}</h1>
                      </Card>
                    ))}


                    <h3 className="text-title-add font-semibold text-lg">Incluido en {formData.destination} <span className="orange_square">{cantidadDias} Dias / {cantidadNoches} Noches</span></h3>
                    {destinationSections.map((section, index) => (
                      <Card key={index} className="card-section p-4 space-y-2">
                      <div className="d-flex align-items-center">
                        {iconMap[section.iconType] ?? <Bus size={24} />}
                        <h1 className="title-section ">{section.title}</h1>
                      </div>
                      <h1 className="description-section ">{formatTextWithLineBreaks(section.description)}</h1>
                      </Card>
                    ))}


                    <div className="row d-flex justify-content-center">
                    </div>
                </Card>
              </div>
            </Row>

          </Container>
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
