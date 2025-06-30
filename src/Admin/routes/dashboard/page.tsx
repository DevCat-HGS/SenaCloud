import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useTheme } from "../../hooks/use-theme";

import { overviewData, recentSalesData, topProducts } from "../../constants";

import { Footer } from "../../layouts/footer";

import { CreditCard, DollarSign, Package, PencilLine, Star, Trash, TrendingUp, Users } from "lucide-react";

const DashboardPage = () => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col gap-y-4 rounded-2xl">
            <h1 className="title">Principal</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="card rounded-2xl">
                    <div className="card-header rounded-t-lg">
                        <div className="w-fit rounded-lg bg-green-500/20 p-2 text-green-500 transition-colors dark:bg-green-600/20 dark:text-green-600">
                            <Package size={26} />
                        </div>
                        <p className="card-title">Total de Usuarios</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950 rounded-2xl">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">25,154</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-green-500 px-2 py-1 font-medium text-green-500 dark:border-green-600 dark:text-green-600">
                            <TrendingUp size={18} />
                            25%
                        </span>
                    </div>
                </div>
                <div className="card rounded-2xl">
                    <div className="card-header rounded-2xl">
                        <div className="rounded-lg bg-green-500/20 p-2 text-green-500 transition-colors dark:bg-green-600/20 dark:text-green-600">
                            <DollarSign size={26} />
                        </div>
                        <p className="card-title">Total de Eventos</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950 rounded-2xl">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">$16,000</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-green-500 px-2 py-1 font-medium text-green-500 dark:border-green-600 dark:text-green-600">
                            <TrendingUp size={18} />
                            12%
                        </span>
                    </div>
                </div>
                <div className="card rounded-2xl">
                    <div className="card-header rounded-2xl">
                        <div className="rounded-lg bg-green-500/20 p-2 text-green-500 transition-colors dark:bg-green-600/20 dark:text-green-600">
                            <Users size={26} />
                        </div>
                        <p className="card-title">Total de Actividades</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950 rounded-2xl">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">15,400k</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-green-500 px-2 py-1 font-medium text-green-500 dark:border-green-600 dark:text-green-600">
                            <TrendingUp size={18} />
                            15%
                        </span>
                    </div>
                </div>
                <div className="card rounded-2xl">
                    <div className="card-header rounded-2xl">
                        <div className="rounded-lg bg-green-500/20 p-2 text-green-500 transition-colors dark:bg-green-600/20 dark:text-green-600">
                            <CreditCard size={26} />
                        </div>
                        <p className="card-title">Total de Notificaciones</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950 rounded-2xl">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">12,340</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-green-500 px-2 py-1 font-medium text-green-500 dark:border-green-600 dark:text-green-600">
                            <TrendingUp size={18} />
                            19%
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="card col-span-1 md:col-span-2 lg:col-span-4 rounded-2xl">
                    <div className="card-header rounded-2xl">
                        <p className="card-title">Resumen</p>
                    </div>
                    <div className="card-body p-0 rounded-b-lg">
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart
                                data={overviewData}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorTotal"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#2563eb"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#2563eb"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    cursor={false}
                                    formatter={(value) => `$${value}`}
                                />

                                <XAxis
                                    dataKey="name"
                                    strokeWidth={0}
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickMargin={6}
                                />
                                <YAxis
                                    dataKey="total"
                                    strokeWidth={0}
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickFormatter={(value) => `$${value}`}
                                    tickMargin={6}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#2563eb"
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl">
                    <div className="card-header rounded-2xl">
                        <p className="card-title">Eventos Recientes</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0 rounded-b-lg">
                        {recentSalesData.map((sale) => (
                            <div
                                key={sale.email}
                                className="flex items-center justify-between gap-x-4 py-2 pr-2 rounded-lg"
                            >
                                <div className="flex items-center gap-x-4">
                                    <img
                                        src={sale.avatar}
                                        alt={sale.name}
                                        className="size-10 flex-shrink-0 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col gap-y-2">
                                        <p className="font-medium text-slate-900 dark:text-slate-50">{sale.name}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{sale.email}</p>
                                    </div>
                                </div>
                                <p className="font-medium text-slate-900 dark:text-slate-50">${sale.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="card rounded-2xl">
                <div className="card-header rounded-2xl">
                    <p className="card-title">Eventos Populares</p>
                </div>
                <div className="card-body p-0 rounded-b-lg">
                    <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-lg [scrollbar-width:_thin]">
                        <table className="table rounded-lg">
                            <thead className="table-header rounded-t-lg">
                                <tr className="table-row rounded-t-lg">
                                    <th className="table-head">#</th>
                                    <th className="table-head">Product</th>
                                    <th className="table-head">Price</th>
                                    <th className="table-head">Status</th>
                                    <th className="table-head">Rating</th>
                                    <th className="table-head">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {topProducts.map((product) => (
                                    <tr
                                        key={product.name}
                                        className="table-row rounded-lg"
                                    >
                                        <td className="table-cell">{topProducts.indexOf(product) + 1}</td>
                                        <td className="table-cell">
                                            <div className="flex w-max gap-x-4 rounded-lg">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="size-14 rounded-lg object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <p>{product.name}</p>
                                                    <p className="font-normal text-slate-600 dark:text-slate-400">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell">${product.price}</td>
                                        <td className="table-cell">Pending</td>
                                        <td className="table-cell">
                                            <div className="flex items-center gap-x-2 rounded-full">
                                                <Star
                                                    size={18}
                                                    className="fill-yellow-600 stroke-yellow-600"
                                                />
                                                {(product as { rating?: number }).rating || 0}
                                            </div>
                                        </td>
                                        <td className="table-cell">
                                            <div className="flex items-center gap-x-4">
                                                <button className="text-green-500 dark:text-green-600 rounded-full">
                                                    <PencilLine size={20} />
                                                </button>
                                                <button className="text-red-500 rounded-full">
                                                    <Trash size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
