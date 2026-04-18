import { FC } from 'react'
import { useCloudStore } from '../store/useStore'
import { 
  ChevronRight, Search, Plus, RotateCcw, Download, 
  Settings2, Tag, Trash2, FolderPlus, List, Zap, Star, MessageSquare
} from 'lucide-react'

interface AzureViewProps {
  navigateTo: (tab: string) => void
}

export const AzureFunctionApp: FC<AzureViewProps> = ({ navigateTo }) => {
  const { setTerminalOpen, executeCommand } = useCloudStore()

  const handleCreate = () => {
    setTerminalOpen(true)
    setTimeout(() => executeCommand('Azure', 'az functionapp create --name newfuncapp --resource-group default --consumption-plan-location eastus'), 500)
  }

  return (
    <div className="flex flex-col bg-white text-[#323130] min-h-[calc(100vh-48px)] font-sans">
      <div className="px-6 pt-4 pb-2 flex-1 flex flex-col">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 mb-3 text-[13px] text-[#605E5C]">
          <span className="hover:underline cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
          <ChevronRight size={12} />
          <span className="hover:underline cursor-pointer">Function App</span>
        </div>

        {/* Title Row */}
        <div className="flex flex-wrap items-center justify-between mb-2 gap-4">
          <div className="flex items-start gap-4">
            <h1 className="text-2xl font-semibold opacity-90 tracking-tight flex items-center gap-3">
              Function App <Star size={16} className="text-gray-400 cursor-pointer hover:text-gray-600 outline-none" fill="transparent" />
            </h1>
          </div>
          {/* AI Chips */}
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Copilot_Icon.svg/1024px-Copilot_Icon.svg.png" className="w-5 h-5" alt="Copilot" />
            <div className="flex bg-white border border-[#EDEBE9] rounded-full px-3 py-1 text-[12px] hover:bg-[#F3F2F1] cursor-pointer shadow-sm">
              Diagnose issues for selected web apps
            </div>
            <div className="flex bg-white border border-[#EDEBE9] rounded-full px-3 py-1 text-[12px] hover:bg-[#F3F2F1] cursor-pointer shadow-sm">
              Run memory dump tool for apps
            </div>
            <div className="flex bg-white border border-[#EDEBE9] rounded-full px-3 py-1 text-[12px] hover:bg-[#F3F2F1] cursor-pointer shadow-sm">
              Identify apps with high CPU usage
            </div>
          </div>
        </div>
        
        <div className="text-[12px] text-gray-500 tracking-wide mb-6">Default Directory (rishi06rayapureddihotmail.onmicrosoft.com)</div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#EDEBE9] py-2 outline-none w-full relative">
          <div className="flex items-center gap-4 text-[13px]">
            <button onClick={handleCreate} className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Plus size={14}/> Create</button>
            <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Settings2 size={14} /> Manage view <ChevronRight size={12} className="rotate-90"/></button>
            <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><RotateCcw size={14} /> Refresh</button>
            <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Download size={14}/> Export to CSV</button>
            <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Search size={14}/> Open query</button>
            <span className="w-px h-4 bg-gray-300"></span>
            <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><Tag size={14}/> Assign tags</button>
            <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-gray-400 ml-1"></div> Start</button>
            <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><RotateCcw size={14}/> Restart</button>
            <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><div className="w-3 h-3 bg-gray-400"></div> Stop</button>
            <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><Trash2 size={14}/> Delete</button>
            <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><FolderPlus size={14}/> Add to service group</button>
          </div>
          <div>
             <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline text-[13px]"><List size={14}/> Group by none <ChevronRight size={12} className="rotate-90"/></button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto border-b border-[#EDEBE9]">
           <div className="relative shrink-0">
             <Search className="absolute left-2 top-1.5 text-[#0078D4]" size={14} />
             <input 
               type="text" 
               placeholder="Filter for any field..." 
               className="border border-[#797775] rounded pl-7 py-1 text-[13px] w-[200px] outline-none hover:border-[#323130] focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4]"
             />
           </div>
           
           <div className="flex items-center gap-1.5 bg-[#F3F2F1] text-[13px] rounded px-3 py-1 cursor-pointer hover:bg-[#EDEBE9] shrink-0 border border-transparent hover:border-gray-300">
             Subscription <span className="font-semibold">equals all</span>
           </div>
           <div className="flex items-center gap-1.5 bg-[#F3F2F1] text-[13px] rounded px-3 py-1 cursor-pointer hover:bg-[#EDEBE9] shrink-0 border border-transparent hover:border-gray-300">
             Resource Group <span className="font-semibold">equals all</span> <span className="ml-1 text-gray-500 hover:text-black">X</span>
           </div>
           <div className="flex items-center gap-1.5 bg-[#F3F2F1] text-[13px] rounded px-3 py-1 cursor-pointer hover:bg-[#EDEBE9] shrink-0 border border-transparent hover:border-gray-300">
             Location <span className="font-semibold">equals all</span> <span className="ml-1 text-gray-500 hover:text-black">X</span>
           </div>
           <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline text-[13px] shrink-0 ml-2"><Plus size={14}/> Add filter</button>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
          <div className="mb-6 opacity-40 mt-[-60px]">
             {/* Function App Icon Custom SVG */}
             <svg width="84" height="84" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 4L12 36H28V60L48 24H32L30 4Z" fill="#323130" />
                <path d="M34 10L20 34H32V52L44 26H34V10Z" fill="#797775" />
             </svg>
          </div>
          <h2 className="text-[20px] font-semibold text-[#323130] mb-3">No function apps to display</h2>
          <p className="text-[13px] text-[#605E5C] max-w-[650px] mb-8 leading-relaxed">
            Create, build, deploy, and manage powerful web, mobile, and API apps for employees or customers using a single back-end. Build standards-based web apps and APIs using .NET, Java, Node.js, PHP, and Python.
          </p>
          <div className="flex justify-center mb-4">
             <button onClick={handleCreate} className="bg-[#0078D4] text-white hover:bg-[#106EBE] shadow-sm flex items-center justify-center gap-2 px-6 py-1.5 rounded-sm font-semibold text-[13px]">
               <Plus size={16} /> Create
             </button>
          </div>
          <a href="#" className="text-[#0078D4] hover:underline text-[13px]">Learn more about App Service</a>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[#EDEBE9] p-2 text-[12px] bg-white text-[#605E5C]">
        <div className="flex items-center gap-2">
          Showing 1 - 0 of 0. Display count: 
          <select className="border border-gray-300 rounded px-1 min-w-[50px] outline-none bg-white">
            <option>auto</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5 text-[#0078D4] hover:underline cursor-pointer">
          <MessageSquare size={14} /> Give feedback
        </div>
      </div>
    </div>
  )
}
