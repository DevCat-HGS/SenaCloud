import { useEffect, useState } from 'react';
import { useAuth } from '../../../Service/API/AuthContext';
import { guideService, Guide as ServiceGuide } from '../../../Service/API/guideService';

// Interfaz local para las guías, adaptada a la estructura que espera el componente
interface Guide {
  _id: string;
  titulo: string;
  descripcion: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
}

// Función para mapear las guías del servicio al formato local
const mapServiceGuideToLocalGuide = (serviceGuide: ServiceGuide): Guide => {
  return {
    _id: serviceGuide.id,
    titulo: serviceGuide.title,
    descripcion: serviceGuide.content,
    estado: serviceGuide.status,
    createdAt: serviceGuide.createdAt,
    updatedAt: serviceGuide.updatedAt
  };
};

export default function InstructorGuidesPage() {
  const { user } = useAuth();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        // Aquí deberíamos obtener solo las guías del instructor actual
        // Por ahora obtenemos todas las guías como ejemplo
        const response = await guideService.getAllGuides();
        // Mapear las guías del servicio al formato local
        const mappedGuides = response.map(mapServiceGuideToLocalGuide);
        setGuides(mappedGuides);
        setError(null);
      } catch (err) {
        console.error('Error fetching guides:', err);
        setError('No se pudieron cargar las guías. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aprobado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Aprobado
          </span>
        );
      case 'pendiente':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pendiente
          </span>
        );
      case 'rechazado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rechazado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mis Guías</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          onClick={() => alert('Funcionalidad para crear nueva guía')}
        >
          Nueva Guía
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : guides.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">No tienes guías creadas aún.</p>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            onClick={() => alert('Funcionalidad para crear nueva guía')}
          >
            Crear mi primera guía
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Creación
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guides.map((guide) => (
                <tr key={guide._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{guide.titulo}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{guide.descripcion}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(guide.estado)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(guide.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      onClick={() => alert(`Ver guía ${guide._id}`)}
                    >
                      Ver
                    </button>
                    <button
                      className="text-green-600 hover:text-green-900 mr-3"
                      onClick={() => alert(`Editar guía ${guide._id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => alert(`Eliminar guía ${guide._id}`)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}