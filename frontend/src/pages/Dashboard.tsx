import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, Users, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [charts, setCharts] = useState<any>(null);
  const [mlForecast, setMlForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, replace with actual API calls
    // For demo purposes, we simulate API responses
    setTimeout(() => {
      setStats({
        total_revenue: 124500,
        total_orders: 1423,
        total_customers: 892,
        low_stock_alerts: 12,
        today_sales: 4200,
      });
      setCharts({
        monthly_revenue: [
          { name: 'Jan', total: 4000, profit: 2400 },
          { name: 'Feb', total: 3000, profit: 1398 },
          { name: 'Mar', total: 2000, profit: 9800 },
          { name: 'Apr', total: 2780, profit: 3908 },
          { name: 'May', total: 1890, profit: 4800 },
          { name: 'Jun', total: 2390, profit: 3800 },
          { name: 'Jul', total: 3490, profit: 4300 },
        ],
      });
      setMlForecast({
        forecast: [
          { month: 'Aug', predicted_sales: 3800 },
          { month: 'Sep', predicted_sales: 4100 },
          { month: 'Oct', predicted_sales: 4500 },
        ],
        confidence: "92.4%"
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend?: string }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
        {React.cloneElement(icon as React.ReactElement, { size: 100 } as any)}
      </div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-sm relative z-10">
          <TrendingUp size={16} className="text-emerald-500" />
          <span className="text-emerald-500 font-medium">{trend}</span>
          <span className="text-slate-400">vs last month</span>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Executive Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back, here's what's happening with your store today.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-200">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${stats?.total_revenue.toLocaleString()}`} icon={<DollarSign />} trend="+12.5%" />
        <StatCard title="Total Orders" value={stats?.total_orders.toString()} icon={<ShoppingBag />} trend="+8.2%" />
        <StatCard title="Total Customers" value={stats?.total_customers.toString()} icon={<Users />} trend="+5.1%" />
        <StatCard title="Low Stock Alerts" value={stats?.low_stock_alerts.toString()} icon={<AlertCircle />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Revenue & Profit Analytics</h3>
            <p className="text-sm text-slate-500">Monthly performance overview</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts?.monthly_revenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} tickFormatter={(value) => `$${value}`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="total" name="Revenue" stroke="#1d4ed8" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">AI Sales Forecast</h3>
            <p className="text-sm text-slate-500">Predicted revenue for next 3 months</p>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-4">
              {mlForecast?.forecast.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {item.month}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Predicted Sales</p>
                      <p className="text-xs text-slate-500">Based on historical data</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">${item.predicted_sales}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500 font-medium">Model Confidence</span>
                <span className="text-sm font-bold text-emerald-500">{mlForecast?.confidence}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: mlForecast?.confidence }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
