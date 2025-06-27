import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Admin/assets/logo-light.svg';

export default function AntiMovil() {
  const navigate = useNavigate();

  useEffect(() => {
    // Detectar si es un dispositivo móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Si no es móvil, redirigir a la página principal
    if (!isMobile) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <img src={Logo} alt="SenaCloud" className="h-24 w-auto mb-8" />
      
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Lo sentimos!
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          SenaCloud no es compatible con dispositivos móviles en este momento.
        </p>
        <p className="text-gray-500">
          Por favor, accede desde un computador para disfrutar de todas las funcionalidades.
        </p>
      </div>

      <div className="mt-12 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-700">
          Estamos trabajando para hacer SenaCloud accesible desde dispositivos móviles en futuras actualizaciones.
        </p>
      </div>
    </div>
  );
}