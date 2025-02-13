"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Navbar, Spinner, Alert, Card, Form, Button, Modal, ListGroup, CloseButton  } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../globals2.css";
import "./style.css";
import { House, ChatText, Airplane, SignOut, CaretDown, MapTrifold, Bus  } from "phosphor-react";
import { usePathname } from "next/navigation"; // Importar usePathname
import { CalendarIcon, CirclePlus  } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname(); // Obtener la URL actual
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
  const [imagesToDelete, setImagesToDelete] = useState([]); // Imágenes marcadas para eliminar
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    sections: [{ title: "", description: "", icon: <Bus size={24} /> }],
    destinationSections: [{ title: "", description: "", icon: <Bus size={24} /> }],
    uploadedImages: [],
  });
  const urlPath = window.location.pathname; // Obtiene la ruta completa (ej: /messages/8)
  const packageId = urlPath.split("/").pop(); // Extrae el último segmento (ID)
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState(""); // "success" o "danger"
  const iconMap = {
    "Bus": <Bus size={24} />,
    "Avión": <Airplane size={24} />,
    "Alojamiento": <House size={24} />,
    "Excursiones": <MapTrifold size={24} />,
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevFormData) => ({
      ...prevFormData,  // Copiamos el estado anterior
      [name]: value,    // Actualizamos solo el campo modificado
    }));
  };
  
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
      } finally {
        setLoading(false);
      }
    };
  
    if (packageId) fetchPackageData();
  }, [packageId]);
      

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    setAlertMessage(""); // Limpiar mensaje previo
    setAlertVariant("");

    data.append("title", formData.title);
    data.append("destination", formData.destination);
    data.append("departureDate", formData.departureDate);
    data.append("returnDate", formData.returnDate);

    uploadedImages.forEach((file) => data.append("images", file));
    imagesToDelete.forEach((image) => data.append("deleteImages", image));
    sectionsToDelete.forEach((sectionId) => data.append("deleteSections", sectionId));
    destinationSectionsToDelete.forEach((sectionId) => data.append("deleteDestinationSections", sectionId));

    sections.forEach((section, index) => {
      data.append(`sections[${index}][id]`, section.id || ""); // Enviar el ID de la sección existente
      data.append(`sections[${index}][title]`, section.title);
      data.append(`sections[${index}][description]`, section.description);
      data.append(`sections[${index}][icon]`, section.iconType || "Bus");
    });

    destinationSections.forEach((section, index) => {
      data.append(`destinationSections[${index}][id]`, section.id || ""); // Enviar el ID de la sección existente
      data.append(`destinationSections[${index}][title]`, section.title);
      data.append(`destinationSections[${index}][description]`, section.description);
      data.append(`destinationSections[${index}][icon]`, section.iconType || "Bus");
    });

    try {
      const response = await fetch(`https://api.vayaturismo.com/api/packages/${packageId}`, {
        method: "PUT",
        body: data,
      });

      if (!response.ok) throw new Error("Error al actualizar el paquete");

      setAlertMessage("✅ Paquete actualizado con éxito.");
      setAlertVariant("success");
    } catch (error) {
      console.error("Error al actualizar:", error);
      setAlertMessage("❌ Error al actualizar el paquete. Inténtalo nuevamente.");
      setAlertVariant("danger");
  }
  };

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  setUploadedImages((prev) => [...prev, ...files]); // Guardamos los objetos File
};
const removeExistingImage = (image) => {
    setImagesToDelete((prev) => [...prev, image]);
    setExistingImages(existingImages.filter((img) => img !== image));
  };

//   const addSection = (type) => {
//     const newSection = { title: "", description: "", icon: <Bus size={24} /> };
//     if (type === "package") {
//       setSections([...sections, newSection]);
//     } else {
//       setDestinationSections([...destinationSections, newSection]);
//     }
//   };
  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };
//   const removeSection = (type, index) => {
//     if (type === "package") {
//       setSections(sections.filter((_, i) => i !== index));
//     } else {
//       setDestinationSections(destinationSections.filter((_, i) => i !== index));
//     }
//   };

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
        const response = await fetch("https://api.vayaturismo.com/packages");
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

  const handleSectionChange = (type, index, field, value) => {
    if (type === "package") {
      setSections((prevSections) => {
        const updatedSections = [...prevSections];
        updatedSections[index] = { ...updatedSections[index], [field]: value };
        return updatedSections;
      });
    } else {
      setDestinationSections((prevDestinationSections) => {
        const updatedDestinationSections = [...prevDestinationSections];
        updatedDestinationSections[index] = { ...updatedDestinationSections[index], [field]: value };
        return updatedDestinationSections;
      });
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

  const openIconSelector = (index, type) => {
    setActiveSection({ index, type });
    setIconType(type);
    setShowModal(true);
  };

  const selectIcon = (iconName) => {
    console.log("🟢 Icono seleccionado:", iconName); // Verifica qué icono estás seleccionando

    if (activeSection) {
      if (activeSection.type === "package") {
        setSections((prevSections) => {
          const updatedSections = [...prevSections];
          updatedSections[activeSection.index] = {
            ...updatedSections[activeSection.index],
            iconType: iconName, // Guardar solo el nombre del icono en texto
          };
          console.log("🔵 Sección actualizada (package):", updatedSections[activeSection.index]);
          return updatedSections;
        });
      } else if (activeSection.type === "destination") {
        setDestinationSections((prevDestinationSections) => {
          const updatedDestinationSections = [...prevDestinationSections];
          updatedDestinationSections[activeSection.index] = {
            ...updatedDestinationSections[activeSection.index],
            iconType: iconName, // Guardar solo el nombre del icono
          };
          console.log("🔵 Sección actualizada (destination):", updatedDestinationSections[activeSection.index]);
          return updatedDestinationSections;
        });
      }
    }
    setShowModal(false);
  };

  const addSection = () => {
    setSections([...sections, { title: "", description: "", iconType: "Bus" }]);
  };

  const removeSection = (index, id) => {
    if (id) setSectionsToDelete((prev) => [...prev, id]);
    setSections(sections.filter((_, i) => i !== index));
  };

  const addDestinationSection = () => {
    setDestinationSections([...destinationSections, { title: "", description: "", iconType: "Bus" }]);
  };

  const removeDestinationSection = (index, id) => {
    if (id) setDestinationSectionsToDelete((prev) => [...prev, id]);
    setDestinationSections(destinationSections.filter((_, i) => i !== index));
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
          <a href="/" className="logo"><img src="/assets/images/logo.png" alt="" className="img-fluid logodashboard"/></a>
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
              className="textl active-link"
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
                    <label htmlFor="imageUpload" className="add_image border-dashed border-2 p-10 d-flex justify-content-center align-items-center rounded-lg cursor-pointer">
                      <CirclePlus className="plusicon_image" strokeWidth={1} size={50} />
                    </label>
                    <input type="file" id="imageUpload" multiple className="d-none" onChange={handleImageUpload} />
                    <ListGroup className="listgroup_images mt-3">
                      {/* Mostrar imágenes existentes del backend */}
                      {existingImages.map((image, index) => (
                        <ListGroup.Item key={`existing-${index}`} className="d-flex justify-content-between align-items-center">
                          <img src={image} alt={`Imagen ${index}`} className="img-thumbnail" width="100" />
                          <CloseButton onClick={() => removeExistingImage(image)} />
                        </ListGroup.Item>
                      ))}
                      
                      {/* Mostrar imágenes nuevas que se están subiendo */}
                      {uploadedImages.map((file, index) => (
                        <ListGroup.Item key={`uploaded-${index}`} className="d-flex justify-content-between align-items-center">
                          <img src={URL.createObjectURL(file)} alt={`Nueva Imagen ${index}`} className="img-thumbnail" width="100" />
                          <CloseButton onClick={() => removeImage(index)} />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>

                    <Form.Group>
                      <Form.Control type="text" name='title' placeholder="Título del paquete" className="fc_cp" value={formData.title} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control type="text" name="destination" placeholder="Destino" className="fpc2 fc_cp" value={formData.destination} onChange={handleChange} />
                    </Form.Group>
                    <div className="grid grid-cols-2 gap-4">
                    <h3 className="text-title-add font-semibold text-lg">Fecha de Salida y de Regreso</h3>
                    <div className="row">
                      <div className="col-12 col-md-5">
                      <Form.Group>
                        <Form.Control type="date" name="departureDate" className="fc_cp_date1" value={formData.departureDate} onChange={handleChange} />
                      </Form.Group>
                      </div>
                      <div className="col-12 col-md-5"> 
                      <Form.Group>
                        <Form.Control type="date" name="returnDate" className="fc_cp_date2" value={formData.returnDate} onChange={handleChange} />
                      </Form.Group>
                      </div>
                      <div className="col-md-1">

                      </div>
                    </div>
                    </div>

                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                      <Modal.Header closeButton>
                        <Modal.Title className="title-modal">Selecciona una sección</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="grid grid-cols-2 mda-2">
                          {(iconType === "package" ? packageIcons : destinationIcons).map((item, index) => (
                            <div
                              key={index}
                              className="mda_1 flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-200"
                              onClick={() => selectIcon(item.name)}
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
                      {iconMap[section.iconType] ?? <Bus size={24} />}
                      <CaretDown size={12} />
                      </div>

                        <Form.Group className="d-flex">
                          <Form.Control type="text" placeholder="Título de la sección" className="title-section" 
                            value={section.title}
                            onChange={(e) => handleSectionChange("package", index, "title", e.target.value)}
                          />
                        </Form.Group>
                      </div>
                        <Form.Group>
                          <Form.Control as="textarea" placeholder="Descripción" className="description-section w-full" 
                            value={section.description}
                            onChange={(e) => handleSectionChange("package", index, "description", e.target.value)}
                          />
                        </Form.Group>
                        <div className="row d-flex justify-content-center">
                          <Button type="button" onClick={() => removeSection(index, section.id)}  className="w-full btn-final2">Eliminar Sección</Button>
                        </div>
                      </Card>
                    ))}

                    <div className="add-section d-flex justify-content-center align-items-center" onClick={addSection}>
                      <CirclePlus strokeWidth={1}  size={40} /> <span className="text-add-section">Agrega una nueva sección</span>
                    </div>

                    <h3 className="text-title-add font-semibold text-lg">Incluido en Destino</h3>
                    {destinationSections.map((section, index) => (
                      <Card key={index} className="card-section p-4 space-y-2">
                      <div className="d-flex align-items-center space-x-2">
                        <div className="cursor-pointer" onClick={() => openIconSelector(index, "destination")}> 
                        {iconMap[section.iconType] ?? <Bus size={24} />}
                        <CaretDown size={12} />
                        </div>
                        <Form.Group className="d-flex">
                          <Form.Control type="text" placeholder="Título de la sección" className="title-section" 
                            value={section.title}
                            onChange={(e) => handleSectionChange("destination", index, "title", e.target.value)}
                          />
                        </Form.Group>
                      </div>
                        <Form.Group>
                          <Form.Control as="textarea" placeholder="Descripción" className="description-section w-full" 
                            value={section.description}
                            onChange={(e) => handleSectionChange("destination", index, "description", e.target.value)}
                          />
                        </Form.Group>
                        <div className="row d-flex justify-content-center">
                          <Button type="button" onClick={() => removeDestinationSection(index, section.id)}  className="w-full btn-final2">Eliminar Sección</Button>
                        </div>
                      </Card>
                    ))}

                    <div className="add-section d-flex justify-content-center align-items-center" onClick={addDestinationSection}>
                      <CirclePlus strokeWidth={1}  size={40}  /> <span className="text-add-section">Agrega una nueva sección</span>
                    </div>

                    <div className="row d-flex justify-content-center">
                    <Button type="submit" className="w-full btn-final" onClick={handleSubmit}>
                      Actualizar Paquete
                    </Button>
                    {alertMessage && (
                          <Alert variant={alertVariant} className="alert-21">
                              {alertMessage}
                          </Alert>
                      )}
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
