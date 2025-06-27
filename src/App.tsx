import { useState } from 'react';
import "./index.css";
import { Routes, Route, Link, Router } from "react-router-dom";
import Login from "./User/Login";
import Register from "./User/Register";
import Admin from './Admin/Dashboard.tsx';
import DashboardPage from './Admin/routes/dashboard/page';
import { Usuarios } from './Admin/components/Usuarios';
import { Actividades } from './Admin/components/Actividades';
import { Eventos } from './Admin/components/Eventos';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-white">
            {/* Top Banner */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
                <p className="text-sm text-gray-700">
                  SenaCloud se encuentra aun en desarrollo, Se estan trabajando en la primera version de la plataforma{' '}
                  <strong>22 de octubre de 2025</strong> - Registrate para estar al tanto de las actualizaciones
                </p>
              </div>
            </div>

            {/* Header */}
            <header className="bg-white border-4 border-green-200 sticky top-5 z-100 rounded-2xl shadow-lg transition-all mx-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <div className="flex items-center space-x-3">
                    <img
                      src="../img/Logo.svg"
                      alt="SenaCloud"
                      className="h-10 w-auto"
                    />
                    <span className="text-2xl font-bold text-gray-800 tracking-tight">SenaCloud</span>
                  </div>

                  {/* Navigation */}
                  <nav className="hidden lg:flex items-center space-x-8">
                    <div className="relative group">
                      <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Producto
                        <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <div className="relative group">
                      <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Soluciones
                        <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <div className="relative group">
                      <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                        Recursos
                        <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                      Precios
                    </a>
                  </nav>

                  {/* Right Side Actions */}
                  <div className="flex items-center space-x-6">
                    <Link to="/login" className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors">
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/register"
                      className="bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-400 transition-all duration-300 animate-glow focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                      Regístrate gratis
                    </Link>

                    {/* Mobile menu button */}
                    <button
                      className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                  <div className="lg:hidden py-4 border-t border-gray-100">
                    <div className="space-y-4">
                      <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Producto</a>
                      <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Soluciones</a>
                      <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Recursos</a>
                      <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Precios</a>
                      <Link to="/login" className="block text-gray-700 hover:text-blue-600 font-medium">Iniciar sesión</Link>
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  {/* Main Heading */}
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                    La innovación <br />
                    <span className="text-green-600">redefinida</span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Conoce el espacio de innovación, la plataforma de colaboración impulsada por IA que ayuda a tu equipo a crear el producto correcto más rápido.
                  </p>

                  {/* Video Placeholder */}
                  <div className="relative max-w-4xl mx-auto">
                    <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src="https://ext.same-assets.com/1314049128/2963126048.webp"
                        alt="SenaCloud Demo Video"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-6 transition-all transform hover:scale-105">
                          <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        0:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Customer Logos */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <p className="text-gray-600 text-lg">
                    Unidos por la innovación y el crecimiento digital.
                  </p>
                </div>

                {/* Logo Marquee */}
                <div className="relative overflow-hidden">
                  <div className="flex animate-scroll space-x-16 items-center">
                    <img src="https://ext.same-assets.com/1314049128/4290621811.svg" alt="Comcast" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
                    <img src="https://ext.same-assets.com/1314049128/3706100782.svg" alt="Danaher" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
                    <img src="https://ext.same-assets.com/1314049128/1685409409.svg" alt="Dropbox" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
                    <img src="https://ext.same-assets.com/1314049128/1075099755.svg" alt="Publix" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
                    <img src="https://ext.same-assets.com/1314049128/2353366517.svg" alt="Slalom" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
                    {/* Duplicate for seamless scroll */}
                    <img src="https://ext.same-assets.com/1314049128/4290621811.svg" alt="Comcast" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
                    <img src="https://ext.same-assets.com/1314049128/3706100782.svg" alt="Danaher" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
                    <img src="https://ext.same-assets.com/1314049128/1685409409.svg" alt="Dropbox" className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Una mejor manera de pasar de la primera idea al resultado final más rápido
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  {/* Feature 1 */}
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">El lienzo inteligente</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Las grandes ideas merecen espacio para crecer. Nuestro lienzo ilimitado le permite a tu equipo crear y construir en conjunto, desde el primer "¿Qué pasaría si...?" hasta el último "¡Wow!".
                    </p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">Más información →</a>
                  </div>

                  {/* Feature 2 */}
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Hecho a la medida para adaptarse a tus necesidades</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Realiza cualquier proyecto con plantillas paso a paso que transforman flujos de trabajo desordenados e improvisados en flujos de trabajo fluidos.
                    </p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">Más información →</a>
                  </div>

                  {/* Feature 3 */}
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 3l3.86 5H21v2h-4.14L13 15 9.14 10H5V8h4.14L13 3zM7 19h10v2H7v-2z"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Velocidad pura, sin trabas</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Concéntrate en lo que importa con formatos sin distracciones, como documentos, tablas de datos, cronogramas y diapositivas.
                    </p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">Más información →</a>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Acelera tu trabajo y obtén mejores resultados con <span className="text-green-600">SenaCloud AI</span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Libera los superpoderes de la IA en tu lienzo. Completa rápidamente tareas aburridas, como mantenerte al tanto de actualizaciones o comentarios, con resúmenes automáticos. Convierte lluvias de ideas en diagramas refinados o resúmenes de proyectos claros en segundos.
                    </p>
                    <a href="#" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                      Más información
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                  <div className="relative">
                    <img
                      src="https://ext.same-assets.com/1314049128/2613054992.webp"
                      alt="SenaCloud AI Features"
                      className="w-full rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Team Collaboration */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Haz magia con tus compañeros
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Las mejores ideas surgen cuando la gente se junta y se entusiasma. Por eso hicimos que la colaboración sea divertida, fácil y atractiva.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="relative">
                    <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src="https://ext.same-assets.com/1314049128/1403353936.webp"
                        alt="Team Collaboration Video"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all">
                          <svg className="w-6 h-6 text-green-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Menos reuniones, más logros</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Comparte tus brillantes ideas sin programar otra reunión: graba un Talktrack en cualquier momento y compártelo en cualquier lugar. ¿Necesitas resolverlo frente a frente? Haz una llamada directamente en el lienzo sin perder tiempo ni cambiar de herramientas.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Reúne tus herramientas</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Incorpora tus herramientas de planificación y productividad favoritas de Microsoft, Google y Atlassian a Miro y convierte el trabajo individual en trabajo en equipo.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Eleva el nivel de energía</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Despierta el entusiasmo con funciones dinámicas que involucran a todos, desde encuestas rápidas y votación por puntos hasta escalas dinámicas y ruletas sorpresa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Team Use Cases */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    El lugar en el que los equipos colaboran
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Product */}
                  <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Producto</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Una única plataforma para que los equipos de producto ofrezcan valor al cliente más rápido. Todo está aquí: desde la planificación estratégica hasta la creación de roadmaps.
                    </p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">Más información →</a>
                  </div>

                  {/* UX Design */}
                  <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Diseño UX e investigación</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      El espacio de trabajo donde los diseñadores y sus socios multidisciplinarios crean las mejores experiencias centradas en el usuario.
                    </p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">Más información →</a>
                  </div>

                  {/* Engineering */}
                  <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingeniería</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Un espacio de trabajo central donde los ingenieros y los socios se alinean y logran soluciones de manera más eficiente.
                    </p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">Más información →</a>
                  </div>

                  {/* Project Management */}
                  <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Gestión de programas y proyectos</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Permite que los programas se desarrollen mediante una colaboración sin interrupciones en un espacio de trabajo compartido.
                    </p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">Más información →</a>
                  </div>

                  {/* Marketing */}
                  <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Marketing</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Este es el espacio de trabajo que les permite a los expertos en marketing agilizar la planificación de campañas y la ejecución.
                    </p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">Más información →</a>
                  </div>

                  {/* IT */}
                  <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Tecnología de la información</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Toma decisiones colaborativas al instante, informa a las partes interesadas y simplifica lo complejo.
                    </p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">Más información →</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-green-500 via-emerald-600 to-green-800 text-white py-16 animate-gradient-x overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-10 animate-fade-in-up transition-all duration-700">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg animate-fade-in">Por qué los equipos innovan en SenaCloud</h2>
                    <a
                      href="#"
                      className="bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-400 transition-all duration-300 animate-glow focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                      Regístrate gratis
                    </a>
                  </div>

                  <div className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
                    <div className="hover:scale-105 transition-transform duration-300">
                      <h4 className="font-semibold mb-4">Producto</h4>
                      <ul className="space-y-2 text-white/80">
                        <li><a href="#" className="hover:text-white transition-colors">Pizarra online</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Apps e Integraciones</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Plantillas</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Seguridad</a></li>
                      </ul>
                    </div>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <h4 className="font-semibold mb-4">Soluciones</h4>
                      <ul className="space-y-2 text-white/80">
                        <li><a href="#" className="hover:text-white transition-colors">Reuniones y Talleres</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Lluvia de Ideas</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Metodología Scrum</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Diagramas</a></li>
                      </ul>
                    </div>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <h4 className="font-semibold mb-4">Recursos</h4>
                      <ul className="space-y-2 text-white/80">
                        <li><a href="#" className="hover:text-white transition-colors">Academia Miro</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Comunidad</a></li>
                      </ul>
                    </div>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <h4 className="font-semibold mb-4">Empresa</h4>
                      <ul className="space-y-2 text-white/80">
                        <li><a href="#" className="hover:text-white transition-colors">Quiénes somos</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Empleos</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Historias de Clientes</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-white/20">
                    <div className="flex items-center mb-4 md:mb-0">
                      <img
                        src="../img/Logo.svg"
                        alt="SenaCloud"
                        className="h-10 w-auto mr-4 drop-shadow-glow animate-glow"
                      />
                      <span className="text-white/80 font-semibold">© 2025 SenaCloud</span>
                    </div>
                    <div className="flex space-x-6">
                      <a href="#" className="text-white/70 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white/70 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white/70 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Admin" element={<Admin />}>
        <Route index element={<DashboardPage />} />
        <Route path="analisis" element={<h1 className="title">Análisis</h1>} />
        <Route path="reportes">
          <Route path="pdf" element={<h1 className="title">Reportes PDF</h1>} />
          <Route path="excel" element={<h1 className="title">Reportes Excel</h1>} />
        </Route>
        <Route path="usuarios">
          <Route path="instructores" element={<Usuarios tipo="instructores" />} />
          <Route path="coordinadores" element={<Usuarios tipo="coordinadores" />} />
          <Route path="equipo-pedagogico" element={<Usuarios tipo="equipoPedagogico" />} />
          <Route path="administradores" element={<Usuarios tipo="administradores" />} />
        </Route>
        <Route path="actividades" element={<Actividades />} />
        <Route path="eventos" element={<Eventos />} />
        <Route path="ajustes" element={<h1 className="title">Ajustes</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
