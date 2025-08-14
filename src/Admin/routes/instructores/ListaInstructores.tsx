import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { useSocket } from '../../../Service/API/SocketContext';
import InstructorStatusUpdater from '../../../Admin/components/InstructorStatusUpdater';
import { Socket } from 'socket.io-client';

interface Instructor {
  id: string;
  nombre: string;
  correoInstitucional: string;
  correoPersonal: string;
  documento: string;
  tipoDocumento: string;
  etiquetas: string[];
  estadoInstructor: 'pendiente' | 'aprobado';
}

const ListaInstructores: React.FC = () => {
  const [instructores, setInstructores] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'pendiente' | 'aprobado'>('todos');
  const navigate = useNavigate();
  const { connectToNamespace, isConnected } = useSocket();
  const instructorSocketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Conectar al namespace de instructores cuando el componente se monta
    if (isConnected) {
      instructorSocketRef.current = connectToNamespace('/instructors');
      
      // Configurar eventos una vez conectado
      instructorSocketRef.current.on('connect', () => {
        console.log('Conectado al namespace de instructores');
        // Cargar instructores al conectar
        fetchInstructores();
      });

      // Manejar errores de conexión
      instructorSocketRef.current.on('connect_error', (error) => {
        console.error('Error al conectar con el namespace de instructores:', error);
        setError('Error de conexión con el servidor');
        setLoading(false);
      });

      // Limpiar al desmontar
      return () => {
        if (instructorSocketRef.current) {
          instructorSocketRef.current.disconnect();
          instructorSocketRef.current = null;
        }
      };
    } else {
      // Si no hay conexión general, intentar cargar por HTTP
      fetchInstructores();
    }
  }, [isConnected]);
  
  // Efecto para manejar eventos de actualización de instructores
  useEffect(() => {
    if (instructorSocketRef.current) {
      // Evento cuando se actualiza el estado de un instructor
      const handleInstructorStatusUpdated = (data: any) => {
        console.log('Estado de instructor actualizado:', data);
        setInstructores(prev => 
          prev.map(instructor => 
            instructor.id === data.instructorId 
              ? { ...instructor, estadoInstructor: data.status }
              : instructor
          )
        );
      };
      
      // Registrar listeners
      instructorSocketRef.current.on('instructor-status-updated', handleInstructorStatusUpdated);
      
      // Limpiar al desmontar
      return () => {
        instructorSocketRef.current?.off('instructor-status-updated', handleInstructorStatusUpdated);
      };
    }
  }, [instructorSocketRef.current]);

  // Función para cargar instructores desde la API
  const fetchInstructores = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Solicitar la lista de instructores a través de Socket.IO
      if (isConnected && instructorSocketRef.current) {
        // Configurar listeners una sola vez
        const handleInstructorsList = (instructorsList: any[]) => {
          console.log('Instructores recibidos:', instructorsList);
          const mappedInstructors = instructorsList.map(mapUserToInstructor);
          setInstructores(mappedInstructors);
          setLoading(false);
          // Desuscribirse después de recibir la respuesta
          instructorSocketRef.current?.off('instructors-list', handleInstructorsList);
        };
        
        const handleError = (errorData: any) => {
          console.error('Error del socket:', errorData);
          setError(errorData.message || 'Error al cargar instructores');
          setLoading(false);
          // Desuscribirse después de recibir el error
          instructorSocketRef.current?.off('error', handleError);
        };
        
        // Registrar listeners
        instructorSocketRef.current.on('instructors-list', handleInstructorsList);
        instructorSocketRef.current.on('error', handleError);
        
        // Establecer un timeout por si no hay respuesta
        const timeout = setTimeout(() => {
          if (loading) {
            console.warn('Timeout al esperar instructores, usando fetch como fallback');
            fetchInstructoresHttp();
            instructorSocketRef.current?.off('instructors-list', handleInstructorsList);
            instructorSocketRef.current?.off('error', handleError);
          }
        }, 5000); // 5 segundos de timeout
        
        // Emitir evento para solicitar instructores
        instructorSocketRef.current.emit('get-instructors');
        
        return () => clearTimeout(timeout);
      } else {
        // Alternativa: usar fetch si Socket.IO no está disponible
        await fetchInstructoresHttp();
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar instructores');
      setLoading(false);
    }
  };
  
  // Función para cargar instructores usando HTTP como fallback
  const fetchInstructoresHttp = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users?rol=Instructor');
      if (!response.ok) {
        throw new Error('Error al cargar instructores');
      }
      const data = await response.json();
      console.log('Instructores recibidos por HTTP:', data);
      const mappedInstructors = data.map(mapUserToInstructor);
      setInstructores(mappedInstructors);
      setLoading(false);
    } catch (err) {
      console.error('Error HTTP:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar instructores');
      setLoading(false);
    }
  };

  // Función para mapear un usuario de la API al formato local
  const mapUserToInstructor = (user: any): Instructor => ({
    id: user._id,
    nombre: user.nombre,
    correoInstitucional: user.correoInstitucional,
    correoPersonal: user.correoPersonal,
    documento: user.documento,
    tipoDocumento: user.tipoDocumento,
    etiquetas: user.etiquetas || [],
    estadoInstructor: user.estadoInstructor || 'pendiente'
  });

  // Función para eliminar un instructor
  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este instructor?')) {
      try {
        // Intentar usar Socket.IO primero
        if (instructorSocketRef.current?.connected) {
          // Crear promesa para manejar la respuesta del socket
          const deletePromise = new Promise<void>((resolve, reject) => {
            // Manejar respuesta exitosa
            const handleSuccess = () => {
              console.log('Instructor eliminado correctamente via socket');
              // Actualizar estado local inmediatamente para mejor UX
              setInstructores(instructores.filter(instructor => instructor.id !== id));
              resolve();
              // Eliminar listeners
              instructorSocketRef.current?.off('instructor-deleted', handleSuccess);
              instructorSocketRef.current?.off('error', handleError);
            };
            
            // Manejar error
            const handleError = (errorData: any) => {
              console.error('Error del socket al eliminar:', errorData);
              reject(new Error(errorData.message || 'Error al eliminar el instructor'));
              // Eliminar listeners
              instructorSocketRef.current?.off('instructor-deleted', handleSuccess);
              instructorSocketRef.current?.off('error', handleError);
            };
            
            // Registrar listeners
            instructorSocketRef.current?.on('instructor-deleted', handleSuccess);
            instructorSocketRef.current?.on('error', handleError);
            
            // Emitir evento para eliminar instructor
            instructorSocketRef.current?.emit('delete-instructor', { id });
          });
          
          // Establecer un timeout por si no hay respuesta
          const timeoutPromise = new Promise<void>((_, reject) => {
            setTimeout(() => {
              reject(new Error('Timeout al eliminar instructor via socket'));
            }, 5000); // 5 segundos de timeout
          });
          
          // Esperar a que se complete la eliminación o se agote el tiempo
          await Promise.race([deletePromise, timeoutPromise])
            .catch(async (error) => {
              console.warn(error.message, ', usando HTTP como fallback');
              await deleteInstructorHttp(id);
            });
        } else {
          // Usar HTTP como fallback si Socket.IO no está disponible
          await deleteInstructorHttp(id);
        }
      } catch (err) {
        console.error('Error al eliminar instructor:', err);
        setError(err instanceof Error ? err.message : 'Error al eliminar el instructor');
      }
    }
  };
  
  // Función para eliminar un instructor usando HTTP como fallback
  const deleteInstructorHttp = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el instructor');
      }

      // Actualizar estado local inmediatamente para mejor UX
      setInstructores(instructores.filter(instructor => instructor.id !== id));
      
      // Mostrar mensaje de éxito
      console.log('Instructor eliminado correctamente via HTTP');
    } catch (err) {
      console.error('Error HTTP al eliminar instructor:', err);
      throw err; // Propagar el error para manejarlo en handleDelete
    }
  };

  // Filtrar instructores según término de búsqueda y filtro de estado
  const filteredInstructores = instructores.filter(instructor => {
    const matchesSearch = 
      instructor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.correoInstitucional.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.documento.includes(searchTerm);
    
    const matchesFilter = 
      filtroEstado === 'todos' || 
      instructor.estadoInstructor === filtroEstado;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Instructores</h1>
        <Link
          to="/Admin/usuarios/instructores/crear"
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={20} />
          Agregar Instructor
        </Link>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value as 'todos' | 'pendiente' | 'aprobado')}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Pendientes</option>
            <option value="aprobado">Aprobados</option>
          </select>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        /* Tabla de instructores */
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredInstructores.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              {searchTerm || filtroEstado !== 'todos' 
                ? 'No se encontraron instructores con los filtros aplicados' 
                : 'No hay instructores registrados'}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo Institucional
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInstructores.map((instructor) => (
                  <tr key={instructor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {instructor.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {instructor.correoInstitucional}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {instructor.tipoDocumento} {instructor.documento}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <InstructorStatusUpdater 
                        instructorId={instructor.id} 
                        initialStatus={instructor.estadoInstructor}
                        onStatusChange={(newStatus) => {
                          // Actualizar el estado localmente
                          setInstructores(prev => 
                            prev.map(i => 
                              i.id === instructor.id 
                                ? { ...i, estadoInstructor: newStatus }
                                : i
                            )
                          );
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => navigate(`/Admin/usuarios/instructores/${instructor.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver detalles"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => navigate(`/Admin/usuarios/instructores/${instructor.id}/editar`)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(instructor.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ListaInstructores;