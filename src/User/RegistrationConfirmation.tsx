import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RegistrationConfirmationProps {
  redirectTimeout?: number;
}

const RegistrationConfirmation: React.FC<RegistrationConfirmationProps> = ({ redirectTimeout = 3000 }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Iniciar la animación de progreso
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, redirectTimeout / 100);

    // Redirigir después del tiempo especificado
    const timeout = setTimeout(() => {
      navigate('/login');
    }, redirectTimeout);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, redirectTimeout]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 animate-fade-in">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-green-700 mb-2">¡Solicitud enviada!</h3>
      <p className="text-center text-green-600 mb-6">
        Su solicitud de registro fue enviada correctamente.<br/>
        Por favor espere confirmación.
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-green-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500">Redirigiendo al inicio de sesión...</p>
    </div>
  );
};

export default RegistrationConfirmation;