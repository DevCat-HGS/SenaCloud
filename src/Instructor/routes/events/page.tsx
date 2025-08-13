import { useEffect, useState } from 'react';
import { useAuth } from '../../../Service/API/AuthContext';

interface Event {
  _id: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha: string;
  hora: string;
  estado: string;
  createdAt: string;
}

export default function InstructorEventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Aquí deberíamos obtener los eventos desde la API
        // Por ahora usamos datos de ejemplo
        setTimeout(() => {
          setEvents([
            {
              _id: '1',
              titulo: 'Seminario de Tecnologías Emergentes',
              descripcion: 'Presentación de las últimas tendencias en desarrollo web y móvil',
              ubicacion: 'Auditorio Principal',
              fecha: '2023-07-15',
              hora: '10:00',
              estado: 'programado',
              createdAt: '2023-06-01'
            },
            {
              _id: '2',
              titulo: 'Taller de Inteligencia Artificial',
              descripcion: 'Introducción práctica a modelos de machine learning y deep learning',
              ubicacion: 'Laboratorio de Informática',
              fecha: '2023-07-20',
              hora: '14:00',
              estado: 'programado',
              createdAt: '2023-06-05'
            },
            {
              _id: '3',
              titulo: 'Hackathon SENA 2023',
              descripcion: 'Competencia de desarrollo de soluciones tecnológicas para problemas reales',
              ubicacion: 'Centro de Innovación',
              fecha: '2023-08-05',
              hora: '08:00',
              estado: 'inscripcion',
              createdAt: '2023-06-10'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('No se pudieron cargar los eventos. Por favor, intente nuevamente.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'programado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Programado
          </span>
        );
      case 'inscripcion':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Inscripción Abierta
          </span>
        );
      case 'completado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Completado
          </span>
        );
      case 'cancelado':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Cancelado
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Eventos</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No hay eventos disponibles en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{event.titulo}</h2>
                  {getStatusBadge(event.estado)}
                </div>
                
                <p className="text-gray-600 mb-4">{event.descripcion}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.ubicacion}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(event.fecha)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.hora} hrs</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  {event.estado === 'inscripcion' ? (
                    <button
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      onClick={() => alert(`Inscribirse al evento ${event._id}`)}
                    >
                      Inscribirse
                    </button>
                  ) : (
                    <button
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => alert(`Ver detalles del evento ${event._id}`)}
                    >
                      Ver detalles
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