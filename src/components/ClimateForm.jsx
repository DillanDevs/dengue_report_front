import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2"; // Importa SweetAlert2
import CustomCard from "./CustomCard";
import baja_temperatura from "../assets/baja_temperatura.png";
import barometro from "../assets/barometro.png";
import lluvia from "../assets/lluvia.png";
import norte from "../assets/norte.png";
import ola_de_calor from "../assets/ola_de_calor.png";
import temperatura from "../assets/temperatura.png";
import velocimetro from "../assets/velocimetro.png";

const elementos = [
  {
    title: "Temperatura promedio",
    image: temperatura,
    text: "Esta variable representa la temperatura promedio registrada durante un periodo específico.",
  },
  {
    title: "Temperatura mínima",
    image: baja_temperatura,
    text: "Esta variable indica la temperatura más baja registrada durante un periodo específico.",
  },
  {
    title: "Temperatura máxima",
    image: ola_de_calor,
    text: "Esta variable muestra la temperatura más alta registrada durante un periodo específico.",
  },
  {
    title: "Precipitación",
    image: lluvia,
    text: "Esta variable mide la cantidad de lluvia recibida durante un periodo específico.",
  },
  {
    title: "Dirección del viento",
    image: norte,
    text: "Esta variable representa la dirección de la que proviene el viento.",
  },
  {
    title: "Velocidad del viento",
    image: velocimetro,
    text: "Esta variable mide la velocidad del viento.",
  },
  {
    title: "Presión del aire",
    image: barometro,
    text: "Esta variable indica la presión atmosférica registrada durante un periodo específico.",
  },
];

function ClimateForm() {
  const [formData, setFormData] = useState({
    tavg: 0,
    tmin: 0,
    tmax: 0,
    prcp: 0,
    wdir: 0,
    wspd: 0,
    pres: 0,
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar si todos los campos están llenos
    for (const key in formData) {
      if (formData[key] === 0 || formData[key] === "") {
        Swal.fire({
          icon: "error",
          title: "Campo vacío",
          text: `Por favor, llene el campo ${key} para hacer la predicción.`,
        });
        return;
      }
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://dengue-report-ia.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      setResult(data.prediction); // Cambié 'data.response' a 'data.prediction'
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Se produjo un error al procesar su solicitud. Por favor, intente de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <div className="container mx-auto px-6 center">
          <h3 className="text-blue-700 text-3xl font-bold">
            Variables
          </h3>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-7 ${
              elementos.length % 2 !== 0 ? "sm:col-span-2 lg:col-span-2" : ""
            }`}
          >
            {elementos.map((elemento, index) => (
              <CustomCard
                key={index}
                title={elemento.title}
                image={elemento.image}
                text={elemento.text}
              />
            ))}
          </div>
        </div>
      </header>

      <h3 className="text-blue-700 text-3xl font-bold text-center">
        Reporte de riesgo de dengue basado en el clima
      </h3>

      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow border-2 border-blue-500 border-dashed rounded-lg cursor-pointer bg-blue-900 hover:bg-blue-800 focus:bg-blue-900 transition duration-300 my-6">
        <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <label
              htmlFor="tavg"
              className="block text-lg font-medium text-gray-50 capitalize"
            >
              Temperatura promedio
            </label>
            <input
              type="number"
              name="tavg"
              id="tavg"
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Ingrese la temperatura promedio"
            />
            <label
              htmlFor="tmin"
              className="block text-lg font-medium text-gray-50 capitalize"
            >
              Temperatura mínima
            </label>
            <input
              type="number"
              name="tmin"
              id="tmin"
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Ingrese la temperatura mínima"
            />

            <label
              htmlFor="tmax"
              className="block text-lg font-medium text-gray-50 capitalize"
            >
              Temperatura máxima
            </label>
            <input
              type="number"
              name="tmax"
              id="tmax"
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Ingrese la temperatura máxima"
            />

            <label
              htmlFor="prcp"
              className="block text-lg font-medium text-gray-50 capitalize"
            >
              Precipitación
            </label>
            <input
              type="number"
              name="prcp"
              id="prcp"
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Ingrese la precipitación"
            />

            <label
              htmlFor="wdir"
              className="block text-lg font-medium text-gray-50 capitalize"
            >
              Dirección del viento
            </label>
            <input
              type="number"
              name="wdir"
              id="wdir"
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Ingrese la dirección del viento"
            />

            <label
              htmlFor="wspd"
              className="block text-lg font-medium text-gray-50 capitalize"
            >
              Velocidad del viento
            </label>
            <input
              type="number"
              name="wspd"
              id="wspd"
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Ingrese la velocidad del viento"
            />

            <label
              htmlFor="pres"
              className="block text-lg font-medium text-gray-50 capitalize"
            >
              Presión del aire
            </label>
            <input
              type="number"
              name="pres"
              id="pres"
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Ingrese la presión del aire"
            />

            <div className="flex flex-col sm:flex-row items-center justify-center w-full mt-4 space-y-4 sm:space-y-0 sm:gap-4">
              <button
                className="w-full sm:w-auto px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 focus:bg-blue-600 transition duration-300"
                type="submit"
              >
                Predecir
              </button>
              <Link to="/" className="w-full sm:w-auto">
                <button
                  className="w-full px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 focus:bg-blue-800 transition duration-300"
                  type="button"
                >
                  Página principal
                </button>
              </Link>
            </div>
          </form>
          <div className="result-container flex-1 mt-6 sm:mt-0">
            {loading && (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin text-white text-4xl" />
                <p className="ml-2 text-white">Cargando...</p>
              </div>
            )}
            {result && <ReactMarkdown>{result}</ReactMarkdown>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClimateForm;
