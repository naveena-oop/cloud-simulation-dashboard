import { FC, useState } from 'react'
import { useCloudStore } from '../store/useStore'
import { AzureBilling } from './AzureBilling'
import { AzureStorage } from './AzureStorage'
import { AzureCompute } from './AzureCompute'
import { AzureFunctionApp } from './AzureFunctionApp'
import { AzureAppServices } from './AzureAppServices'
import { 
  Menu, Search, Bell, Settings, HelpCircle, MessageSquare, User,
  Plus, DollarSign, Database, Monitor, Server, Cloud, Boxes, LayoutGrid, ChevronRight
} from 'lucide-react'

const AzurePortal: FC = () => {
  const [activeTab, setActiveTab] = useState('home')
  const { resources, setTerminalOpen, executeCommand } = useCloudStore()
  const azureResources = resources.filter(r => r.provider === 'Azure')

  const handleSimulate = (cmd: string) => {
    setTerminalOpen(true)
    setTimeout(() => executeCommand('Azure', cmd), 500)
  }

  const navigateTo = (tab: string) => {
    setActiveTab(tab)
  }

  // Home View Component (Original Azure Portal Dashboard)
  const renderHome = () => (
    <div className="flex-1 p-8 max-w-[1200px] w-full mx-auto">
      <h2 className="text-xl font-semibold mb-6">Azure services</h2>
      
      {/* Services Row */}
      <div className="flex flex-wrap gap-8 mb-12 select-none">
        <div className="flex flex-col items-center cursor-pointer group" onClick={() => handleSimulate('az resource create')}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-[#0078D4] mb-2 group-hover:scale-105 transition-transform">
            <Plus size={36} strokeWidth={1} />
          </div>
          <span className="text-xs text-center font-medium leading-tight text-[#0078D4]">Create a<br/>resource</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer group" onClick={() => navigateTo('billing')}>
          <div className="w-14 h-14 flex items-center justify-center text-[#7FBA00] mb-2 group-hover:scale-105 transition-transform">
            <DollarSign size={38} strokeWidth={1.5} />
          </div>
          <span className="text-xs text-center font-medium leading-tight">Cost<br/>Management</span>
        </div>

        <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => navigateTo('storage')}>
          <div className="w-14 h-14 bg-[#50E6FF]/10 text-[#0078D4] border-b-4 border-[#0078D4] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
            <Database size={28} />
          </div>
          <span className="text-xs text-center font-medium leading-tight">Storage<br/>accounts</span>
        </div>

        <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => navigateTo('compute')}>
          <div className="w-14 h-14 rounded bg-[#0078D4] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
            <Monitor size={28} />
          </div>
          <span className="text-xs text-center font-medium leading-tight">Virtual<br/>machines</span>
        </div>

        <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => navigateTo('functionapp')}>
          <div className="w-14 h-14 bg-[#399918] text-white rounded-md flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
            <Boxes size={28} />
          </div>
          <span className="text-xs text-center font-medium leading-tight">Function App</span>
        </div>

        <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => navigateTo('appservices')}>
          <div className="w-14 h-14 bg-[#0078D4]/10 text-[#0078D4] rounded-full flex items-center justify-center border-2 border-[#0078D4] group-hover:scale-105 transition-transform shadow-sm">
            <Cloud size={24} />
          </div>
          <span className="text-xs text-center font-medium leading-tight">App Services</span>
        </div>

        <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => navigateTo('billing')}>
          <div className="w-14 h-14 rounded-full bg-[#FFB900] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
            <Server size={24} />
          </div>
          <span className="text-xs text-center font-medium leading-tight">Subscriptions</span>
        </div>

        <div className="flex flex-col items-center gap-2 cursor-pointer group flex-1 justify-center max-w-[80px]">
          <div className="w-14 h-14 text-[#0078D4] flex items-center justify-center group-hover:scale-105 transition-transform hover:translate-x-1">
            <LayoutGrid size={32} strokeWidth={1} />
          </div>
          <span className="text-xs text-center text-[#0078D4] font-medium leading-tight">More services</span>
        </div>
      </div>

      {/* Resources Section */}
      <h2 className="text-xl font-semibold mb-4 text-[#201F1E]">Resources</h2>
      
      <div className="flex border-b border-[#EDEBE9] mb-4">
        <button className="px-4 py-2 border-b-2 border-[#0078D4] text-[#0078D4] font-semibold text-sm">Recent</button>
        <button className="px-4 py-2 border-b-2 border-transparent hover:bg-gray-50 text-gray-600 font-semibold text-sm">Favorite</button>
      </div>

      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-[3fr_2fr_1fr] text-[13px] font-semibold text-gray-600 border-b border-[#EDEBE9] pb-2 px-2">
          <div>Name</div>
          <div>Type</div>
          <div>Last Viewed</div>
        </div>
        
        {/* Table Body */}
        <div className="text-[13px] text-[#323130]">
          {azureResources.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No recent resources found.</div>
          ) : (
            azureResources.map(resource => (
              <div key={resource.id} className="grid grid-cols-[3fr_2fr_1fr] border-b border-[#EDEBE9] py-3 px-2 hover:bg-[#F3F2F1] cursor-pointer items-center">
                <div className="flex items-center gap-3 font-medium text-[#0078D4]">
                  {resource.type === 'VM' ? <Monitor size={16} className="text-[#0078D4]" /> : 
                    resource.type === 'Database' ? <Database size={16} className="text-[#0078D4]" /> : 
                    <Server size={16} className="text-[#0078D4]" />}
                  <span className="hover:underline">{resource.name}</span>
                </div>
                <div className="capitalize">{resource.type === 'VM' ? 'Virtual machine' : resource.type}</div>
                <div className="text-gray-500">Just now</div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-4">
            <button className="text-[#0078D4] text-sm hover:underline font-semibold">See all</button>
        </div>
      </div>
    </div>
  )

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home': return renderHome()
      case 'billing': return <AzureBilling navigateTo={navigateTo} />
      case 'storage': return <AzureStorage navigateTo={navigateTo} />
      case 'compute': return <AzureCompute navigateTo={navigateTo} />
      case 'functionapp': return <AzureFunctionApp navigateTo={navigateTo} />
      case 'appservices': return <AzureAppServices navigateTo={navigateTo} />
      default: return renderHome()
    }
  }

  return (
    <div className="min-h-[100vh] bg-white text-[#111827] font-sans flex flex-col pt-12">
      {/* Top Navbar */}
      <div className="bg-[#0078D4] text-white h-12 flex items-center px-4 justify-between fixed top-0 w-full z-50">
        <div className="flex items-center gap-4">
          <Menu size={20} className="cursor-pointer opacity-80 hover:opacity-100" />
          <span 
            className={`font-semibold text-[15px] tracking-wide cursor-pointer hover:underline ${activeTab !== 'home' ? 'mr-1' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Microsoft Azure
          </span>
        </div>

        <div className="flex-1 max-w-[600px] px-8">
          <div className="bg-white/20 hover:bg-white/30 transition-colors flex items-center h-8 rounded px-2 w-full border border-transparent focus-within:bg-white focus-within:text-black">
            <Search size={14} className="opacity-70 mr-2" />
            <input 
              type="text" 
              placeholder="Search resources, services, and docs (G+/)" 
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-white/70 focus:placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 opacity-90">
          <MessageSquare size={16} className="cursor-pointer hover:opacity-100" />
          <Settings size={16} className="cursor-pointer hover:opacity-100" />
          <HelpCircle size={16} className="cursor-pointer hover:opacity-100" />
          <Bell size={16} className="cursor-pointer hover:opacity-100" />
          <div className="w-7 h-7 bg-[#c1c1c1] rounded-full flex items-center justify-center text-[#333] ml-2 font-bold text-xs uppercase overflow-hidden cursor-pointer">
            <User size={16} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {renderActiveTab()}
    </div>
  )
}

export default AzurePortal
