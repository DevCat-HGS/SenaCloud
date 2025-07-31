import { useState } from "react";
import { Footer } from "../../../layouts/footer";
import { FileSpreadsheet, Download, Filter, RefreshCw, Calendar, Users, GraduationCap, Activity } from "lucide-react";

const ReportesExcelPage = () => {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Función para simular la generación de reportes
    const handleGenerateReport = (reportType: string) => {
        setSelectedReport(reportType);
        setIsGenerating(true);
        
        // Simulación de tiempo de generación
        setTimeout(() => {
            setIsGenerating(false);
            // En una implementación real, aquí se descargaría el archivo
        }, 2000);
    };

    // Lista de reportes disponibles
    const availableReports = [
        {
            id: "estudiantes",
            name: "Reporte de Estudiantes",
            description: "Lista completa de estudiantes con información de contacto y programas",
            icon: Users,
            lastGenerated: "15/05/2024"
        },
        {
            id: "instructores",
            name: "Reporte de Instructores",
            description: "Información detallada de instructores, especialidades y cursos asignados",
            icon: GraduationCap,
            lastGenerated: "10/05/2024"
        },
        {
            id: "actividades",
            name: "Reporte de Actividades",
            description: "Registro de todas las actividades programadas y su estado actual",
            icon: Activity,
            lastGenerated: "12/05/2024"
        },
        {
            id: "asistencia",
            name: "Reporte de Asistencia",
            description: "Registro de asistencia de estudiantes por curso y fecha",
            icon: Calendar,
            lastGenerated: "08/05/2024"
        }
    ];

    return (
        <div className="flex flex-col gap-y-4 rounded-2xl">
            <h1 className="title">Reportes Excel</h1>
            
            <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-slate-900">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold">Generador de Reportes</h2>
                        <p className="text-gray-600 dark:text-gray-400">Selecciona y genera reportes en formato Excel</p>
                    </div>
                    
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                            <Filter size={18} />
                            <span>Filtros</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                            <RefreshCw size={18} />
                            <span>Actualizar</span>
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableReports.map((report) => (
                        <div 
                            key={report.id}
                            className={`border rounded-xl p-4 cursor-pointer transition-all ${selectedReport === report.id ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 hover:border-green-300 dark:border-slate-700 dark:hover:border-green-700'}`}
                            onClick={() => setSelectedReport(report.id)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-lg">
                                    <report.icon className="text-green-600 dark:text-green-400" size={24} />
                                </div>
                                
                                <div className="flex-1">
                                    <h3 className="font-medium text-lg">{report.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{report.description}</p>
                                    
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-xs text-gray-500 dark:text-gray-500">
                                            Última generación: {report.lastGenerated}
                                        </span>
                                        
                                        <button 
                                            className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleGenerateReport(report.id);
                                            }}
                                            disabled={isGenerating && selectedReport === report.id}
                                        >
                                            {isGenerating && selectedReport === report.id ? (
                                                <>
                                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"></div>
                                                    <span>Generando...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FileSpreadsheet size={16} />
                                                    <span>Generar</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {selectedReport && (
                    <div className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-6">
                        <h3 className="font-medium text-lg mb-4">Opciones de Exportación</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-green-300 dark:hover:border-green-700 cursor-pointer transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileSpreadsheet className="text-green-600 dark:text-green-400" size={20} />
                                        <span>Excel (.xlsx)</span>
                                    </div>
                                    <Download size={18} />
                                </div>
                            </div>
                            
                            <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-green-300 dark:hover:border-green-700 cursor-pointer transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileSpreadsheet className="text-green-600 dark:text-green-400" size={20} />
                                        <span>CSV (.csv)</span>
                                    </div>
                                    <Download size={18} />
                                </div>
                            </div>
                            
                            <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-green-300 dark:hover:border-green-700 cursor-pointer transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileSpreadsheet className="text-green-600 dark:text-green-400" size={20} />
                                        <span>Excel Online</span>
                                    </div>
                                    <Download size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <Footer />
        </div>
    );
};

export default ReportesExcelPage;