import { FC } from 'react'
import { useCloudStore } from '../store/useStore'
import { MoreVertical, Download, ArrowRight, Activity, Filter, PieChart } from 'lucide-react'
import { formatCurrency } from '../lib/utils'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export const GCPBilling: FC<{ navigateTo: (tab: string) => void }> = ({ navigateTo }) => {
  const { resources } = useCloudStore()
  const gcpResources = resources.filter(r => r.provider === 'GCP')
  const totalCost = gcpResources.reduce((acc, r) => acc + r.total_cost, 0)
  
  const dailyCost = totalCost
  const forecastedCost = totalCost * 43200

  // Fake chart data
  const data = [
    { name: '1st', cost: dailyCost * 0.5 },
    { name: '5th', cost: dailyCost * 0.8 },
    { name: '10th', cost: dailyCost * 1.5 },
    { name: '15th', cost: dailyCost * 2.1 },
    { name: '20th', cost: dailyCost * 2.8 },
    { name: '25th', cost: dailyCost * 3.4 },
    { name: '30th', cost: dailyCost * 4.2 },
  ]

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-[#F1F3F4] text-[#3C4043]">
      <div className="flex items-center gap-2 text-sm text-[#1A73E8] font-medium mb-6 cursor-pointer hover:underline" onClick={() => navigateTo('home')}>
         <ArrowRight className="rotate-180" size={16} /> <span>Back to Dashboard</span>
      </div>

      <div className="flex justify-between items-end mb-6">
        <h1 className="text-[22px] font-normal text-[#202124]">Billing</h1>
        <div className="flex gap-2">
           <button className="text-[#1A73E8] font-medium text-sm hover:bg-[#E8F0FE] px-4 py-2 rounded transition-colors flex items-center gap-2">
             <Download size={16} /> Export
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Cost Overview */}
        <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm lg:col-span-2">
           <div className="border-b border-[#DADCE0] px-6 py-4 flex justify-between items-center">
             <h2 className="font-medium text-[16px] text-[#202124]">Cost trend</h2>
             <div className="flex items-center gap-2 text-sm text-[#5F6368]">
               <Filter size={16} /> Current month
             </div>
           </div>
           <div className="p-6 h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.2}/>
                     <stop offset="95%" stopColor="#1A73E8" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#5F6368' }} axisLine={false} tickLine={false} />
                 <YAxis tick={{ fontSize: 12, fill: '#5F6368' }} tickFormatter={(v) => `$${v}`} axisLine={false} tickLine={false} />
                 <Tooltip formatter={(value) => formatCurrency(value as number)} />
                 <Area type="monotone" dataKey="cost" stroke="#1A73E8" fillOpacity={1} fill="url(#colorCost)" strokeWidth={2} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm flex flex-col">
          <div className="border-b border-[#DADCE0] px-4 py-4">
             <h2 className="font-medium text-[16px] text-[#202124]">Current billing period</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center">
             <div className="text-sm text-[#5F6368] mb-1">Estimated costs starting Apr 1</div>
             <div className="text-[36px] font-normal text-[#202124] mb-4">
               {formatCurrency(totalCost)}
             </div>
             
             <div className="space-y-4 pt-4 border-t border-[#DADCE0]">
               <div>
                 <div className="text-sm font-medium text-[#202124] flex justify-between mb-1">
                   <span>Forecasted cost</span>
                   <span>{formatCurrency(forecastedCost)}</span>
                 </div>
                 <div className="text-xs text-[#5F6368]">For entire month of April</div>
               </div>
             </div>
          </div>
          <div className="border-t border-[#DADCE0] p-4 bg-[#F8F9FA] rounded-b-lg">
             <button className="text-[#1A73E8] font-medium text-sm hover:underline">View reports</button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
        <div className="border-b border-[#DADCE0] px-6 py-4 flex justify-between items-center">
          <h2 className="font-medium text-[16px] text-[#202124]">Cost breakdown by resource</h2>
        </div>
        <div className="p-0">
           <table className="w-full text-left text-[13px]">
             <thead className="border-b border-[#DADCE0] text-[#5F6368]">
               <tr>
                 <th className="px-6 py-3 font-medium">Resource Name</th>
                 <th className="px-6 py-3 font-medium">Type</th>
                 <th className="px-6 py-3 font-medium text-right">Cost</th>
                 <th className="px-6 py-3 font-medium text-right">% of Total</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-[#DADCE0]">
               {gcpResources.length === 0 ? (
                 <tr><td colSpan={4} className="p-8 text-center text-gray-500">No resources available.</td></tr>
               ) : (
                 gcpResources.sort((a,b) => b.total_cost - a.total_cost).map(r => (
                   <tr key={r.id} className="hover:bg-[#F8F9FA]">
                     <td className="px-6 py-3 text-[#1A73E8] hover:underline cursor-pointer font-medium">{r.name}</td>
                     <td className="px-6 py-3 text-[#3C4043]">{r.type}</td>
                     <td className="px-6 py-3 text-right font-medium">{formatCurrency(r.total_cost)}</td>
                     <td className="px-6 py-3 text-right text-[#5F6368]">
                       {totalCost > 0 ? ((r.total_cost / totalCost) * 100).toFixed(1) : 0}%
                     </td>
                   </tr>
                 ))
               )}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  )
}
