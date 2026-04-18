import { FC } from 'react'
import { useCloudStore } from '../store/useStore'
import { BarChart2, DollarSign, Download, Settings, PieChart, Info, LayoutGrid } from 'lucide-react'
import { formatCurrency } from '../lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export const AWSBilling: FC<{ navigateTo: (path: string) => void }> = ({ navigateTo }) => {
  const { resources } = useCloudStore()
  const awsResources = resources.filter(r => r.provider === 'AWS')
  const totalCost = awsResources.reduce((acc, r) => acc + r.total_cost, 0)
  
  // Fake monthly projection based on per_minute cost
  const monthlyCost = totalCost * 43200

  const serviceData = [
    { name: 'EC2', cost: monthlyCost * 0.6 },
    { name: 'RDS', cost: monthlyCost * 0.25 },
    { name: 'S3', cost: monthlyCost * 0.1 },
    { name: 'Other', cost: monthlyCost * 0.05 },
  ]

  return (
    <div className="flex-1 p-8 w-full max-w-[1400px] mx-auto bg-[#F2F3F3]">
       <div className="flex items-center gap-2 text-sm text-[#0073BB] font-medium mb-4 cursor-pointer hover:underline" onClick={() => navigateTo('home')}>
         <span>AWS Console</span> <span>&gt;</span> <span>Billing and Cost Management</span>
       </div>
       
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-[26px] font-bold text-[#16191F] flex items-center gap-2">
           Billing and Cost Management
         </h1>
         <div className="flex gap-4">
            <button className="px-4 py-1.5 border border-[#545B64] bg-white text-[#16191F] rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 flex items-center gap-2">
              <Download size={16} /> Download CSV
            </button>
            <button className="px-4 py-1.5 border border-[#545B64] bg-white text-[#16191F] rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 flex items-center gap-2">
              <Settings size={16} /> Preferences
            </button>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white border border-[#D5DBDB] rounded-lg p-6 shadow-sm">
           <h3 className="text-[#545B64] text-xs font-bold uppercase tracking-wider mb-2">Estimated Month-to-Date</h3>
           <div className="text-3xl font-light text-[#16191F] mb-1">{formatCurrency(totalCost)}</div>
           <p className="text-sm text-green-700 flex items-center gap-1">▼ 12% vs last month</p>
         </div>
         <div className="bg-white border border-[#D5DBDB] rounded-lg p-6 shadow-sm">
           <h3 className="text-[#545B64] text-xs font-bold uppercase tracking-wider mb-2">Forecasted Month End</h3>
           <div className="text-3xl font-light text-[#16191F] mb-1">{formatCurrency(monthlyCost)}</div>
           <p className="text-sm text-gray-500">Based on current usage</p>
         </div>
         <div className="bg-white border border-[#D5DBDB] rounded-lg p-6 shadow-sm border-l-4 border-l-[#FF9900]">
           <h3 className="text-[#545B64] text-xs font-bold uppercase tracking-wider mb-2">Free Tier Status</h3>
           <div className="text-lg font-medium text-[#16191F] mb-1">In limits</div>
           <p className="text-sm text-[#0073BB] hover:underline cursor-pointer">View Top Free Tier Services</p>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white border border-[#D5DBDB] rounded-lg shadow-sm">
           <div className="p-4 border-b border-[#D5DBDB] bg-[#FAFAFA]">
             <h2 className="font-bold flex items-center gap-2">
               Cost by Service
             </h2>
           </div>
           <div className="p-6 h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={serviceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                 <XAxis type="number" tickFormatter={(v) => `$${v}`} />
                 <YAxis dataKey="name" type="category" width={80} />
                 <Tooltip formatter={(value) => formatCurrency(value as number)} />
                 <Bar dataKey="cost" fill="#0073BB" barSize={20} radius={[0, 4, 4, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
         </div>

         <div className="bg-white border border-[#D5DBDB] rounded-lg shadow-sm">
           <div className="p-4 border-b border-[#D5DBDB] bg-[#FAFAFA]">
             <h2 className="font-bold flex items-center gap-2">
               Highest Cost Resources
             </h2>
           </div>
           <div className="p-0">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAFAFA] border-b border-[#D5DBDB] text-[#545B64]">
                  <tr>
                    <th className="p-3 font-medium">Resource Name</th>
                    <th className="p-3 font-medium">Type</th>
                    <th className="p-3 font-medium text-right">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D5DBDB]">
                  {awsResources.sort((a,b) => b.total_cost - a.total_cost).slice(0, 5).map(r => (
                    <tr key={r.id} className="hover:bg-[#F9F9F9]">
                      <td className="p-3 text-[#0073BB] hover:underline cursor-pointer font-medium">{r.name}</td>
                      <td className="p-3 text-[#545B64]">{r.type}</td>
                      <td className="p-3 text-right font-medium">{formatCurrency(r.total_cost)}</td>
                    </tr>
                  ))}
                  {awsResources.length === 0 && (
                     <tr>
                       <td colSpan={3} className="p-6 text-center text-gray-500">No resources found.</td>
                     </tr>
                  )}
                </tbody>
              </table>
           </div>
           <div className="p-3 border-t border-[#D5DBDB] bg-[#FAFAFA] text-center">
             <button className="text-[#0073BB] font-medium text-sm hover:underline">View absolute details</button>
           </div>
         </div>
       </div>

    </div>
  )
}
