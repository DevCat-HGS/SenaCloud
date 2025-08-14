import React from 'react';
import { Route, Routes } from 'react-router-dom';
const ListaInstructores = React.lazy(() => import('./ListaInstructores'));
const DetalleInstructor = React.lazy(() => import('./DetalleInstructor'));
const CrearInstructor = React.lazy(() => import('./CrearInstructor'));
const EditarInstructor = React.lazy(() => import('./EditarInstructor'));

const InstructoresRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ListaInstructores />} />
      <Route path="crear" element={<CrearInstructor />} />
      <Route path=":id" element={<DetalleInstructor />} />
      <Route path=":id/editar" element={<EditarInstructor />} />
    </Routes>
  );
};

export default InstructoresRoutes;