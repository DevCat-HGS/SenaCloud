import { 
    ChartColumn, 
    Home, 
    FileText, 
    Users, 
    Calendar, 
    Settings, 
    BarChart3,
    FileSpreadsheet,
    FileText as FilePdf,
    UserCheck,
    UserCog,
    GraduationCap,
    Shield,
    Activity,
    Bell
} from "lucide-react";

import ProfileImage from "../assets/profile-image.jpg";
import ProductImage from "../assets/product-image.jpg";

export const navbarLinks = [
    {
        title: "Principal",
        links: [
            {
                title: "Dashboard",
                href: "/Admin",
                icon: Home,
                label: "Dashboard",
                path: "/Admin"
            },
            {
                title: "Análisis",
                href: "/Admin/analisis",
                icon: BarChart3,
                label: "Análisis",
                path: "/Admin/analisis"
            }
        ]
    },
    {
        title: "Reportes",
        links: [
            {
                title: "Reportes PDF",
                href: "/Admin/reportes/pdf",
                icon: FilePdf,
                label: "PDF",
                path: "/Admin/reportes/pdf"
            },
            {
                title: "Reportes Excel",
                href: "/Admin/reportes/excel",
                icon: FileSpreadsheet,
                label: "Excel",
                path: "/Admin/reportes/excel"
            }
        ]
    },
    {
        title: "Usuarios",
        links: [
            {
                title: "Instructores",
                href: "/Admin/usuarios/instructores",
                icon: GraduationCap,
                label: "Instructores",
                path: "/Admin/usuarios/instructores"
            },
            {
                title: "Coordinadores",
                href: "/Admin/usuarios/coordinadores",
                icon: UserCheck,
                label: "Coordinadores",
                path: "/Admin/usuarios/coordinadores"
            },
            {
                title: "Equipo Pedagógico",
                href: "/Admin/usuarios/equipo-pedagogico",
                icon: Users,
                label: "Equipo Pedagógico",
                path: "/Admin/usuarios/equipo-pedagogico"
            },
            {
                title: "Administradores",
                href: "/Admin/usuarios/administradores",
                icon: Shield,
                label: "Administradores",
                path: "/Admin/usuarios/administradores"
            }
        ]
    },
    {
        title: "Gestión",
        links: [
            {
                title: "Actividades",
                href: "/Admin/actividades",
                icon: Activity,
                label: "Actividades",
                path: "/Admin/actividades"
            },
            {
                title: "Eventos",
                href: "/Admin/eventos",
                icon: Bell,
                label: "Eventos",
                path: "/Admin/eventos"
            }
        ]
    },
    {
        title: "Sistema",
        links: [
            {
                title: "Ajustes",
                href: "/Admin/ajustes",
                icon: Settings,
                label: "Ajustes",
                path: "/Admin/ajustes"
            }
        ]
    }
];

// Datos de ejemplo para el dashboard
export const overviewData = [
    {
        name: "Ene",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Abr",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Ago",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Dic",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
];

export const recentSalesData = [
    {
        name: "Juan Pérez",
        email: "juan.perez@email.com",
        amount: "+$1,999.00",
        avatar: ProfileImage,
    },
    {
        name: "María García",
        email: "maria.garcia@email.com",
        amount: "+$39.00",
        avatar: ProfileImage,
    },
    {
        name: "Carlos López",
        email: "carlos.lopez@email.com",
        amount: "+$299.00",
        avatar: ProfileImage,
    },
    {
        name: "Ana Martínez",
        email: "ana.martinez@email.com",
        amount: "+$99.00",
        avatar: ProfileImage,
    },
    {
        name: "Luis Rodríguez",
        email: "luis.rodriguez@email.com",
        amount: "+$39.00",
        avatar: ProfileImage,
    },
];

export const topProducts = [
    {
        name: "Curso de React",
        description: "Aprende React desde cero",
        price: "$299.00",
        image: ProductImage,
    },
    {
        name: "Curso de TypeScript",
        description: "TypeScript para desarrolladores",
        price: "$199.00",
        image: ProductImage,
    },
    {
        name: "Curso de Node.js",
        description: "Backend con Node.js",
        price: "$399.00",
        image: ProductImage,
    },
];

// Datos de ejemplo para usuarios
export const usuariosData = {
    instructores: [
        { id: 1, nombre: "Juan Pérez", email: "juan@email.com", especialidad: "React", estado: "Activo" },
        { id: 2, nombre: "María García", email: "maria@email.com", especialidad: "TypeScript", estado: "Activo" },
        { id: 3, nombre: "Carlos López", email: "carlos@email.com", especialidad: "Node.js", estado: "Inactivo" },
    ],
    coordinadores: [
        { id: 1, nombre: "Ana Martínez", email: "ana@email.com", area: "Desarrollo Web", estado: "Activo" },
        { id: 2, nombre: "Luis Rodríguez", email: "luis@email.com", area: "Móvil", estado: "Activo" },
    ],
    equipoPedagogico: [
        { id: 1, nombre: "Pedro Sánchez", email: "pedro@email.com", rol: "Diseñador Instruccional", estado: "Activo" },
        { id: 2, nombre: "Carmen Ruiz", email: "carmen@email.com", rol: "Evaluador", estado: "Activo" },
    ],
    administradores: [
        { id: 1, nombre: "Roberto Díaz", email: "roberto@email.com", nivel: "Super Admin", estado: "Activo" },
        { id: 2, nombre: "Laura Torres", email: "laura@email.com", nivel: "Admin", estado: "Activo" },
    ]
};

// Datos de ejemplo para actividades
export const actividadesData = [
    { id: 1, titulo: "Taller de React", instructor: "Juan Pérez", fecha: "2024-01-15", estado: "Programada" },
    { id: 2, titulo: "Curso de TypeScript", instructor: "María García", fecha: "2024-01-20", estado: "En curso" },
    { id: 3, titulo: "Workshop Node.js", instructor: "Carlos López", fecha: "2024-01-25", estado: "Completada" },
];

// Datos de ejemplo para eventos
export const eventosData = [
    { id: 1, titulo: "Conferencia Tech 2024", fecha: "2024-02-15", ubicacion: "Auditorio Principal", estado: "Programado" },
    { id: 2, titulo: "Hackathon SenaCloud", fecha: "2024-03-01", ubicacion: "Sala de Innovación", estado: "En preparación" },
    { id: 3, titulo: "Demo Day", fecha: "2024-03-15", ubicacion: "Plaza Central", estado: "Programado" },
];


