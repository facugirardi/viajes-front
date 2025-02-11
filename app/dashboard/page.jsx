"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Navbar, Spinner, Alert, Card, Modal, Button  } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../globals2.css";
import "./style.css";
import { House, ChatText, Airplane, SignOut, PencilSimple, Trash } from "phosphor-react";
import { usePathname } from "next/navigation"; // Importar usePathname
import { toast } from "react-toastify";

const Page = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname(); // Obtener la URL actual
  const [loading, setLoading] = useState(true); // Estado para el loader
  const [packages, setPackages] = useState([]); // Estado para los paquetes
  const [fetchError, setFetchError] = useState(false); // Estado para manejar errores de conexión
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  const handleShowDeleteModal = (packageId) => {
    setPackageToDelete(packageId);
    setShowDeleteModal(true);
  };
  
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setPackageToDelete(null);
  };
    
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; // Redirección si no está logueado
    }
    // Simular un delay de 1 segundo para mostrar el loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/packages");
        const data = await response.json();

        if (response.ok) {
          setPackages(data); // Guardar los paquetes en el estado
          console.log(packages)
        } else {
          setFetchError(true);
        }
      } catch (err) {
        console.error("Error al obtener los paquetes:", err);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();

    return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
  
  }, []);

  const handleDelete = async () => {
    if (!packageToDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/delete_package/${packageToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el paquete");
      }

      const result = await response.json();
      toast.success(result.message);
      setShowDeleteModal(false);
      setPackages((prev) => prev.filter((p) => p.id !== packageToDelete)); // Actualizar UI
    } catch (error) {
      console.error("Error:", error);
      toast.error("No se pudo eliminar el paquete");
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
          <a href="/" className="logo"><img src="assets/images/logo.png" alt="" className="img-fluid logodashboard"/></a>
          <hr style={{
            border: "none",
            borderTop: "1px solid rgb(184, 187, 191)",
            marginTop: "25px !important"
          }} />
            <p className="textp">Acciones</p>
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
              className={`textl ${pathname === "/messages" ? "active-link" : ""}`}
            >
              <ChatText size={20} weight="bold" className="me-2" /> Mensajes
            </Nav.Link>
            <Nav.Link onClick={logout} className="textl ">
            <SignOut size={20} weight="bold" className="me-2" /> Cerrar Sesión
            </Nav.Link>
          </Nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Topbar */}
          <Navbar  className="navbar px-3">
            <button
              className="btn btn-outline-primary d-lg-none"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list"></i>
            </button>
          </Navbar>

          {/* Page Content */}
          <Container fluid className="py-4">
            <Row>
            <div className="col-md-5">
            <h5 className="dashboard-title">Dashboard <span className="mensajes-title">&gt; Paquetes</span></h5>
            </div>
            <div className="col-md-5">
            </div>
            <div className="col-md-2 d-flex justify-content-center">
            <button className="text-center btn btn-primary btn-read" 
            onClick={() => window.location.href = `http://localhost:3000/create-package`}
            >Crear Paquete
            </button>
            </div>
            </Row>
            {/* Mostrar alerta si hubo un error de conexión */}
            {fetchError && <Alert variant="warning" className="alertme text-center">Error al cargar los paquetes. Inténtalo más tarde.</Alert>}

            <Row className="row-cards mt-4">
              {packages.length === 0 && !fetchError ? (
                <Alert variant="warning" className="alertme text-center">No hay paquetes disponibles</Alert>
              ) : (
                packages.map((pack) => (
                  <Col key={pack.id} md={3} sm={6} xs={12} className="mb-4">
                    <Card className="package-card">
                      {/* Botón de eliminar */}
                      <button className="delete-btn" onClick={() => handleShowDeleteModal(pack.id)}>
                        <Trash weight="bold" />
                      </button>

                      {/* Imagen del paquete */}
                      <Card.Img
                        variant="top"
                        src={pack.images?.[0] || "/assets/images/places/image.png"}
                        className="package-image"
                      />

                      {/* Nombre del paquete en hover */}
                      <div className="package-info">
                        <h5>{pack.name}</h5>
                      </div>
                    </Card>
                  </Col>
                ))
              )}
            </Row>

          </Container>
        </div>
      </div>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered className="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar este paquete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

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
