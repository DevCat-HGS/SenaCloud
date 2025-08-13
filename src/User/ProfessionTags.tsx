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
  
  // Ya no se requieren opciones predefinidas para profesión y especialidad
  // Se mantienen como referencia pero no se utilizan en el componente
  
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
  const handleProfesionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaProfesion = e.target.value;
    setProfesion(nuevaProfesion);
  };
  
  // Manejar envío de profesión
  const handleProfesionSubmit = () => {
    if (profesion && !selectedTags.includes(profesion)) {
      onTagChange(profesion);
      setProfesion(''); // Limpiar el campo después de añadir
    }
  };
  
  // Manejar cambio de especialidad
  const handleEspecialidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaEspecialidad = e.target.value;
    setEspecialidad(nuevaEspecialidad);
  };
  
  // Manejar envío de especialidad
  const handleEspecialidadSubmit = () => {
    if (especialidad && !selectedTags.includes(especialidad)) {
      onTagChange(especialidad);
      setEspecialidad(''); // Limpiar el campo después de añadir
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
      <p className="text-sm text-gray-600 mb-4">Complete su información profesional ingresando su profesión, especialidad y seleccionando su nivel académico.</p>
      
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

      {/* Sección de listas desplegables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-green-700">Profesión</label>
          <div className="flex">
            <input 
              type="text"
              value={profesion} 
              onChange={handleProfesionChange}
              placeholder="Ingrese su profesión"
              className="w-full px-4 py-2 rounded-l-xl border border-green-200 focus:outline-none focus:ring-4 focus:ring-green-400/40 bg-white/80 shadow-inner transition-all duration-200"
            />
            <button
              type="button"
              onClick={handleProfesionSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-r-xl hover:bg-green-700 transition-colors duration-200"
            >
              Añadir
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Ingrese su profesión y haga clic en Añadir</p>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-green-700">Especialidad</label>
          <div className="flex">
            <input 
              type="text"
              value={especialidad} 
              onChange={handleEspecialidadChange}
              placeholder="Ingrese su especialidad"
              className="w-full px-4 py-2 rounded-l-xl border border-green-200 focus:outline-none focus:ring-4 focus:ring-green-400/40 bg-white/80 shadow-inner transition-all duration-200"
            />
            <button
              type="button"
              onClick={handleEspecialidadSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-r-xl hover:bg-green-700 transition-colors duration-200"
            >
              Añadir
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Ingrese su especialidad y haga clic en Añadir</p>
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