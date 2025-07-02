import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="button" data-text="Awesome">
        <span className="actual-text">&nbsp;Senacloud&nbsp;</span>
        <span aria-hidden="true" className="hover-text">&nbsp;Senacloud&nbsp;</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }
  .button {
    --border-right: 6px;
    --text-stroke-color: rgba(37, 36, 36, 0.6);
    --animation-color: #37FF8B;
    --fs-size: 1.2em;
    letter-spacing: 3px;
    text-decoration: none;
    font-size: var(--fs-size);
    font-family: "Arial";
    position: relative;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px var(--text-stroke-color);
  }
  .hover-text {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    width: 0%;
    inset: 0;
    border-right: var(--border-right) solid var(--animation-color);
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);
  }
  .button:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px var(--animation-color))
  }
`;

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-200 px-4 relative">
      {/* Logo Sena en la esquina superior izquierda */}
      <div className="fixed top-4 left-4 z-50 flex items-center space-x-2">
        <Link
          to="/"
          aria-label="Ir al inicio"
        >
          <img
            src="https://api-img-hgs.netlify.app/img/senacloud-logo.svg"
            alt="SenaCloud Logo"
            className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg hover:scale-110 transition-transform"
          />
        </Link>
        <Button />
      </div>

      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 drop-shadow-lg z-20 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">¡Página no encontrada!</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Lo sentimos, la ruta que buscas no existe o ha sido movida. Por favor, verifica la URL o regresa al inicio para continuar explorando SenaCloud.
      </p>
      <Link
        to="/"
        className="relative group bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 overflow-hidden"
        style={{ perspective: '600px' }}
      >
        <span className="absolute inset-0 rounded-full group-hover:scale-110 group-hover:opacity-20 bg-green-700 transition-all duration-500 z-0" />
        <span className="relative z-10 block group-active:scale-x-[-1] transition-transform duration-500">
          Volver al inicio
        </span>
      </Link>
    </div>
  );
};

export default NotFound; 