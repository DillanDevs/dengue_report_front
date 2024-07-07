import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="gap-4 flex flex-col items-center">
        <Link to="/predict-dengue-climate">
          <button className="px-6 py-3 bg-blue-700 text-white rounded hover:bg-blue-600 transition duration-300">
            Detectar Dengue
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
