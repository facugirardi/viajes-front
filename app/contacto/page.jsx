"use client";
import Link from "next/link";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import Footer from "@/layouts/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/public/assets/vendor/boxicons/css/boxicons.min.css";
import "@/public/assets/vendor/glightbox/css/glightbox.min.css";
import "@/public/assets/vendor/remixicon/remixicon.css";
import "@/public/assets/vendor/swiper/swiper-bundle.min.css";
import debounce from "lodash.debounce";
import Swiper, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import GLightbox from 'glightbox';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Isotope from "isotope-layout";
import "@/public/assets/js/main.js";
import '../globals2.css'
import './contact.css'
import axios from 'axios';
import Select from "react-select";

const page = () => {
  const [activeTab, setActiveTab] = useState("viajes");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [airports, setAirports] = useState([]); // Lista de aeropuertos
  const [suggestionsOrigen, setSuggestionsOrigen] = useState([]); // Sugerencias para origen
  const [suggestionsDestino, setSuggestionsDestino] = useState([]); // Sugerencias para destino
  const [activeField, setActiveField] = useState(""); // Control de qué campo está activo
  const [cities, setCities] = useState([]); // Lista de ciudades
  const [suggestionsCityOrigen, setSuggestionsCityOrigen] = useState([]); // Sugerencias para origen (ciudades)
  const [suggestionsCityDestino, setSuggestionsCityDestino] = useState([]); // Sugerencias para destino (ciudades)
  
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json");
        setCities(response.data); // Guardamos todas las ciudades en estado
      } catch (error) {
        console.error("Error al cargar ciudades", error);
      }
    };
    
    // Cargar lista de aeropuertos desde la API
    const fetchAirports = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/mwgg/Airports/master/airports.json"
        );
        const airportsData = Object.values(response.data)
          .filter(airport => airport.iata) // Solo con código IATA
          .map(airport => ({
            value: airport.iata,
            label: `${airport.iata} - ${airport.name}, ${airport.city}, ${airport.country}`
          }));
        setAirports(airportsData);
      } catch (error) {
        console.error("Error al obtener aeropuertos", error);
      }
    };
    fetchCities();
    fetchAirports();
  }, []);
  // Función para manejar la selección de aeropuerto
  const handleSelect = (selectedValue, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: selectedValue,
    }));
    setActiveField(""); // Cerrar las sugerencias al seleccionar
  };
  const cityList = useMemo(() => cities.map(city => ({
    name: city.name,
    country: city.country
  })), [cities]);
  
  const airportList = useMemo(() => airports, [airports]);
  
  const debouncedAirportSearch = useCallback(debounce((input, field, setSuggestions) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }
  
    const inputLower = input.toLowerCase();
    const filteredAirports = airportList
      .filter(airport =>
        airport.label.toLowerCase().includes(inputLower)
      )
      .slice(0, 8); // Limita a 8 resultados
  
    setSuggestions(filteredAirports);
  }, 200), [airportList]);
  
  const debouncedSearch = useCallback(debounce((input, field, setSuggestions) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }
  
    const inputLower = input.toLowerCase();
    const filteredCities = cityList
      .filter(city =>
        city.name.toLowerCase().includes(inputLower) ||
        city.country.toLowerCase().includes(inputLower)
      )
      .slice(0, 8); // Limita a 8 resultados
  
    setSuggestions(filteredCities);
  }, 200), [cityList]); // Dependencia solo de la lista de ciudades
  
  
  
  const getCitySuggestions = (value) => {
    if (!value) return [];
    const inputValue = value.trim().toLowerCase();
  
    return cities
      .filter(city =>
        city.name.toLowerCase().includes(inputValue) ||
        city.country.toLowerCase().includes(inputValue)
      )
      .slice(0, 5); // Limitar a 8 sugerencias
  };
  const handleCityInputChange = (event, field) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  
    requestAnimationFrame(() => {
      if (field === "ciudadOrigen") {
        debouncedSearch(value, field, setSuggestionsCityOrigen);
      } else {
        debouncedSearch(value, field, setSuggestionsCityDestino);
      }
    });
  };
    
  const airportOptions = airports.map(airport => ({
    value: airport.iata,
    label: `${airport.iata} ${airport.name} - ${airport.city}, ${airport.country}`
  }));
  
// Función para obtener sugerencias de aeropuertos
const getSuggestions = (value) => {
  if (!value) return []; // Si no hay valor, devolver array vacío
  const inputValue = value.trim().toLowerCase(); // Asegurar que siempre haya un string válido

  return airports
    .filter(
      airport =>
        airport.name.toLowerCase().includes(inputValue) ||
        airport.city.toLowerCase().includes(inputValue) ||
        airport.iata.toLowerCase().includes(inputValue)
    )
    .slice(0, 8); // Limitar a 8 sugerencias
};
// Función para manejar la selección de aeropuerto
const handleSelectChange = (selectedOption, field) => {
  setFormData(prev => ({
    ...prev,
    [field]: selectedOption ? selectedOption.label : ""
  }));
};

const onChangeOrigen = (_, { newValue }) => {
  setFormData((prev) => ({
    ...prev,
    origen: newValue,
  }));
};

const onChangeDestino = (_, { newValue }) => {
  setFormData((prev) => ({
    ...prev,
    destino: newValue,
  }));
};

  // Renderizar cada sugerencia
  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.iata} - {suggestion.city}, {suggestion.country}
    </div>
  );
  // Configuración de Autosuggest para "Origen" y "Destino"
  const inputPropsOrigen = {
    placeholder: "Ingrese el origen",
    value: formData.origen || "", // Asegurar que no sea undefined
    onChange: onChangeOrigen,
    className: "form-control cmpo",
  };
  
  const inputPropsDestino = {
    placeholder: "Ingrese el destino",
    value: formData.destino || "", // Asegurar que no sea undefined
    onChange: onChangeDestino,
    className: "form-control cmpo",
  };

  const handleAirportInputChange = (event, field) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  
    requestAnimationFrame(() => {
      if (field === "origen") {
        debouncedAirportSearch(value, field, setSuggestionsOrigen);
        setActiveField("origen");  // 🔥 Se activa el campo de origen
      } else {
        debouncedAirportSearch(value, field, setSuggestionsDestino);
        setActiveField("destino"); // 🔥 Se activa el campo de destino
      }
    });
  };
    
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
              <div className="autocomplete-container">
              <input
                className="autocomplete-input form-control cmpo"
                type="text"
                id="destino"
                value={formData.destino || ""}
                onChange={(e) => handleCityInputChange(e, "destino")}
                placeholder="Ingrese el destino..."
                onBlur={() => setTimeout(() => setSuggestionsCityDestino([]), 200)}
              />
              {suggestionsCityDestino.length > 0 && (
                <ul className="autocomplete-suggestions" onMouseDown={(e) => e.preventDefault()}>
                  {suggestionsCityDestino.map((city, index) => (
                    <li key={index} className="autocomplete-suggestion" onClick={() => handleSelect(city.name, "destino")}>
                      {city.name}, {city.country}
                    </li>
                  ))}
                </ul>
              )}
              </div>
                {/* <input
                  type="text"
                  className="form-control cmpo"
                  id="destino"
                  value={formData.destino || ""}
                  onChange={handleChange}
                  placeholder="Ingrese el destino"
                /> */}
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
                  {/* <input
                    type="text"
                    className="form-control cmpo"
                    id="origen"
                    onChange={handleChange}
                    value={formData.origen || ""}
                    placeholder="Ingrese el origen"
                  /> */}
                  <div className="autocomplete-container">
                    <input
                      className="autocomplete-input form-control cmpo"
                      type="text"
                      id="origen"
                      value={formData.origen}
                      onChange={(e) => handleAirportInputChange(e, "origen")}
                      placeholder="Ingrese el origen..."
                      onFocus={() => setActiveField("origen")}
                      onBlur={() => setTimeout(() => setActiveField(""), 1)} 
                    />
                    {activeField === "origen" && suggestionsOrigen.length > 0 && (
                        <ul
                        className="autocomplete-suggestions"
                        onMouseDown={(e) => e.preventDefault()} 
                      >
                      {suggestionsOrigen.map((airport, index) => (
                          <li key={index} className="autocomplete-suggestion" onClick={() => handleSelect(airport.label, "origen")}>
                            {airport.label}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>

                </div>
                <div className="col-md-6">
                  <label htmlFor="destino" className="form-label">
                    Destino
                  </label>
                  {/* <input
                    type="text"
                    className="form-control cmpo"
                    id="destino"
                    onChange={handleChange}
                    value={formData.destino || ""}
                    placeholder="Ingrese el destino"
                  /> */}
                  <div className="autocomplete-container">
                    <input
                      className="autocomplete-input form-control cmpo"
                      type="text"
                      id="destino"
                      value={formData.destino}
                      onChange={(e) => handleAirportInputChange(e, "destino")}
                      placeholder="Ingrese el destino..."
                      onFocus={() => setActiveField("destino")}
                      onBlur={() => setTimeout(() => setActiveField(""), 1)} 
                    />
                    {/* Lista de sugerencias */}
                    {activeField === "destino" && suggestionsDestino.length > 0 && (
                        <ul
                        className="autocomplete-suggestions"
                        onMouseDown={(e) => e.preventDefault()} 
                      >
                        {suggestionsDestino.map((airport, index) => (
                          <li key={index} className="autocomplete-suggestion" onClick={() => handleSelect(airport.label, "destino")}>
                            {airport.label}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>

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
                  <div className="autocomplete-container">
                  <input
                    className="autocomplete-input form-control cmpo"
                    type="text"
                    id="destino"
                    value={formData.destino || ""}
                    onChange={(e) => handleCityInputChange(e, "destino")}
                    placeholder="Ingrese el destino..."
                    onBlur={() => setTimeout(() => setSuggestionsCityDestino([]), 200)}
                  />
                  {suggestionsCityDestino.length > 0 && (
                    <ul className="autocomplete-suggestions" onMouseDown={(e) => e.preventDefault()}>
                      {suggestionsCityDestino.map((city, index) => (
                        <li key={index} className="autocomplete-suggestion" onClick={() => handleSelect(city.name, "destino")}>
                          {city.name}, {city.country}
                        </li>
                      ))}
                    </ul>
                  )}
                  </div>
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
                  <div className="autocomplete-container">
                    <input
                      className="autocomplete-input form-control cmpo"
                      type="text"
                      id="destino"
                      value={formData.destino || ""}
                      onChange={(e) => handleCityInputChange(e, "destino")}
                      placeholder="Ingrese el destino..."
                      onBlur={() => setTimeout(() => setSuggestionsCityDestino([]), 200)}
                    />
                    {suggestionsCityDestino.length > 0 && (
                      <ul className="autocomplete-suggestions" onMouseDown={(e) => e.preventDefault()}>
                        {suggestionsCityDestino.map((city, index) => (
                          <li key={index} className="autocomplete-suggestion" onClick={() => handleSelect(city.name, "destino")}>
                            {city.name}, {city.country}
                          </li>
                        ))}
                      </ul>
                    )}
                    </div>
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
