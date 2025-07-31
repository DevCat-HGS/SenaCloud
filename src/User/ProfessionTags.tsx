import React, { useState } from 'react';

interface ProfessionTagsProps {
  selectedTags: string[];
  onTagChange: (tag: string) => void;
}

const ProfessionTags: React.FC<ProfessionTagsProps> = ({ selectedTags, onTagChange }) => {
  // Estados para las listas desplegables
  const [profesion, setProfesion] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [nivelAcademico, setNivelAcademico] = useState('');
  
  // Opciones para las listas desplegables
  const profesiones = [
    'Ingeniero de Sistemas',
    'Desarrollador Web',
    'Diseñador Gráfico',
    'Analista de Datos',
    'Administrador de Redes',
    'Especialista en Seguridad Informática',
    'Desarrollador Móvil',
    'Arquitecto de Software',
    'Administrador de Bases de Datos',
    'Gestor de Proyectos TI'
  ];
  
  const especialidades = {
    'Ingeniero de Sistemas': ['Desarrollo de Software', 'Redes', 'Seguridad', 'Bases de Datos'],
    'Desarrollador Web': ['Frontend', 'Backend', 'Fullstack', 'UX/UI'],
    'Diseñador Gráfico': ['Diseño Web', 'Diseño de Marca', 'Ilustración', 'Animación'],
    'Analista de Datos': ['Business Intelligence', 'Big Data', 'Estadística', 'Machine Learning'],
    'Administrador de Redes': ['Redes LAN/WAN', 'Cloud Computing', 'Virtualización', 'Seguridad de Redes'],
    'Especialista en Seguridad Informática': ['Ethical Hacking', 'Ciberseguridad', 'Forense Digital', 'Auditoría'],
    'Desarrollador Móvil': ['Android', 'iOS', 'React Native', 'Flutter'],
    'Arquitecto de Software': ['Microservicios', 'Sistemas Distribuidos', 'Integración', 'DevOps'],
    'Administrador de Bases de Datos': ['SQL', 'NoSQL', 'Data Warehousing', 'Optimización'],
    'Gestor de Proyectos TI': ['Metodologías Ágiles', 'SCRUM', 'PMI', 'ITIL']
  };
  
  const nivelesAcademicos = [
    'Técnico',
    'Tecnólogo',
    'Profesional',
    'Especialización',
    'Maestría',
    'Doctorado'
  ];
  
  // No se requieren categorías de etiquetas

  // Manejar cambio de profesión
  const handleProfesionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevaProfesion = e.target.value;
    setProfesion(nuevaProfesion);
    setEspecialidad(''); // Resetear especialidad cuando cambia la profesión
    
    // Añadir la profesión a las etiquetas seleccionadas
    if (nuevaProfesion && !selectedTags.includes(nuevaProfesion)) {
      onTagChange(nuevaProfesion);
    }
  };
  
  // Manejar cambio de especialidad
  const handleEspecialidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevaEspecialidad = e.target.value;
    setEspecialidad(nuevaEspecialidad);
    
    // Añadir la especialidad a las etiquetas seleccionadas
    if (nuevaEspecialidad && !selectedTags.includes(nuevaEspecialidad)) {
      onTagChange(nuevaEspecialidad);
    }
  };
  
  // Manejar cambio de nivel académico
  const handleNivelAcademicoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoNivel = e.target.value;
    setNivelAcademico(nuevoNivel);
    
    // Añadir el nivel académico a las etiquetas seleccionadas
    if (nuevoNivel && !selectedTags.includes(nuevoNivel)) {
      onTagChange(nuevoNivel);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-green-700 mb-4">Información Profesional</h3>
      <p className="text-sm text-gray-600 mb-4">Complete su información profesional seleccionando su profesión, especialidad y nivel académico.</p>
      
      {/* Sección de listas desplegables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-green-700">Profesión</label>
          <select 
            value={profesion} 
            onChange={handleProfesionChange}
            className="w-full px-4 py-2 rounded-xl border border-green-200 focus:outline-none focus:ring-4 focus:ring-green-400/40 bg-white/80 shadow-inner transition-all duration-200"
          >
            <option value="">Seleccione una profesión</option>
            {profesiones.map(prof => (
              <option key={prof} value={prof}>{prof}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-green-700">Especialidad</label>
          <select 
            value={especialidad} 
            onChange={handleEspecialidadChange}
            disabled={!profesion}
            className="w-full px-4 py-2 rounded-xl border border-green-200 focus:outline-none focus:ring-4 focus:ring-green-400/40 bg-white/80 shadow-inner transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">Seleccione una especialidad</option>
            {profesion && especialidades[profesion as keyof typeof especialidades]?.map(esp => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-green-700">Nivel Académico</label>
          <select 
            value={nivelAcademico} 
            onChange={handleNivelAcademicoChange}
            className="w-full px-4 py-2 rounded-xl border border-green-200 focus:outline-none focus:ring-4 focus:ring-green-400/40 bg-white/80 shadow-inner transition-all duration-200"
          >
            <option value="">Seleccione su nivel académico</option>
            {nivelesAcademicos.map(nivel => (
              <option key={nivel} value={nivel}>{nivel}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Se eliminaron las secciones de etiquetas adicionales */}
      
      {/* Información seleccionada */}
      {selectedTags.length > 0 && (
        <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
          <h4 className="font-semibold text-green-700 mb-2">Información seleccionada:</h4>
          <ul className="list-disc pl-5">
            {selectedTags.map(tag => (
              <li key={tag} className="mb-1 text-green-700">
                {tag}
                <button 
                  type="button" 
                  onClick={() => onTagChange(tag)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfessionTags;