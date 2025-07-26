import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useTheme } from "../../hooks/use-theme";

import { overviewData, eventosPasados, proximosEventos } from "../../constants";

import { Footer } from "../../layouts/footer";

import { CreditCard, DollarSign, Package, TrendingUp, Users } from "lucide-react";

const DashboardPage = () => {
    //const { theme } = useTheme();

    return (
        <div className="flex flex-col gap-y-4 rounded-2xl">
            <h1 className="title">Panel Institucional SenaCloud</h1>
            
            <Footer />
        </div>
    );
};

export default DashboardPage;
