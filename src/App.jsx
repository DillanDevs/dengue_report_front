import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import ClimateForm from "./components/ClimateForm";

function App() {
  return (
    <>
      <header class="py-8 px-4 mx-auto max-w-l lg:py-16 lg:px-8 justify-center">
        <h1 class="text-4xl font-bold leading-tight text-center text-blue-700 lg:text-5xl">
          Detección de dengue con IA
          <br />
          <span class="text-blue-500">por JEDS-Team</span>
        </h1>
        <p class="mt-10 text-lg text-center text-gray-600">
          Una poderosa herramienta de IA que puede predecir la presencia de
          dengue dependiendo de las características climáticas.
        </p>
      </header>
      <Router>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/predict-dengue-climate" element={<ClimateForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
