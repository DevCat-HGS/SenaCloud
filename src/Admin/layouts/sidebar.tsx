import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { navbarLinks } from "../constants";

import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";

import { cn } from "../utils/cn";

import PropTypes from "prop-types";

interface SidebarProps {
    collapsed: boolean;
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ collapsed }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-2 border-green-100 bg-white rounded-2xl mt-0 mb-0 mx-4 dark:border-green-100 dark:bg-slate-900",
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
        >
            <div className="flex gap-x-3 p-3 rounded-xl bg-white dark:bg-slate-900">
                <img
                    src="https://api-img-hgs.netlify.app/img/senacloud-logo.svg"
                    alt="SenaCloud"
                    className="w-8 h-8"
                />
                {!collapsed && <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">SenaCloud</p>}
            </div>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
                {navbarLinks.map((navbarLink) => (
                    <nav
                        key={navbarLink.title}
                        className={cn("sidebar-group rounded-lg", collapsed && "md:items-center")}
                    >
                        <p className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}>{navbarLink.title}</p>
                        {navbarLink.links.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.path}
                                className={cn("sidebar-item rounded-lg", collapsed && "md:w-[45px]")}
                            >
                                <link.icon
                                    size={22}
                                    className="flex-shrink-0"
                                />
                                {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
                            </NavLink>
                        ))}
                    </nav>
                ))}
            </div>
        </aside>
    );
});

Sidebar.displayName = "Sidebar";
