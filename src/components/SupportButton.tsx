import { useState } from 'react';

const SupportButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactClick = () => {
    window.location.href = `mailto:devsoportectpga@gmail.com?subject=Soporte SenaCloud&body=Hola, necesito ayuda con SenaCloud.`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="w-14 h-14 rounded-full border-2 border-green-500 bg-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
        aria-label="Abrir asistente de soporte"
      >
        <img
          src="https://api-img-hgs.netlify.app/img/soporte.png"
          alt="Soporte"
          className="w-8 h-8"
        />
      </button>

      {isModalOpen && (
        <div className="absolute bottom-20 right-0 w-72 bg-white rounded-lg shadow-xl border border-green-100 p-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">SenaCloud</h3>
            <p className="text-gray-600 text-sm mb-4">Tu asesor de soporte, tienes algun problema con nuestra plataforma</p>
            <button
              onClick={handleContactClick}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-full font-medium hover:bg-green-600 transition-colors duration-200"
            >
              Contáctanos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportButton;