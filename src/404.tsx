import React from 'react';
import { Link } from 'react-router-dom';


const NotFound: React.FC = () => {
  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-200 px-4 relative">
      {/* Logo Sena en la esquina superior izquierda */}
      <Link
        to="/"
        className="fixed top-4 left-4 z-50"
        aria-label="Ir al inicio"
      >
        <img
          src="https://api-img-hgs.netlify.app/img/senacloud-logo.svg"
          alt="SenaCloud Logo"
          className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg hover:scale-110 transition-transform"
        />
      </Link>
      {/* Logo principal animado centrado */}
      <img
        src="https://api-img-hgs.netlify.app/img/senacloud-logo.svg"
        alt="SenaCloud Logo"
        className="w-24 h-24 mb-6 animate-bounce"
      />
      <h1 className="text-9xl font-extrabold text-transparent drop-shadow-lg z-20 custom-outline">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">¡Página no encontrada!</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Lo sentimos, la ruta que buscas no existe o ha sido movida. Por favor, verifica la URL o regresa al inicio para continuar explorando SenaCloud.
      </p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound; 