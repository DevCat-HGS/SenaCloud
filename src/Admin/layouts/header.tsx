import { useTheme } from "../hooks/use-theme";
import { ChevronsLeft, Moon, Search, Sun } from "lucide-react";
import profileImg from "../assets/profile-image.jpg";
import PropTypes from "prop-types";
import NotificacionesRealTime from "../../components/NotificacionesRealTime";

// Simulación de usuario actual - En una aplicación real, esto vendría de un contexto de autenticación
const currentUser = {
    id: "user-123",
    nombre: "Usuario Ejemplo"
};

interface HeaderProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
    const { theme, setTheme } = useTheme();

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900 mt-2 mb-2 mx-4 rounded-2xl border-2 border-green-100 dark:border-green-100">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
                </button>
                <div className="input rounded-2xl">
                    <Search
                        size={20}
                        className="text-slate-300 "
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                {/* <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun
                        size={20}
                        className="dark:hidden"
                    />
                    <Moon
                        size={20}
                        className="hidden dark:block"
                    />
                </button> */}
                <NotificacionesRealTime userId={currentUser.id} />
                <button className="size-10 overflow-hidden rounded-full">
                    <img
                        src={profileImg}
                        alt="profile image"
                        className="size-full object-cover"
                    />
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
