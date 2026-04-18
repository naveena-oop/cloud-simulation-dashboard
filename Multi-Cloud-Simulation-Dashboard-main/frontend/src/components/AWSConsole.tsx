import React, { FC } from 'react'
import { useCloudStore } from '../store/useStore'
import { 
  Menu, Search, Bell, HelpCircle, Settings, User, 
  LayoutGrid, Plus, ArrowRight, BarChart2, Shield,
  Server, Box, Boxes, Network, Fingerprint, Activity, Clock, Trash2, Play, Square, Terminal
} from 'lucide-react'
import { AWSBilling } from './AWSBilling'

const AWSConsole: FC = () => {
  const [activeTab, setActiveTab] = React.useState('home')
  const { resources, setTerminalOpen, executeCommand, isTerminalOpen, deleteResource, toggleResource, setActiveVM } = useCloudStore()
  const awsResources = resources.filter(r => r.provider === 'AWS')
  
  const totalCost = awsResources.reduce((acc, r) => acc + r.total_cost, 0)

  const handleSimulate = (cmd: string) => {
    setTerminalOpen(true)
    setTimeout(() => executeCommand('AWS', cmd), 500)
  }

  return (
    <div className="min-h-screen bg-[#F2F3F3] text-[#16191F] font-sans flex flex-col">
      {/* Top Navbar */}
      <div className="bg-[#232F3E] text-white h-10 flex items-center justify-between shrink-0 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center p-1 font-bold text-xl tracking-tighter italic border border-transparent hover:border-white cursor-pointer mr-2">
            aws
          </div>
          <LayoutGrid size={18} className="cursor-pointer hover:text-gray-300" />
          
          <div className="relative flex items-center group">
            <div className="bg-[#16191F] hover:bg-[#16191F]/80 flex items-center h-8 rounded px-3 w-[450px] border border-[#545B64] group-focus-within:border-white focus-within:bg-white focus-within:text-black transition-colors">
              <Search size={16} className="opacity-70 mr-2" />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400 group-focus-within:placeholder:text-gray-500"
              />
              <span className="text-[10px] bg-[#545B64] px-1 rounded ml-2 group-focus-within:hidden text-gray-300">[Alt+S]</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="hover:bg-[#16191F] px-2 h-10 flex items-center cursor-pointer">
            <div className="flex items-center gap-1 opacity-90"><Activity size={16} /></div>
          </div>
          <div className="hover:bg-[#16191F] px-2 h-10 flex items-center cursor-pointer">
            <div className="flex items-center gap-1 opacity-90"><Bell size={16} /></div>
          </div>
          <div className="hover:bg-[#16191F] px-2 h-10 flex items-center cursor-pointer">
            <div className="flex items-center gap-1 opacity-90"><HelpCircle size={16} /></div>
          </div>
          <div className="hover:bg-[#16191F] px-2 h-10 flex items-center cursor-pointer">
            <div className="flex items-center gap-1 opacity-90"><Settings size={16} /></div>
          </div>
          
          <div className="hover:bg-[#16191F] px-2 h-10 flex items-center cursor-pointer gap-1">
            Asia Pacific (Sydney) <span className="text-[10px]">▼</span>
          </div>
          <div className="hover:bg-[#16191F] px-2 h-10 flex items-center cursor-pointer gap-1 bg-[#16191F]">
            charan <span className="text-[10px]">▼</span>
          </div>
        </div>
      </div>

      {/* Sub Header */}
      <div className="h-10 bg-[#FAFAFA] border-b border-[#D5DBDB] flex items-center px-6">
         <Menu size={20} className="text-[#545B64] cursor-pointer" />
      </div>

      {activeTab === 'home' ? (
        <div className="flex-1 p-8 w-full max-w-[1400px] mx-auto">
          {/* Dashboard Code */}
          <div className="flex items-center justify-between mb-6">
          <h1 className="text-[26px] font-bold text-[#16191F] flex items-center gap-2">
            Console Home
            <span className="text-xs font-normal bg-white text-[#0073BB] border border-[#0073BB] px-1 rounded">Info</span>
          </h1>
          <div className="flex gap-4">
             <button className="px-4 py-1.5 border border-[#545B64] bg-white text-[#16191F] rounded-full text-sm font-bold shadow-sm hover:bg-gray-50">
               Reset to default layout
             </button>
             <button className="px-4 py-1.5 bg-[#FF9900] hover:bg-[#EC7211] text-[#16191F] rounded-full text-sm font-bold shadow-sm flex items-center gap-2 border border-[#FF9900]">
               <Plus size={16} /> Add widgets
             </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
          
          {/* Left Column */}
          <div className="space-y-6">
             {/* Recently visited */}
             <div className="bg-white border border-[#D5DBDB] rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
               <div className="p-4 border-b border-[#D5DBDB] flex justify-between items-center">
                 <h2 className="font-bold flex items-center gap-2">
                   <LayoutGrid size={16} className="text-gray-400" /> 
                   Recently visited
                   <span className="text-[11px] font-normal text-[#0073BB] border border-[#0073BB] px-1 rounded-sm cursor-pointer">Info</span>
                 </h2>
                 <span className="text-gray-400">⋮</span>
               </div>
               <div className="p-2 space-y-1">
                 <div 
                   className="flex items-center gap-3 p-2 hover:bg-[#F2F8FD] rounded cursor-pointer group"
                   onClick={() => setActiveTab('billing')}
                 >
                   <div className="bg-[#7AA116] p-1 rounded text-white shrink-0"><BarChart2 size={16} /></div>
                   <span className="text-[#0073BB] font-medium group-hover:underline">Billing and Cost Management</span>
                 </div>
                 <div className="flex items-center gap-3 p-2 hover:bg-[#F2F8FD] rounded cursor-pointer group">
                   <div className="bg-[#ED7100] p-1 rounded text-white shrink-0"><Network size={16} /></div>
                   <span className="text-[#0073BB] font-medium group-hover:underline">Parallel Computing Service</span>
                 </div>
                 <div className="flex items-center gap-3 p-2 hover:bg-[#F2F8FD] rounded cursor-pointer group">
                   <div className="bg-[#8C4FFF] p-1 rounded text-white shrink-0"><Network size={16} /></div>
                   <span className="text-[#0073BB] font-medium group-hover:underline">VPC</span>
                 </div>
                 <div className="flex items-center gap-3 p-2 hover:bg-[#F2F8FD] rounded cursor-pointer group">
                   <div className="bg-[#ED7100] p-1 rounded text-white shrink-0"><Server size={16} /></div>
                   <span className="text-[#0073BB] font-medium group-hover:underline">EC2</span>
                 </div>
                 <div className="flex items-center gap-3 p-2 hover:bg-[#F2F8FD] rounded cursor-pointer group">
                   <div className="bg-[#ED7100] p-1 rounded text-white shrink-0"><Activity size={16} /></div>
                   <span className="text-[#0073BB] font-medium group-hover:underline">CloudWatch</span>
                 </div>
                 <div className="flex items-center gap-3 p-2 hover:bg-[#F2F8FD] rounded cursor-pointer group">
                   <div className="bg-[#2E73B8] p-1 rounded text-white shrink-0"><Box size={16} /></div>
                   <span className="text-[#0073BB] font-medium group-hover:underline">S3</span>
                 </div>
                 <div className="flex items-center gap-3 p-2 hover:bg-[#F2F8FD] rounded cursor-pointer group">
                   <div className="bg-[#ED7100] p-1 rounded text-white shrink-0"><Boxes size={16} /></div>
                   <span className="text-[#0073BB] font-medium group-hover:underline">Lambda</span>
                 </div>
                 <div className="flex items-center gap-3 p-2 hover:bg-[#F2F8FD] rounded cursor-pointer group">
                   <div className="bg-[#DD344C] p-1 rounded text-white shrink-0"><Fingerprint size={16} /></div>
                   <span className="text-[#0073BB] font-medium group-hover:underline">IAM</span>
                 </div>
                 
                 {/* Push Simulated Resources Here */}
                 {awsResources.map(r => (
                   <div key={r.id} className="flex items-center gap-3 p-2 hover:bg-[#F2F8FD] rounded cursor-pointer group">
                     {r.type === 'VM' ? <div className="bg-[#ED7100] p-1 rounded text-white shrink-0"><Server size={16} /></div> :
                      <div className="bg-[#2E73B8] p-1 rounded text-white shrink-0"><Box size={16} /></div>}
                     <span className="text-[#0073BB] font-medium group-hover:underline">{r.name}</span>
                   </div>
                 ))}
               </div>
               <div className="p-4 border-t border-[#D5DBDB] flex items-center justify-between bg-[#FAFAFA] rounded-b-lg">
                 <button className="text-[#0073BB] font-bold text-[13px] hover:underline flex items-center mx-auto">
                   View all services <span className="ml-1 text-[10px]">▼</span>
                 </button>
               </div>
             </div>

             {/* Welcome Widget */}
             <div className="bg-white border border-[#D5DBDB] rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
               <div className="p-4 border-b border-[#D5DBDB] flex justify-between items-center bg-[#FAFAFA]">
                 <h2 className="font-bold flex items-center gap-2">
                   <LayoutGrid size={16} className="text-gray-400" /> Welcome to AWS
                 </h2>
                 <span className="text-gray-400">⋮</span>
               </div>
               <div className="p-6">
                 <div className="flex items-start gap-4">
                   <div className="text-4xl">🚀</div>
                   <div>
                     <h3 className="font-bold text-[#0073BB] hover:underline cursor-pointer mb-1">Getting started with AWS</h3>
                     <p className="text-sm text-gray-600 mb-2">Learn the fundamentals and explore the platform.</p>
                   </div>
                 </div>
               </div>
             </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">
              
              {/* Applications */}
             <div className="bg-white border border-[#D5DBDB] rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
               <div className="p-4 border-b border-[#D5DBDB] flex justify-between items-start">
                 <div>
                   <h2 className="font-bold flex items-center gap-2 mb-1">
                     <LayoutGrid size={16} className="text-gray-400" /> Applications ({awsResources.length})
                     <span className="text-[11px] font-normal text-[#0073BB] border border-[#0073BB] px-1 rounded-sm cursor-pointer">Info</span>
                   </h2>
                   <p className="text-sm text-gray-600 ml-6">Region: Asia Pacific (Sydney)</p>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => handleSimulate('aws ec2 run-instances')} className="px-4 py-1.5 border border-[#545B64] bg-white text-[#16191F] rounded-full text-sm font-bold hover:bg-gray-50 flex items-center">
                      Create application
                    </button>
                    <span className="text-gray-500 pt-1 px-1 cursor-pointer">⋮</span>
                 </div>
               </div>
               <div className="p-6">
                 <div className="flex gap-4 mb-8 text-sm">
                   <div className="w-[250px]">
                     <label className="text-xs font-bold text-[#545B64] block mb-1">Select Region</label>
                     <select className="w-full border border-[#545B64] rounded pl-2 py-1.5 shadow-sm bg-white">
                        <option>ap-southeast-2 (Current Region)</option>
                     </select>
                   </div>
                   <div className="flex-1 mt-4 relative">
                     <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                     <input type="text" placeholder="Find applications" className="w-full pl-8 py-1.5 border border-[#545B64] rounded shell-sm" />
                   </div>
                 </div>

                 {awsResources.length === 0 ? (
                   <div className="text-center py-12">
                     <h3 className="font-bold mb-1">No applications</h3>
                     <p className="text-sm text-gray-600 mb-4">Get started by creating an application.</p>
                     <button onClick={() => handleSimulate('aws ec2 run-instances')} className="px-4 py-1.5 border border-[#545B64] bg-white text-[#16191F] rounded-full text-sm font-bold shadow-sm hover:bg-gray-50">
                       Create application
                     </button>
                   </div>
                 ) : (
                   <div className="border border-[#D5DBDB] rounded text-[13px]">
                     <table className="w-full text-left">
                       <thead className="bg-[#FAFAFA] border-b border-[#D5DBDB]">
                         <tr>
                           <th className="p-2 font-bold min-w-[120px]">Name</th>
                           <th className="p-2 font-bold">Region</th>
                           <th className="p-2 font-bold">Status</th>
                           <th className="p-2 font-bold text-right">Actions</th>
                         </tr>
                       </thead>
                       <tbody>
                         {awsResources.map(r => (
                           <tr key={r.id} className="border-b border-[#D5DBDB] last:border-0 hover:bg-[#F9F9F9]">
                             <td className="p-2 text-[#0073BB] hover:underline cursor-pointer font-medium">{r.name}</td>
                             <td className="p-2">ap-southeast-2</td>
                             <td className="p-2 font-medium flex items-center gap-1.5">
                               <div className={`w-2.5 h-2.5 rounded-full border ${r.status === 'Running' || r.status === 'Active' ? 'bg-green-500 border-green-700' : 'bg-gray-400 border-gray-500'}`}></div>
                               {r.status}
                             </td>
                             <td className="p-2 text-right space-x-2">
                               <button 
                                 onClick={(e) => { e.stopPropagation(); toggleResource(r.id); }} 
                                 className="text-gray-600 hover:text-[#0073BB] p-1"
                                 title={r.status === 'Running' || r.status === 'Active' ? 'Stop' : 'Start'}
                               >
                                 {r.status === 'Running' || r.status === 'Active' ? <Square size={14} /> : <Play size={14} />}
                               </button>
                               <button 
                                 onClick={(e) => { e.stopPropagation(); setActiveVM(r.id); }} 
                                 className="text-gray-600 hover:text-emerald-500 p-1"
                                 title="Connect/SSH"
                               >
                                 <Terminal size={14} />
                               </button>
                               <button 
                                 onClick={() => deleteResource(r.id)} 
                                 className="text-gray-600 hover:text-red-600 p-1"
                                 title="Delete"
                               >
                                 <Trash2 size={14} />
                               </button>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 )}
               </div>
               <div className="p-3 border-t border-[#D5DBDB] flex items-center justify-center bg-[#FAFAFA] rounded-b-lg">
                 <button className="text-[#16191F] font-bold text-sm bg-white border border-[#D5DBDB] hover:bg-gray-50 rounded-full px-6 py-1 mx-auto flex items-center gap-2">
                   Go to myApplications
                 </button>
               </div>
             </div>

              {/* Bottom Row */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* AWS Health */}
                <div className="bg-white border border-[#D5DBDB] rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                 <div className="p-4 border-b border-[#D5DBDB] flex justify-between items-center bg-[#FAFAFA]">
                   <h2 className="font-bold flex items-center gap-2">
                     <LayoutGrid size={16} className="text-gray-400" /> AWS Health
                     <span className="text-[11px] font-normal text-[#0073BB] border border-[#0073BB] px-1 rounded-sm cursor-pointer">Info</span>
                   </h2>
                 </div>
                 <div className="p-6">
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-xs text-[#545B64] font-medium">Open issues</div>
                      <div className="text-xs text-[#545B64]">Past 7 days</div>
                    </div>
                    <div className="text-[28px] font-medium text-green-700">0</div>
                 </div>
                </div>

                {/* Cost and usage */}
                <div className="bg-white border border-[#D5DBDB] rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                 <div className="p-4 border-b border-[#D5DBDB] flex justify-between items-center">
                   <h2 className="font-bold flex items-center gap-2">
                     <LayoutGrid size={16} className="text-gray-400" /> Cost and usage
                     <span className="text-[11px] font-normal text-[#0073BB] border border-[#0073BB] px-1 rounded-sm cursor-pointer">Info</span>
                   </h2>
                 </div>
                 <div className="p-6">
                    <p className="text-sm text-gray-700 mb-4">Monitor and manage your simulated cloud costs.</p>
                    <div className="border border-gray-200 p-3 rounded">
                      <div className="text-xs text-[#545B64] font-bold uppercase tracking-wide mb-1">Current Month Costs</div>
                      <div className="text-2xl font-normal tracking-tight text-[#16191F]">
                        ${(totalCost * 43200).toFixed(4)}
                      </div>
                    </div>
                 </div>
                </div>

             </div>

          </div>
        </div>
      </div>
      ) : (
        <AWSBilling navigateTo={setActiveTab} />
      )}
      
      {/* Footer Space */}
      <div className="h-8 bg-[#232F3E] text-[#D5DBDB] text-xs flex items-center justify-between px-6 shrink-0 z-50 fixed bottom-0 w-full left-0">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 cursor-pointer hover:text-white" onClick={() => setTerminalOpen(!isTerminalOpen)}><ArrowRight size={12} /> CloudShell</span>
          <span className="cursor-pointer">Feedback</span>
          <span className="font-semibold text-white/50 cursor-pointer">Console Mobile App</span>
        </div>
        <div className="flex gap-4">
          <span>© 2026, Amazon Web Services, Inc. or its affiliates.</span>
          <span className="underline cursor-pointer hover:text-white">Privacy</span>
          <span className="underline cursor-pointer hover:text-white">Terms</span>
          <span className="underline cursor-pointer hover:text-white">Cookie preferences</span>
        </div>
      </div>
      <div className="pb-8"></div>
    </div>
  )
}

export default AWSConsole
