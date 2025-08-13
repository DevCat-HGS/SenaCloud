import { useEffect, useState } from 'react';
import { useAuth } from '../../../Service/API/AuthContext';

interface Activity {
  _id: string;
  titulo: string;
  descripcion: string;
  estado: string;
  fechaInicio: string;
  fechaFin: string;
  createdAt: string;
}

export default function InstructorActivitiesPage() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        // Aquí deberíamos obtener las actividades desde la API
        // Por ahora usamos datos de ejemplo
        setTimeout(() => {
          setActivities([
            {
              _id: '1',
              titulo: 'Actividad de Programación Web',
              descripcion: 'Desarrollo de una aplicación web utilizando React',
              estado: 'activa',
              fechaInicio: '2023-06-01',
              fechaFin: '2023-06-15',
              createdAt: '2023-05-25'
            },
            {
              _id: '2',
              titulo: 'Taller de Bases de Datos',
              descripcion: 'Diseño y normalización de bases de datos relacionales',
              estado: 'pendiente',
              fechaInicio: '2023-06-20',
              fechaFin: '2023-07-05',
              createdAt: '2023-05-30'
            },
            {
              _id: '3',
              titulo: 'Evaluación de Algoritmos',
              descripcion: 'Evaluación práctica sobre algoritmos de ordenamiento y búsqueda',
              estado: 'completada',
              fechaInicio: '2023-05-10',
              fechaFin: '2023-05-20',
              createdAt: '2023-05-01'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('No se pudieron cargar las actividades. Por favor, intente nuevamente.');
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'activa':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Activa
          </span>
        );
      case 'pendiente':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pendiente
          </span>
        );
      case 'completada':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Completada
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Actividades</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : activities.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No hay actividades disponibles en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {activities.map((activity) => (
            <div key={activity._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{activity.titulo}</h2>
                    <p className="text-gray-600 mb-4">{activity.descripcion}</p>
                  </div>
                  <div>
                    {getStatusBadge(activity.estado)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Fecha de inicio</p>
                    <p className="font-medium">{formatDate(activity.fechaInicio)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fecha de finalización</p>
                    <p className="font-medium">{formatDate(activity.fechaFin)}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => alert(`Ver detalles de actividad ${activity._id}`)}
                  >
                    Ver detalles
                  </button>
                  {activity.estado === 'activa' && (
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      onClick={() => alert(`Participar en actividad ${activity._id}`)}
                    >
                      Participar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}