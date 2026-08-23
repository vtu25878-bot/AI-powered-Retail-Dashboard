import { useState } from 'react';
import { Download, Filter, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const Sales = () => {
  const [orders] = useState([
    { id: 'ORD-001', customer: 'Alice Smith', date: '2026-07-03', amount: 345.00, status: 'Completed' },
    { id: 'ORD-002', customer: 'Bob Johnson', date: '2026-07-03', amount: 129.99, status: 'Processing' },
    { id: 'ORD-003', customer: 'Charlie Brown', date: '2026-07-02', amount: 899.50, status: 'Completed' },
    { id: 'ORD-004', customer: 'Diana Prince', date: '2026-07-02', amount: 45.00, status: 'Shipped' },
    { id: 'ORD-005', customer: 'Evan Wright', date: '2026-07-01', amount: 210.25, status: 'Completed' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sales & Orders</h1>
          <p className="text-slate-500 text-sm mt-1">Track customer orders, invoices, and sales performance.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-4 items-center w-full sm:w-auto">
             <div className="text-sm font-medium text-slate-700">Recent Orders</div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium transition-colors">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-indigo-600">{order.id}</td>
                  <td className="px-6 py-4 text-slate-800 font-medium">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-500">{order.date}</td>
                  <td className="px-6 py-4 text-slate-800">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-slate-100 text-slate-800'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Sales;
