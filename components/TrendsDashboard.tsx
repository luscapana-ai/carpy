
import React from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import type { Catch } from '../types';
import { BarChartIcon, PieChartIcon, AreaChartIcon, WeightIcon, FishIcon } from './icons';

interface TrendsDashboardProps {
    catches: Catch[];
}

const COLORS = ['#22d3ee', '#818cf8', '#c084fc', '#fb7185', '#fbbf24', '#34d399'];

const TrendsDashboard: React.FC<TrendsDashboardProps> = ({ catches }) => {
    if (catches.length === 0) return null;

    // Data Processing: Bait Success
    const baitDataMap: Record<string, number> = {};
    catches.forEach(c => {
        baitDataMap[c.bait] = (baitDataMap[c.bait] || 0) + 1;
    });
    const baitData = Object.entries(baitDataMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    // Data Processing: Species Pie
    const speciesDataMap: Record<string, number> = {};
    catches.forEach(c => {
        speciesDataMap[c.species] = (speciesDataMap[c.species] || 0) + 1;
    });
    const speciesData = Object.entries(speciesDataMap).map(([name, value]) => ({ name, value }));

    // Data Processing: Temp vs Success (Sorted by date)
    const tempTrendData = catches
        .filter(c => c.weather?.temp !== undefined)
        .map(c => ({
            date: new Date(c.date).toLocaleDateString(),
            temp: c.weather?.temp,
            weight: c.weight.lbs + (c.weight.oz / 16)
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-10);

    const totalWeight = catches.reduce((acc, c) => acc + c.weight.lbs + (c.weight.oz / 16), 0).toFixed(1);
    const avgWeight = (parseFloat(totalWeight) / catches.length).toFixed(1);

    return (
        <div className="space-y-8 mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Weight</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                         <WeightIcon className="w-4 h-4 text-cyan-400" />
                         <span className="text-2xl font-bold text-white">{totalWeight}lb</span>
                    </div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Avg. Size</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                         <FishIcon className="w-4 h-4 text-purple-400" />
                         <span className="text-2xl font-bold text-white">{avgWeight}lb</span>
                    </div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Catches</p>
                    <span className="text-2xl font-bold text-white block mt-1">{catches.length}</span>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Best Bait</p>
                    <span className="text-lg font-bold text-cyan-400 block mt-1 truncate">{baitData[0]?.name || 'N/A'}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bait Success Bar Chart */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChartIcon className="w-5 h-5 text-cyan-400" />
                        <h3 className="font-bold text-slate-200">Bait Performance</h3>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={baitData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#22d3ee' }}
                                />
                                <Bar dataKey="count" fill="#0891b2" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Species Distribution Pie Chart */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChartIcon className="w-5 h-5 text-purple-400" />
                        <h3 className="font-bold text-slate-200">Species Breakdown</h3>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={speciesData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {speciesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                     contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Temperature Success Line Chart */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <AreaChartIcon className="w-5 h-5 text-green-400" />
                        <h3 className="font-bold text-slate-200">Success Trend vs. Water Temp</h3>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={tempTrendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} />
                                <YAxis yAxisId="left" stroke="#22d3ee" fontSize={12} />
                                <YAxis yAxisId="right" orientation="right" stroke="#fbbf24" fontSize={12} />
                                <Tooltip 
                                     contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="weight" name="Weight (lb)" stroke="#22d3ee" strokeWidth={3} dot={{ fill: '#22d3ee' }} />
                                <Line yAxisId="right" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#fbbf24" strokeWidth={2} dot={{ fill: '#fbbf24' }} strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendsDashboard;
