"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Navbar, Spinner, Alert, Button  } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../globals2.css";
import "./style.css";
import { House, ChatText, Airplane, SignOut } from "phosphor-react";
import { usePathname } from "next/navigation"; // Importar usePathname
import axios from "axios";

const Page = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname(); // Obtener la URL actual
  const [loading, setLoading] = useState(true); // Estado para el loader
  const [message, setMessage] = useState([]);

  const urlPath = window.location.pathname; // Obtiene la ruta completa (ej: /messages/8)
  const messageId = urlPath.split("/").pop(); // Extrae el último segmento (ID)
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`https://api.vayaturismo.com/messages/${messageId}`);
        const data = await response.json();
        setMessage(data); // Guardamos el mensaje en el estado
      } catch (error) {
        console.error("Error fetching message:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [messageId]);

  const handleMarkAsRead = async () => {
    try {
      const response = await axios.put(`https://api.vayaturismo.com/messages/${message?.id}/mark_as_read`);
      
      if (response.status === 200) {
        setMessage((prev) => ({ ...prev, leido: true })); // Actualiza el estado local
      }
    } catch (error) {
      console.error("Error al marcar como leído:", error);
    }
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
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
      <div className={`dashboard ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
          <Nav defaultActiveKey="/" className="flex-column">
          <a href="/" className="logo"><img src="../assets/images/logo.png" alt="" className="img-fluid logodashboard"/></a>
          <hr style={{
            border: "none",
            borderTop: "1px solid rgb(184, 187, 191)",
            marginTop: "25px !important"
          }} />
            <Nav.Link
              href="/"
              className={`textl hometext ${pathname === "/" ? "active-link" : ""}`}
            >
              <House size={20} weight="bold" className="me-2" /> Inicio
            </Nav.Link>
            <Nav.Link
              href="/dashboard"
              className={`textl ${pathname === "/dashboard" ? "active-link" : ""}`}
            >
              <Airplane size={20} weight="bold" className="me-2" /> Paquetes
            </Nav.Link>
            <Nav.Link
              href="/messages"
              className="textl active-link"
            >
              <ChatText size={20} weight="bold" className="me-2" /> Mensajes
            </Nav.Link>
            <Nav.Link onClick={logout} className="textl">
            <SignOut size={20} weight="bold" className="me-2" /> Cerrar Sesión
            </Nav.Link>
          </Nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Topbar */}
          <Navbar className="navbar px-3">
            <button
              className="btn btn-outline-primary d-lg-none"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list"></i>
            </button>
          </Navbar>

          {/* Page Content */}
          <Container fluid className="py-4">
            <h5 className="dashboard-title">Dashboard <span className="mensajes-title">&gt; Mensajes</span></h5>
            <Row className="message-box">
              <div className='col-md-12 '>
                <h5 className="text-center title-c">Mensaje</h5>
              </div>
              <div className='col-12 col-mb-12 col-md-4'>
                <label htmlFor="destino" className="form-label">
                    Categoría
                  </label>
                <input
                  className=" form-control cmpo"
                  type="text"
                  readOnly 
                  value={message?.category || ""}
                />
              </div>
              <div className='col-12 col-mb-12 col-md-4 '>
                <label htmlFor="destino" className="form-label">
                    Nombre Completo
                  </label>
                <input
                  className=" form-control cmpo"
                  type="text"
                  readOnly
                  value={message?.name || ""}
                />
              </div>
              <div className='col-12 col-mb-12 col-md-4 '>
                <label htmlFor="destino" className="form-label">
                    Teléfono o Email
                  </label>
                <input
                  className=" form-control cmpo"
                  type="text"
                  readOnly
                  value={message?.email || ""}
                />
              </div>
              <div className='col-12 col-mb-12 col-md-12 '>
   
                <textarea
                  className="textarea-msg form-control cmpo"
                  type="text"
                  readOnly
                  value={message?.message || ""}
                />
              </div>

              <div className="col-12 d-flex justify-content-center ">
                <button className="btn btn-primary btn-read" onClick={handleMarkAsRead} disabled={message?.leido}>
                  {message?.leido ? "Leído" : "Marcar como leído"}
                </button>
              </div>

            </Row>
          </Container>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          display: flex;
          font-family: 'Poppins', sans-serif;

        }
        .sidebar {
          width: 250px;
          height: 100vh;
          background-color: #FFFFFF;
          border-right: 1px solid #dee2e6;
          position: fixed;
          top: 0;
          left: 0;
          transition: transform 0.3s ease-in-out;
          z-index: 1030;
        }
        .sidebar.active {
          transform: translateX(0);
        }
        .sidebar:not(.active) {
          transform: translateX(-100%);
        }
        .main-content {
          margin-left: 250px;
          width: calc(100% - 250px);
          transition: margin-left 0.3s ease-in-out;
        }
        .sidebar-open .main-content {
          margin-left: 250px;
        }
        .navbar {
          background: white;
          border-bottom: 1px solid #dee2e6;
        }
        @media (max-width: 991px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.active {
            transform: translateX(0);
          }
          .main-content {
            margin-left: 0;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Page;
