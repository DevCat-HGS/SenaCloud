import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/Logo.svg';

export default function Login() {
  const [form, setForm] = useState({
    correo: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.correo.endsWith('@mi.sena.edu.co')) {
      setError('El correo debe ser institucional (@mi.sena.edu.co)');
      return;
    }
    setConfirm(true);
  };

  const handleConfirm = () => {
    window.location.href = '/Admin';
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Logo en la esquina superior izquierda */}
      <Link to="/" className="absolute top-4 left-4 h-16 sm:h-20 w-14 sm:w-17 z-30 block">
        <img src={Logo} alt="SenaCloud" className="h-full w-full" />
      </Link>
      <div className="relative z-10 flex items-center justify-start w-full max-w-7xl mx-auto min-h-[600px]">
        {/* Contenedor del login, más a la izquierda */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-green-500 p-10 flex flex-col items-center ml-0 md:ml-12 animate-fade-in-up relative z-20">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 drop-shadow-lg tracking-tight">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="mb-4 w-full">
              <label className="block mb-1 font-semibold text-green-700">Correo institucional</label>
              <input name="correo" type="email" value={form.correo} onChange={handleChange} required placeholder="usuario@mi.sena.edu.co" className="w-full px-4 py-2 rounded-xl border border-green-200 focus:outline-none focus:ring-4 focus:ring-green-400/40 bg-white/80 shadow-inner transition-all duration-200" />
            </div>
            <div className="mb-4 w-full relative">
              <label className="block mb-1 font-semibold text-green-700">Contraseña</label>
              <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl border border-green-200 focus:outline-none focus:ring-4 focus:ring-green-400/40 bg-white/80 shadow-inner transition-all duration-200" />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-8 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 border border-green-200 shadow hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? (
                  <img src="https://api-img-hgs.netlify.app/img/ver.png" alt="Ocultar contraseña" className="w-5 h-5" />
                ) : (
                  <img src="https://api-img-hgs.netlify.app/img/ocultar.png" alt="Ver contraseña" className="w-5 h-5" />
                )}
              </button>
            </div>
            {error && <div className="text-red-600 mb-2 text-sm font-semibold animate-fade-in">{error}</div>}
            <button type="submit" className="w-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 text-white py-2 rounded-full font-extrabold shadow-lg hover:scale-105 hover:from-green-600 hover:to-emerald-500 transition-all duration-300 animate-glow focus:outline-none focus:ring-4 focus:ring-green-300 mt-2">Iniciar sesión</button>
            {confirm && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-800 text-center animate-fade-in">
                ¿Estás seguro de tu contraseña?
                <button type="button" onClick={handleConfirm} className="ml-4 bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700 transition-colors">Sí, continuar</button>
              </div>
            )}
          </form>
          {/* Enlace a registro */}
          <div className="w-full flex justify-center mt-6">
            <Link to="/register" className="flex items-center gap-2 text-green-700 font-semibold hover:underline hover:text-green-900 transition-colors group">
              <span>Ir a registrarse</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
        {/* Círculo de bienvenida, grande y a la derecha, solo borde visible */}
        <div className="hidden md:block absolute right-[-350px] top-1/2 -translate-y-1/2 z-10">
          <div className="relative flex items-center justify-center">
            <div className="rounded-full border-[20px] border-green-200 bg-green-100 shadow-2xl flex items-center justify-center" style={{width: 950, height: 950}}>
              <div className="flex flex-col items-start justify-center w-[420px] h-[420px] pl-10">
                <h3 className="text-4xl font-extrabold text-green-800 mb-4 drop-shadow-lg text-left">¡Bienvenido!</h3>
                <p className="text-green-700 font-medium text-xl leading-snug text-left">Accede a tu espacio de innovación y colaboración en la nube SenaCloud.</p>
                {/* Enlace volver a inicio */}
                <div className="w-full flex justify-center mt-8">
                  <Link to="/" className="flex items-center gap-2 text-green-700 font-semibold hover:underline hover:text-green-900 transition-colors group text-lg">
                    <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" /></svg>
                    <span>Volver a inicio</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}