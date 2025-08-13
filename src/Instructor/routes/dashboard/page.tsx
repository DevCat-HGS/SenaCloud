import { useEffect, useState } from 'react';
import { useAuth } from '../../../Service/API/AuthContext';

export default function InstructorDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    guias: 0,
    actividades: 0,
    eventos: 0
  });

  useEffect(() => {
    // Aquí se podrían cargar estadísticas reales desde la API
    // Por ahora usamos datos de ejemplo
    setStats({
      guias: 12,
      actividades: 8,
      eventos: 3
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bienvenido, {user?.nombre}</h1>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Guías</p>
              <p className="text-2xl font-bold text-gray-800">{stats.guias}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Actividades</p>
              <p className="text-2xl font-bold text-gray-800">{stats.actividades}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Eventos</p>
              <p className="text-2xl font-bold text-gray-800">{stats.eventos}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Información del perfil */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Información del Perfil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Nombre</p>
            <p className="text-gray-800">{user?.nombre}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Correo Institucional</p>
            <p className="text-gray-800">{user?.correoInstitucional}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Correo Personal</p>
            <p className="text-gray-800">{user?.correoPersonal}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Estado</p>
            <p className="text-gray-800">
              {user?.estadoInstructor === 'aprobado' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Aprobado
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pendiente
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      
      {/* Etiquetas */}
      {user?.etiquetas && user.etiquetas.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Mis Etiquetas</h2>
          <div className="flex flex-wrap gap-2">
            {user.etiquetas.map((etiqueta: string, index: number) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {etiqueta}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}