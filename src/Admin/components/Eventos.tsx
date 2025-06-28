import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Calendar, MapPin } from 'lucide-react';
import { eventosData } from '../constants';

interface Evento {
    id: number;
    titulo: string;
    fecha: string;
    ubicacion: string;
    estado: string;
}

export const Eventos: React.FC = () => {
    const [eventos, setEventos] = useState<Evento[]>(eventosData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvento, setEditingEvento] = useState<Evento | null>(null);
    const [formData, setFormData] = useState({
        titulo: '',
        fecha: '',
        ubicacion: '',
        estado: 'Programado'
    });

    const filteredEventos = eventos.filter(evento =>
        evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evento.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingEvento) {
            setEventos(eventos.map(e => e.id === editingEvento.id ? { ...formData, id: e.id } : e));
        } else {
            const newEvento = { ...formData, id: Math.max(...eventos.map(e => e.id)) + 1 };
            setEventos([...eventos, newEvento]);
        }
        setIsModalOpen(false);
        setEditingEvento(null);
        setFormData({ titulo: '', fecha: '', ubicacion: '', estado: 'Programado' });
    };

    const handleEdit = (evento: Evento) => {
        setEditingEvento(evento);
        setFormData({
            titulo: evento.titulo,
            fecha: evento.fecha,
            ubicacion: evento.ubicacion,
            estado: evento.estado
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
            setEventos(eventos.filter(e => e.id !== id));
        }
    };

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case 'Programado': return 'bg-green-100 text-green-800';
            case 'En preparación': return 'bg-yellow-100 text-yellow-800';
            case 'En curso': return 'bg-green-100 text-green-800';
            case 'Cancelado': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Eventos</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
                >
                    <Plus size={20} />
                    Agregar Evento
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar eventos..."
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
                                Fecha
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ubicación
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
                        {filteredEventos.map((evento) => (
                            <tr key={evento.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {evento.titulo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar size={16} className="mr-2" />
                                        {new Date(evento.fecha).toLocaleDateString('es-ES')}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <MapPin size={16} className="mr-2" />
                                        {evento.ubicacion}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(evento.estado)}`}>
                                        {evento.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(evento)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(evento.id)}
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
                            {editingEvento ? 'Editar' : 'Agregar'} Evento
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
                                    <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                                    <input
                                        type="text"
                                        value={formData.ubicacion}
                                        onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
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
                                        <option value="Programado">Programado</option>
                                        <option value="En preparación">En preparación</option>
                                        <option value="En curso">En curso</option>
                                        <option value="Cancelado">Cancelado</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingEvento(null);
                                        setFormData({ titulo: '', fecha: '', ubicacion: '', estado: 'Programado' });
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    {editingEvento ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}; 