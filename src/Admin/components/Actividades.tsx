import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Calendar, User } from 'lucide-react';
import { actividadesData } from '../constants';

interface Actividad {
    id: number;
    titulo: string;
    instructor: string;
    fecha: string;
    estado: string;
}

export const Actividades: React.FC = () => {
    const [actividades, setActividades] = useState<Actividad[]>(actividadesData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingActividad, setEditingActividad] = useState<Actividad | null>(null);
    const [formData, setFormData] = useState({
        titulo: '',
        instructor: '',
        fecha: '',
        estado: 'Programada'
    });

    const filteredActividades = actividades.filter(actividad =>
        actividad.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        actividad.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingActividad) {
            setActividades(actividades.map(a => a.id === editingActividad.id ? { ...formData, id: a.id } : a));
        } else {
            const newActividad = { ...formData, id: Math.max(...actividades.map(a => a.id)) + 1 };
            setActividades([...actividades, newActividad]);
        }
        setIsModalOpen(false);
        setEditingActividad(null);
        setFormData({ titulo: '', instructor: '', fecha: '', estado: 'Programada' });
    };

    const handleEdit = (actividad: Actividad) => {
        setEditingActividad(actividad);
        setFormData({
            titulo: actividad.titulo,
            instructor: actividad.instructor,
            fecha: actividad.fecha,
            estado: actividad.estado
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
            setActividades(actividades.filter(a => a.id !== id));
        }
    };

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case 'Programada': return 'bg-green-100 text-green-800';
            case 'En curso': return 'bg-yellow-100 text-yellow-800';
            case 'Completada': return 'bg-green-100 text-green-800';
            case 'Cancelada': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Actividades</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
                >
                    <Plus size={20} />
                    Agregar Actividad
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar actividades..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Título
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Instructor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fecha
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
                        {filteredActividades.map((actividad) => (
                            <tr key={actividad.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {actividad.titulo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <User size={16} className="mr-2" />
                                        {actividad.instructor}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar size={16} className="mr-2" />
                                        {new Date(actividad.fecha).toLocaleDateString('es-ES')}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(actividad.estado)}`}>
                                        {actividad.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(actividad)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(actividad.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            {editingActividad ? 'Editar' : 'Agregar'} Actividad
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Título</label>
                                    <input
                                        type="text"
                                        value={formData.titulo}
                                        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Instructor</label>
                                    <input
                                        type="text"
                                        value={formData.instructor}
                                        onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                                    <input
                                        type="date"
                                        value={formData.fecha}
                                        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                                    <select
                                        value={formData.estado}
                                        onChange={(e) => setFormData({...formData, estado: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="Programada">Programada</option>
                                        <option value="En curso">En curso</option>
                                        <option value="Completada">Completada</option>
                                        <option value="Cancelada">Cancelada</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingActividad(null);
                                        setFormData({ titulo: '', instructor: '', fecha: '', estado: 'Programada' });
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    {editingActividad ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}; 