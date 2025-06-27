import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { usuariosData } from '../constants';

interface Usuario {
    id: number;
    nombre: string;
    email: string;
    especialidad?: string;
    area?: string;
    rol?: string;
    nivel?: string;
    estado: string;
}

interface UsuariosProps {
    tipo: 'instructores' | 'coordinadores' | 'equipoPedagogico' | 'administradores';
}

export const Usuarios: React.FC<UsuariosProps> = ({ tipo }) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosData[tipo]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<Usuario | null>(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        especialidad: '',
        area: '',
        rol: '',
        nivel: '',
        estado: 'Activo'
    });

    const getTitulo = () => {
        switch (tipo) {
            case 'instructores': return 'Instructores';
            case 'coordinadores': return 'Coordinadores';
            case 'equipoPedagogico': return 'Equipo Pedagógico';
            case 'administradores': return 'Administradores';
            default: return 'Usuarios';
        }
    };

    const getCamposEspecificos = () => {
        switch (tipo) {
            case 'instructores': return ['especialidad'];
            case 'coordinadores': return ['area'];
            case 'equipoPedagogico': return ['rol'];
            case 'administradores': return ['nivel'];
            default: return [];
        }
    };

    const filteredUsuarios = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            setUsuarios(usuarios.map(u => u.id === editingUser.id ? { ...formData, id: u.id } : u));
        } else {
            const newUser = { ...formData, id: Math.max(...usuarios.map(u => u.id)) + 1 };
            setUsuarios([...usuarios, newUser]);
        }
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ nombre: '', email: '', especialidad: '', area: '', rol: '', nivel: '', estado: 'Activo' });
    };

    const handleEdit = (usuario: Usuario) => {
        setEditingUser(usuario);
        setFormData({
            nombre: usuario.nombre,
            email: usuario.email,
            especialidad: usuario.especialidad || '',
            area: usuario.area || '',
            rol: usuario.rol || '',
            nivel: usuario.nivel || '',
            estado: usuario.estado
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            setUsuarios(usuarios.filter(u => u.id !== id));
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{getTitulo()}</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Agregar {getTitulo().slice(0, -1)}
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar usuarios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            {getCamposEspecificos().map(campo => (
                                <th key={campo} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {campo.charAt(0).toUpperCase() + campo.slice(1)}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsuarios.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {usuario.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {usuario.email}
                                </td>
                                {getCamposEspecificos().map(campo => (
                                    <td key={campo} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {usuario[campo as keyof Usuario] || '-'}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        usuario.estado === 'Activo' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {usuario.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(usuario)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(usuario.id)}
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
                            {editingUser ? 'Editar' : 'Agregar'} {getTitulo().slice(0, -1)}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                {getCamposEspecificos().map(campo => (
                                    <div key={campo}>
                                        <label className="block text-sm font-medium text-gray-700">
                                            {campo.charAt(0).toUpperCase() + campo.slice(1)}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData[campo as keyof typeof formData]}
                                            onChange={(e) => setFormData({...formData, [campo]: e.target.value})}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                                    <select
                                        value={formData.estado}
                                        onChange={(e) => setFormData({...formData, estado: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingUser(null);
                                        setFormData({ nombre: '', email: '', especialidad: '', area: '', rol: '', nivel: '', estado: 'Activo' });
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {editingUser ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}; 