import { useEffect, useRef } from "react";
import { Footer } from "../../layouts/footer";

const AnalisisPage = () => {
    const powerBIRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Función para cargar el informe de Power BI
        const loadPowerBIReport = () => {
            if (!powerBIRef.current) return;

            // Limpiar el contenedor antes de cargar
            powerBIRef.current.innerHTML = "";

            // Crear un iframe para el informe de Power BI
            const iframe = document.createElement("iframe");
            iframe.style.width = "100%";
            iframe.style.height = "600px";
            iframe.style.border = "none";
            
            // URL del informe de Power BI (ejemplo)
            // En un entorno real, esta URL vendría de una configuración o API
            iframe.src = "https://app.powerbi.com/reportEmbed?reportId=sample&autoAuth=true";
            
            // Añadir el iframe al contenedor
            powerBIRef.current.appendChild(iframe);

            // Mensaje alternativo si no se puede cargar el informe
            const fallbackMessage = document.createElement("div");
            fallbackMessage.className = "mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg";
            fallbackMessage.innerHTML = `
                <p class="font-medium">Nota: Este es un ejemplo de integración.</p>
                <p>En un entorno de producción, se requeriría una suscripción a Power BI y configuraciones específicas.</p>
            `;
            powerBIRef.current.appendChild(fallbackMessage);
        };

        // Cargar el informe cuando el componente se monte
        loadPowerBIReport();

        // Limpiar cuando el componente se desmonte
        return () => {
            if (powerBIRef.current) {
                powerBIRef.current.innerHTML = "";
            }
        };
    }, []);

    return (
        <div className="flex flex-col gap-y-4 rounded-2xl">
            <h1 className="title">Análisis de Datos</h1>
            
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-slate-900">
                    <h2 className="text-xl font-semibold mb-4">Dashboard Power BI</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Visualiza los datos institucionales a través de informes interactivos y paneles de control.
                    </p>
                    
                    {/* Contenedor para el informe de Power BI */}
                    <div 
                        ref={powerBIRef} 
                        className="w-full bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden"
                    >
                        <div className="flex items-center justify-center h-[600px]">
                            <div className="text-center p-6">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                                <p className="text-gray-600 dark:text-gray-400">Cargando informe de Power BI...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-slate-900">
                    <h2 className="text-xl font-semibold mb-4">Métricas Clave</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-green-800 dark:text-green-300">Estudiantes Activos</h3>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">1,245</p>
                            <p className="text-sm text-green-600 dark:text-green-400">↑ 12% respecto al trimestre anterior</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Cursos Activos</h3>
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">87</p>
                            <p className="text-sm text-blue-600 dark:text-blue-400">↑ 5% respecto al trimestre anterior</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300">Tasa de Finalización</h3>
                            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">78%</p>
                            <p className="text-sm text-purple-600 dark:text-purple-400">↑ 3% respecto al trimestre anterior</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AnalisisPage;