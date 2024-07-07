import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

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
    setLoading(true);
    try {
      const response = await fetch("https://dengue-report-ia.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setResult(data.prediction); // Cambié 'data.response' a 'data.prediction'
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <div className="container mx-auto px-6 center py-6">
          <h3 className="text-white text-3xl font-bold">
            Detecta el dengue con datos climáticos
          </h3>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow border-2 border-blue-500 border-dashed rounded-lg cursor-pointer bg-blue-900 hover:bg-blue-800 focus:bg-blue-900 transition duration-300">
        <div className="flex space-x-6">
          <form onSubmit={handleSubmit} className="space-y-4 flex-1">
            {/* Formulario */}
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
            {/* Agrega los otros inputs aquí de manera similar */}
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
              Direccion del viento
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

            <div className="flex items-center justify-center w-full mt-4 gap-4">
              <button
                className="px-4 py-2 bg-blue-700 text-white rounded"
                type="submit"
              >
                Predecir
              </button>
              <Link to="/">
                <button className="px-4 py-2 bg-blue-900 text-white rounded" type="button">
                  Página principal
                </button>
              </Link>
            </div>
          </form>
          <div className="result-container flex-1">
            {loading && <p>Cargando...</p>}
            {result && <ReactMarkdown>{result}</ReactMarkdown>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClimateForm;
