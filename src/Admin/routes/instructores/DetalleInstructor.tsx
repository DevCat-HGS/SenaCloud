import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Tag } from 'lucide-react';
import InstructorStatusUpdater from '../../../Admin/components/InstructorStatusUpdater';

interface Instructor {
  id: string;
  nombre: string;
  correoInstitucional: string;
  correoPersonal: string;
  documento: string;
  tipoDocumento: string;
  etiquetas: string[];
  estadoInstructor: 'pendiente' | 'aprobado';
  createdAt?: string;
  updatedAt?: string;
}

const DetalleInstructor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:3001/api/users/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos del instructor');
        }

        const data = await response.json();
        if (data.rol !== 'Instructor') {
          throw new Error('El usuario no es un instructor');
        }

        setInstructor({
          id: data._id,
          nombre: data.nombre,
          correoInstitucional: data.correoInstitucional,
          correoPersonal: data.correoPersonal,
          documento: data.documento,
          tipoDocumento: data.tipoDocumento,
          etiquetas: data.etiquetas || [],
          estadoInstructor: data.estadoInstructor || 'pendiente',
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        });
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar los datos del instructor');
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [id]);

  const handleDelete = async () => {
    if (!instructor) return;

    if (window.confirm(`¿Estás seguro de que quieres eliminar al instructor ${instructor.nombre}?`)) {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${instructor.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el instructor');
        }

        navigate('/Admin/usuarios/instructores');
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Error al eliminar el instructor');
      }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
        <button
          onClick={() => navigate('/Admin/usuarios/instructores')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" /> Volver a la lista de instructores
        </button>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>No se encontró el instructor</p>
        </div>
        <button
          onClick={() => navigate('/Admin/usuarios/instructores')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" /> Volver a la lista de instructores
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/Admin/usuarios/instructores')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" /> Volver a la lista
        </button>
        <div className="flex space-x-2">
          <Link
            to={`/Admin/usuarios/instructores/${instructor.id}/editar`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
          >
            <Edit size={16} /> Editar
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
          >
            <Trash2 size={16} /> Eliminar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{instructor.nombre}</h1>
              <p className="text-gray-600 mb-4">{instructor.tipoDocumento} {instructor.documento}</p>
            </div>
            <div>
              <InstructorStatusUpdater 
                instructorId={instructor.id} 
                initialStatus={instructor.estadoInstructor}
                onStatusChange={(newStatus) => {
                  setInstructor(prev => prev ? { ...prev, estadoInstructor: newStatus } : null);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Información de contacto</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Correo institucional</p>
                  <p className="text-gray-800">{instructor.correoInstitucional}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Correo personal</p>
                  <p className="text-gray-800">{instructor.correoPersonal}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Etiquetas</h2>
              {instructor.etiquetas.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {instructor.etiquetas.map((etiqueta, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      <Tag size={14} className="mr-1" />
                      {etiqueta}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay etiquetas asignadas</p>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Información adicional</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Fecha de registro</p>
                <p className="text-gray-800">{formatDate(instructor.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Última actualización</p>
                <p className="text-gray-800">{formatDate(instructor.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleInstructor;