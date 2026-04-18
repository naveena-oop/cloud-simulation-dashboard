import React, { FC } from 'react'
import { useCloudStore } from '../store/useStore'
import {
  Menu, Search, Bell, HelpCircle, User, TerminalSquare, 
  MoreVertical, Cpu, Database, Server, Box, Hexagon, AppWindow, Play, BarChart2, Trash2, Square, Terminal
} from 'lucide-react'
import { GCPBilling } from './GCPBilling'

const GCPConsole: FC = () => {
  const [activeTab, setActiveTab] = React.useState('home')
  const { resources, setTerminalOpen, executeCommand, isTerminalOpen, deleteResource, toggleResource, setActiveVM } = useCloudStore()
  const gcpResources = resources.filter(r => r.provider === 'GCP')
  const totalCost = gcpResources.reduce((acc, r) => acc + r.total_cost, 0)

  const handleSimulate = (cmd: string) => {
    setTerminalOpen(true)
    setTimeout(() => executeCommand('GCP', cmd), 500)
  }

  return (
    <div className="min-h-screen bg-[#F1F3F4] text-[#3C4043] font-sans flex flex-col">
      {/* Top Navbar */}
      <div className="bg-[#1A73E8] text-white h-12 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Menu size={20} className="cursor-pointer opacity-90 hover:opacity-100" />
          <div className="flex items-center gap-2 cursor-pointer group">
            <Hexagon size={18} fill="white" className="text-blue-200" />
            <span className="font-semibold text-lg tracking-tight group-hover:underline">Google Cloud</span>
          </div>

          {/* Project Selector */}
          <div className="flex items-center text-sm font-medium border-l border-white/30 pl-4 ml-2">
            <span className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded">My First Project <span className="text-[10px] ml-1">▼</span></span>
          </div>
        </div>

        <div className="flex-1 max-w-[700px] px-8">
          <div className="bg-white/20 hover:bg-white/30 transition-colors flex items-center h-10 rounded px-4 w-full border border-transparent focus-within:bg-white focus-within:text-[#3C4043] shadow-sm">
            <Search size={18} className="opacity-70 mr-3" />
            <input 
              type="text" 
              placeholder="Search products and resources" 
              className="bg-transparent border-none outline-none w-full text-base placeholder:text-white/80 focus:placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <TerminalSquare size={20} className="cursor-pointer opacity-90 hover:opacity-100" onClick={() => setTerminalOpen(!isTerminalOpen)} />
          <HelpCircle size={20} className="cursor-pointer opacity-90 hover:opacity-100" />
          <Bell size={20} className="cursor-pointer opacity-90 hover:opacity-100" />
          <MoreVertical size={20} className="cursor-pointer opacity-90 hover:opacity-100" />
          <div className="w-8 h-8 bg-[#E8710A] rounded-full flex items-center justify-center text-white ml-2 font-bold cursor-pointer">
            C
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Thin Sidebar */}
        <div className="w-[60px] bg-white border-r border-[#DADCE0] flex flex-col items-center py-4 gap-6 text-[#5F6368] shrink-0 hover:w-[220px] transition-all overflow-hidden whitespace-nowrap group z-10">
           <div className="flex items-center gap-4 w-full px-5 cursor-pointer hover:text-[#1A73E8]" onClick={() => setActiveTab('home')}>
             <AppWindow size={20} className="shrink-0" />
             <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity">Dashboard</span>
           </div>
           <div className="flex items-center gap-4 w-full px-5 cursor-pointer hover:text-[#1A73E8]" onClick={() => setActiveTab('billing')}>
             <BarChart2 size={20} className="shrink-0" />
             <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity">Billing</span>
           </div>
           <div className="border-t border-[#DADCE0] w-full my-1"></div>
           <div className="flex items-center gap-4 w-full px-5 cursor-pointer hover:text-[#202124] hover:bg-[#F1F3F4] py-1" onClick={() => handleSimulate('gcloud compute instances create')}>
             <Cpu size={20} className="shrink-0" />
             <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity text-sm">Compute Engine</span>
           </div>
           <div className="flex items-center gap-4 w-full px-5 cursor-pointer hover:text-[#202124] hover:bg-[#F1F3F4] py-1" onClick={() => handleSimulate('gcloud compute instances create')}>
             <Box size={20} className="shrink-0" />
             <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity text-sm">Cloud Storage</span>
           </div>
           <div className="flex items-center gap-4 w-full px-5 cursor-pointer hover:text-[#202124] hover:bg-[#F1F3F4] py-1">
             <Database size={20} className="shrink-0" />
             <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity text-sm">SQL</span>
           </div>
           <div className="flex items-center gap-4 w-full px-5 cursor-pointer hover:text-[#202124] hover:bg-[#F1F3F4] py-1">
             <Play size={20} className="shrink-0" />
             <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity text-sm">Cloud Run</span>
           </div>
        </div>

        {/* Main Content Area */}
        {activeTab === 'home' ? (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex justify-between items-end mb-6">
            <h1 className="text-[22px] font-normal text-[#202124]">Dashboard</h1>
            <div className="flex gap-2">
               <button className="text-[#1A73E8] font-medium text-sm hover:bg-[#E8F0FE] px-4 py-2 rounded transition-colors">
                 Customize
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Project Info Widget */}
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
              <div className="border-b border-[#DADCE0] px-4 py-3 flex justify-between items-center">
                <h2 className="font-medium text-[#202124]">Project info</h2>
                <MoreVertical size={16} className="text-[#5F6368] cursor-pointer" />
              </div>
              <div className="p-4 space-y-4 text-[13px]">
                <div className="flex flex-col">
                  <span className="text-[#5F6368]">Project name</span>
                  <span className="font-medium text-[#1A73E8] hover:underline cursor-pointer">My First Project</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#5F6368]">Project ID</span>
                  <span className="text-[#202124]">my-project-123456</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#5F6368]">Project number</span>
                  <span className="text-[#202124]">10987654321</span>
                </div>
              </div>
              <div className="border-t border-[#DADCE0] p-3 text-center">
                <span className="text-[#1A73E8] text-sm font-medium hover:underline cursor-pointer">Go to project settings</span>
              </div>
            </div>

            {/* Resources Widget */}
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
              <div className="border-b border-[#DADCE0] px-4 py-3 flex justify-between items-center">
                <h2 className="font-medium text-[#202124]">Resources</h2>
                <MoreVertical size={16} className="text-[#5F6368] cursor-pointer" />
              </div>
              <div className="p-0">
                {gcpResources.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="text-gray-400 text-sm mb-2">No active resources found in this project.</div>
                    <span className="text-[#1A73E8] text-sm font-medium hover:underline cursor-pointer">Try Compute Engine</span>
                  </div>
                ) : (
                  <div className="divide-y divide-[#DADCE0] text-[13px]">
                     {gcpResources.map(r => (
                       <div key={r.id} className="flex items-center gap-3 p-3 hover:bg-[#F8F9FA] cursor-pointer">
                         {r.type === 'VM' ? <Cpu size={16} className="text-[#5F6368]" /> : <Database size={16} className="text-[#5F6368]" />}
                         <div className="flex-1">
                           <div className="text-[#1A73E8] font-medium hover:underline">{r.name}</div>
                           <div className="text-[#5F6368] text-[11px]">{r.type === 'VM' ? 'Compute Engine' : 'Cloud Spanner'}</div>
                         </div>
                         <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${r.status === 'Running' || r.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <span className="text-gray-500 text-[11px] w-12">{r.status}</span>
                         </div>
                         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleResource(r.id); }}
                              className="p-1 hover:bg-gray-200 rounded text-gray-600"
                              title={r.status === 'Running' || r.status === 'Active' ? 'Stop' : 'Start'}
                            >
                              {r.status === 'Running' || r.status === 'Active' ? <Square size={14} /> : <Play size={14} />}
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveVM(r.id); }}
                              className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-emerald-500"
                              title="Connect/SSH"
                            >
                              <Terminal size={14} />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); deleteResource(r.id); }}
                              className="p-1 hover:bg-red-50 rounded text-gray-600 hover:text-red-600"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                         </div>
                       </div>
                     ))}
                  </div>
                )}
              </div>
              <div className="border-t border-[#DADCE0] p-3 text-center bg-[#F8F9FA] rounded-b-lg mt-auto">
                <span className="text-[#1A73E8] text-sm font-medium hover:underline cursor-pointer">All resources</span>
              </div>
            </div>

            {/* Billing Widget */}
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm flex flex-col">
              <div className="border-b border-[#DADCE0] px-4 py-3 flex justify-between items-center">
                 <h2 className="font-medium text-[#202124]">Billing</h2>
                 <MoreVertical size={16} className="text-[#5F6368] cursor-pointer" />
              </div>
              <div className="p-4 flex-1">
                 <div className="text-sm text-[#5F6368] mb-1">Estimated charges</div>
                 <div className="text-[28px] font-normal text-[#202124] mb-4">
                   ${totalCost.toFixed(2)}
                 </div>
                 
                 <div className="h-2 bg-[#E8F0FE] rounded-full overflow-hidden w-full mb-2">
                   <div className="h-full bg-[#1A73E8]" style={{ width: `${Math.min((totalCost / 100) * 100, 100)}%` }}></div>
                 </div>
                 <div className="text-xs text-[#5F6368] flex justify-between">
                    <span>$0.00</span>
                    <span>Budget: $100.00</span>
                 </div>
              </div>
              <div className="border-t border-[#DADCE0] p-3 text-center">
                <span className="text-[#1A73E8] text-sm font-medium hover:underline cursor-pointer" onClick={() => setActiveTab('billing')}>View detailed charges</span>
              </div>
            </div>

            {/* APIs Widget */}
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm md:col-span-2 lg:col-span-3">
               <div className="border-b border-[#DADCE0] px-4 py-3 flex justify-between items-center">
                 <h2 className="font-medium text-[#202124]">APIs</h2>
                 <div className="flex items-center gap-2">
                   <span className="text-[#1A73E8] text-sm font-medium hover:underline cursor-pointer mr-2">Go to APIs overview</span>
                   <MoreVertical size={16} className="text-[#5F6368] cursor-pointer" />
                 </div>
               </div>
               <div className="p-6">
                 <div className="flex items-center justify-between text-sm text-[#5F6368] border-b border-[#DADCE0] pb-2 mb-4">
                   <span className="w-1/3">API</span>
                   <span className="w-1/3 text-right">Requests (past 30 days)</span>
                   <span className="w-1/3 text-right">Errors</span>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="w-1/3 text-[#1A73E8] hover:underline cursor-pointer font-medium">Compute Engine API</span>
                      <span className="w-1/3 text-right text-[#202124]">{gcpResources.filter(r => r.type === 'VM').length * 142}</span>
                      <span className="w-1/3 text-right text-[#202124]">0</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="w-1/3 text-[#1A73E8] hover:underline cursor-pointer font-medium">Cloud Spanner API</span>
                      <span className="w-1/3 text-right text-[#202124]">{gcpResources.filter(r => r.type === 'Database').length * 28}</span>
                      <span className="w-1/3 text-right text-[#202124]">0</span>
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
        ) : (
          <GCPBilling navigateTo={setActiveTab} />
        )}
      </div>
    </div>
  )
}

export default GCPConsole
