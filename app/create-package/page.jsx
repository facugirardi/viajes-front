"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Navbar, Spinner, Alert, Card, Form, Button, Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../globals2.css";
import "./style.css";
import { House, ChatText, Airplane, SignOut, CaretDown, MapTrifold, Bus  } from "phosphor-react";
import { usePathname } from "next/navigation"; // Importar usePathname
import { CalendarIcon, CirclePlus  } from "lucide-react";

const Page = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname(); // Obtener la URL actual
  const [loading, setLoading] = useState(true); // Estado para el loader
  const [packages, setPackages] = useState([]); // Estado para los paquetes
  const [fetchError, setFetchError] = useState(false); // Estado para manejar errores de conexión
  const [sections, setSections] = useState([{ title: "", description: "", icon: <Bus size={24} /> }]);
  const [destinationSections, setDestinationSections] = useState([
    { title: "", description: "", icon: <Bus size={24} /> },
  ]);
  const [selectedIcon, setSelectedIcon] = useState(<Bus size={24} />);
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [iconType, setIconType] = useState("");

  const addSection = (type) => {
    const newSection = { title: "", description: "", icon: <Bus size={24} /> };
    if (type === "package") {
      setSections([...sections, newSection]);
    } else {
      setDestinationSections([...destinationSections, newSection]);
    }
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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const openIconSelector = (index, type) => {
    setActiveSection({ index, type });
    setIconType(type);
    setShowModal(true);
  };
  const selectIcon = (icon) => {
    if (activeSection) {
      if (activeSection.type === "package") {
        setSections((prevSections) => {
          const updatedSections = [...prevSections];
          updatedSections[activeSection.index] = {
            ...updatedSections[activeSection.index],
            icon,
          };
          return updatedSections;
        });
      } else if (activeSection.type === "destination") {
        setDestinationSections((prevDestinationSections) => {
          const updatedDestinationSections = [...prevDestinationSections];
          updatedDestinationSections[activeSection.index] = {
            ...updatedDestinationSections[activeSection.index],
            icon,
          };
          return updatedDestinationSections;
        });
      }
    }
    setShowModal(false);
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
            <h5 className="dashboard-title">Dashboard <span className="mensajes-title">&gt; Paquetes</span></h5>
              <Row className="mtrow d-flex justify-content-center">
                <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-3xl p-6 space-y-4  rounded-2xl">
                  <Form>
                    <div className="add_image border-dashed border-2 p-10 d-flex justify-content-center align-items-center rounded-lg">
                      <CirclePlus className='plusicon_image' strokeWidth={1} size={50} />
                    </div>
                    <Form.Group>
                      <Form.Control type="text" placeholder="Título del paquete" className="fc_cp" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control type="text" placeholder="Destino" className="fpc2 fc_cp" />
                    </Form.Group>
                    <div className="grid grid-cols-2 gap-4">
                    <h3 className="text-title-add font-semibold text-lg">Fecha de Salida y de Regreso</h3>
                    <div className="row">
                      <div className="col-12 col-md-5">
                      <Form.Group>
                        <Form.Control type="date" className="fc_cp_date1" />
                      </Form.Group>
                      </div>
                      <div className="col-12 col-md-5"> 
                      <Form.Group>
                        <Form.Control type="date" className="fc_cp_date2" />
                      </Form.Group>
                      </div>
                      <div className="col-md-1">

                      </div>
                    </div>
                    </div>

                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                      <Modal.Header closeButton>
                        <Modal.Title className="title-modal">Selecciona un Icono</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="grid grid-cols-2 mda-2">
                          {(iconType === "package" ? packageIcons : destinationIcons).map((item, index) => (
                            <div
                              key={index}
                              className="mda_1 flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-200"
                              onClick={() => selectIcon(item.icon)}
                            >
                              {item.icon}
                              <span className="mda-title">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </Modal.Body>
                    </Modal>


                    <h3 className="text-title-add font-semibold text-lg">Este paquete incluye</h3>
                    {sections.map((section, index) => (
                      <Card key={index} className="card-section p-4 space-y-2">
                      <div className="d-flex align-items-center space-x-2">
                      <div className="cursor-pointer" onClick={() => openIconSelector(index, "package")}> 
                        {section.icon}
                        <CaretDown size={12} />
                      </div>

                        <Form.Group className="d-flex">
                          <Form.Control type="text" placeholder="Título de la sección" className="title-section" />
                        </Form.Group>
                      </div>
                        <Form.Group>
                          <Form.Control as="textarea" placeholder="Descripción" className="description-section w-full" />
                        </Form.Group>
                      </Card>
                    ))}

                    <div className="add-section d-flex justify-content-center align-items-center" onClick={() => addSection("package")}>
                      <CirclePlus strokeWidth={1}  size={40} /> <span className="text-add-section">Agrega una nueva sección</span>
                    </div>

                    <h3 className="text-title-add font-semibold text-lg">Incluido en Destino</h3>
                    {destinationSections.map((section, index) => (
                      <Card key={index} className="card-section p-4 space-y-2">
                      <div className="d-flex align-items-center space-x-2">
                        <div className="cursor-pointer" onClick={() => openIconSelector(index, "destination")}> 
                          {section.icon}
                          <CaretDown size={12} />
                        </div>
                        <Form.Group className="d-flex">
                          <Form.Control type="text" placeholder="Título de la sección" className="title-section" />
                        </Form.Group>
                      </div>
                        <Form.Group>
                          <Form.Control as="textarea" placeholder="Descripción" className="description-section w-full" />
                        </Form.Group>
                      </Card>
                    ))}

                    <div className="add-section d-flex justify-content-center align-items-center" onClick={() => addSection("destination")}>
                      <CirclePlus strokeWidth={1}  size={40}  /> <span className="text-add-section">Agrega una nueva sección</span>
                    </div>

                    <div className="row d-flex justify-content-center">
                    <Button type="submit" className="w-full btn-final">Crear Paquete</Button>
                    </div>
                  </Form>
                </Card>
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
