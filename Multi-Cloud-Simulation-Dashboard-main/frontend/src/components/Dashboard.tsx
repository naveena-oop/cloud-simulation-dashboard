import { FC } from 'react'
import { useCloudStore } from '../store/useStore'
import ResourceCard from './ResourceCard'
import AIOptimization from './AIOptimization'
import TerminalWindow from './TerminalWindow'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { formatCurrency } from '../lib/utils'
import { TrendingUp, Activity, DollarSign, Download } from 'lucide-react'

const Dashboard: FC = () => {
  const { resources, activeProvider } = useCloudStore()

  const filteredResources = activeProvider === 'All' 
    ? resources 
    : resources.filter(r => r.provider === activeProvider)

  const totalCost = filteredResources.reduce((acc, r) => acc + r.total_cost, 0)
  
  const providerData = [
    { name: 'AWS', cost: resources.filter(r => r.provider === 'AWS').reduce((acc, r) => acc + r.total_cost, 0) },
    { name: 'Azure', cost: resources.filter(r => r.provider === 'Azure').reduce((acc, r) => acc + r.total_cost, 0) },
    { name: 'GCP', cost: resources.filter(r => r.provider === 'GCP').reduce((acc, r) => acc + r.total_cost, 0) },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">Manage and monitor your simulated cloud infrastructure.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => alert('Exporting Analytics as PDF... (Simulated)')}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors font-medium"
          >
            <Download size={18} />
            Export PDF
          </button>
          <div className="bg-card border rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase">Estimated Monthly Cost</p>
              <p className="text-2xl font-bold">{formatCurrency(totalCost * 43200)}</p>
            </div>
          </div>
        </div>
      </div>

      <AIOptimization />
      
      <TerminalWindow />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredResources.map(resource => (
           <ResourceCard key={resource.id} resource={resource} />
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-card border rounded-xl p-6 shadow-sm">
           <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-lg flex items-center gap-2">
               <TrendingUp size={20} className="text-primary" />
               Cost by Provider
             </h3>
           </div>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={providerData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} />
                 <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                 <Tooltip 
                    cursor={{fill: 'rgba(59, 130, 246, 0.05)'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                 />
                 <Bar dataKey="cost" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm">
           <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-lg flex items-center gap-2">
               <Activity size={20} className="text-emerald-500" />
               Resource Utilization
             </h3>
           </div>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={[
                 { time: '00:00', cpu: 20 }, { time: '04:00', cpu: 35 }, { time: '08:00', cpu: 65 }, 
                 { time: '12:00', cpu: 85 }, { time: '16:00', cpu: 55 }, { time: '20:00', cpu: 30 },
                 { time: '23:59', cpu: 25 }
               ]}>
                 <defs>
                   <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} />
                 <YAxis axisLine={false} tickLine={false} />
                 <Tooltip />
                 <Area type="monotone" dataKey="cpu" stroke="#10b981" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
