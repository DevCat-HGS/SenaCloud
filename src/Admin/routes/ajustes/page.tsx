import { useState } from "react";
import { Footer } from "../../layouts/footer";
import { Bell, Moon, Sun, Globe, Lock, User, Shield, Database, Save } from "lucide-react";

const AjustesPage = () => {
    // Estados para los diferentes ajustes
    const [darkMode, setDarkMode] = useState(false);
    const [notificaciones, setNotificaciones] = useState(true);
    const [idioma, setIdioma] = useState("es");
    const [cambioGuardado, setCambioGuardado] = useState(false);

    // Función para guardar cambios
    const handleSaveChanges = () => {
        setCambioGuardado(true);
        
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            setCambioGuardado(false);
        }, 3000);
    };

    return (
        <div className="flex flex-col gap-y-4 rounded-2xl">
            <h1 className="title">Ajustes</h1>
            
            {cambioGuardado && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
                    <span>Los cambios han sido guardados correctamente.</span>
                    <button 
                        onClick={() => setCambioGuardado(false)}
                        className="text-green-700 hover:text-green-900"
                    >
                        ×
                    </button>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Panel de Ajustes de Apariencia */}
                <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-slate-900 md:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-lg">
                            <Moon className="text-purple-600 dark:text-purple-400" size={20} />
                        </div>
                        <h2 className="text-xl font-semibold">Apariencia</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Modo Oscuro</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Cambia entre modo claro y oscuro</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Notificaciones</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Activar o desactivar notificaciones</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={notificaciones}
                                    onChange={() => setNotificaciones(!notificaciones)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>
                        </div>
                        
                        <div>
                            <h3 className="font-medium mb-2">Idioma</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Selecciona el idioma de la plataforma</p>
                            <select 
                                className="w-full p-2 border border-gray-300 rounded-lg dark:border-slate-700 dark:bg-slate-800"
                                value={idioma}
                                onChange={(e) => setIdioma(e.target.value)}
                            >
                                <option value="es">Español</option>
                                <option value="en">English</option>
                                <option value="pt">Português</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Panel de Navegación Rápida */}
                <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-slate-900">
                    <h2 className="text-xl font-semibold mb-4">Accesos Rápidos</h2>
                    
                    <div className="space-y-3">
                        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                            <User size={18} className="text-blue-500" />
                            <span>Perfil de Usuario</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                            <Lock size={18} className="text-red-500" />
                            <span>Seguridad</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                            <Bell size={18} className="text-yellow-500" />
                            <span>Notificaciones</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                            <Globe size={18} className="text-green-500" />
                            <span>Idioma</span>
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Panel de Configuración Avanzada */}
            <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-slate-900">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg">
                        <Shield className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <h2 className="text-xl font-semibold">Configuración Avanzada</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium mb-2">Seguridad</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Autenticación de dos factores</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Sesiones activas</span>
                                <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                    Ver sesiones
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-medium mb-2">Base de Datos</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Sincronización automática</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Respaldo de datos</span>
                                <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                    Configurar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700 flex justify-end">
                    <button 
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                        onClick={handleSaveChanges}
                    >
                        <Save size={18} />
                        <span>Guardar Cambios</span>
                    </button>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default AjustesPage;