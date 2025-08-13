import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Service/API/AuthContext';
import { useState, useEffect } from 'react';

export default function AccessDenied() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(3);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-red-200">
        <div>
          <img
            className="mx-auto h-20 w-auto"
            src="https://api-img-hgs.netlify.app/img/senacloud-logo.svg"
            alt="SenaCloud"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-red-700">
            Acceso Denegado
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No tienes permisos para acceder a esta página.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          {user && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">
                Has iniciado sesión como <span className="font-semibold">{user.nombre}</span> con el rol de <span className="font-semibold">{user.rol}</span>.
              </p>
            </div>
          )}
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Volver al inicio
            </Link>
            <button
              onClick={() => {
                logout();
                setRedirecting(true);
                
                // Iniciar cuenta regresiva
                let timer = 3;
                setCountdown(timer);
                
                const interval = setInterval(() => {
                  timer -= 1;
                  setCountdown(timer);
                  
                  if (timer <= 0) {
                    clearInterval(interval);
                    navigate('/');
                  }
                }, 1000);
              }}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cerrar sesión
            </button>
            {redirecting && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md text-center">
                <p>Sesión cerrada. Redirigiendo al inicio en {countdown} segundos...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}