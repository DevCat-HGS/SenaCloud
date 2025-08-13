import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Service/API/AuthContext';

export default function InstructorDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://api-img-hgs.netlify.app/img/senacloud-logo.svg" alt="SenaCloud" className="h-10 w-auto" />
            <h1 className="ml-4 text-2xl font-bold text-green-700">Panel de Instructor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none"
              >
                <span className="hidden md:block">{user?.nombre}</span>
                <svg className="h-8 w-8 rounded-full bg-green-100 p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mi Perfil</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md h-screen sticky top-0 overflow-y-auto hidden md:block">
          <nav className="mt-5 px-2">
            <Link
              to="/Instructor"
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${location.pathname === '/Instructor' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'}`}
            >
              <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <Link
              to="/Instructor/guias"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${location.pathname.includes('/Instructor/guias') ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'}`}
            >
              <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Mis Guías
            </Link>
            <Link
              to="/Instructor/actividades"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${location.pathname.includes('/Instructor/actividades') ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'}`}
            >
              <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Actividades
            </Link>
            <Link
              to="/Instructor/eventos"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${location.pathname.includes('/Instructor/eventos') ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'}`}
            >
              <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Eventos
            </Link>
          </nav>
        </aside>

        {/* Mobile menu button */}
        <div className="md:hidden fixed bottom-4 right-4 z-10">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-green-600 text-white p-3 rounded-full shadow-lg focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-20 md:hidden">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="px-4 py-2">
              <Link
                to="/Instructor"
                className="block py-2 text-base font-medium text-white hover:bg-green-700 rounded-md px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/Instructor/guias"
                className="block py-2 text-base font-medium text-white hover:bg-green-700 rounded-md px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Mis Guías
              </Link>
              <Link
                to="/Instructor/actividades"
                className="block py-2 text-base font-medium text-white hover:bg-green-700 rounded-md px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Actividades
              </Link>
              <Link
                to="/Instructor/eventos"
                className="block py-2 text-base font-medium text-white hover:bg-green-700 rounded-md px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Eventos
              </Link>
              <div className="border-t border-gray-700 my-2"></div>
              <Link
                to="/perfil"
                className="block py-2 text-base font-medium text-white hover:bg-green-700 rounded-md px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Mi Perfil
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-base font-medium text-white hover:bg-green-700 rounded-md px-3"
              >
                Cerrar Sesión
              </button>
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}