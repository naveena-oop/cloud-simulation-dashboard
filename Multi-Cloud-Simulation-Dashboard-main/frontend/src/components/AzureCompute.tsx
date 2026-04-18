import { FC } from 'react'
import { useCloudStore } from '../store/useStore'
import { 
  ChevronRight, Search, Plus, RotateCcw, Download, 
  Settings2, Tag, Trash2, List, FileText, Monitor, Square, ShieldAlert,
  Play, Square as StopSquare, ChevronDown, MonitorPlay, MessageSquare, Terminal
} from 'lucide-react'

interface AzureViewProps {
  navigateTo: (tab: string) => void
}

export const AzureCompute: FC<AzureViewProps> = ({ navigateTo }) => {
  const { resources, executeCommand, setTerminalOpen, deleteResource, toggleResource, setActiveVM } = useCloudStore()
  const vms = resources.filter(r => r.provider === 'Azure' && r.type === 'VM')

  const handleCreate = () => {
    setTerminalOpen(true)
    setTimeout(() => executeCommand('Azure', 'az vm create --name newvm --resource-group default --image Ubuntu2204'), 500)
  }

  return (
    <div className="flex bg-white text-[#323130] min-h-[calc(100vh-48px)] font-sans">
      {/* Left Sidebar */}
      <div className="w-[240px] border-r border-[#EDEBE9] shrink-0 pt-4 flex flex-col bg-white">
        <div className="px-4 mb-2">
          <div className="relative">
            <Search className="absolute left-2 top-1.5 text-gray-500" size={14} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full border border-gray-300 rounded-sm pl-7 py-1 text-xs focus:outline-none focus:border-[#0078D4]"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <ul className="text-[13px]">
            <li className="px-4 py-2 hover:bg-[#F3F2F1] cursor-pointer flex items-center gap-2 text-[#0078D4]"><FileText size={16} /> Overview</li>
            <li className="px-4 py-2 hover:bg-[#F3F2F1] cursor-pointer flex items-center gap-2 text-[#7FBA00]"><List size={16} /> All resources</li>
            
            <li className="px-4 py-2 mt-2 font-semibold">
              <div className="flex items-center gap-1 cursor-pointer">
                <ChevronRight size={14} className="text-gray-500 rotate-90" /> Infrastructure
              </div>
            </li>
            
            <li className="pl-8 pr-4 py-2 hover:bg-[#F3F2F1] cursor-pointer flex items-center gap-2 bg-[#F3F2F1] font-semibold border-l-2 border-[#0078D4] ml-[-2px]"><Monitor size={16} className="text-[#0078D4]" /> Virtual machines</li>
            <li className="pl-8 pr-4 py-2 hover:bg-[#F3F2F1] cursor-pointer flex items-center gap-2 text-[#0078D4]"><Square size={16} /> Virtual Machine Scale Set...</li>
            <li className="pl-8 pr-4 py-2 hover:bg-[#F3F2F1] cursor-pointer flex items-center gap-2 text-[#0078D4]"><MonitorPlay size={16} /> Compute Fleet</li>
            <li className="pl-8 pr-4 py-2 hover:bg-[#F3F2F1] cursor-pointer flex items-center gap-2 text-[#0078D4]"><Monitor size={16} /> Arc Machines</li>

            <li className="px-4 py-2 font-semibold mt-2">
               <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                 <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Disks + images</div>
               </div>
            </li>
            <li className="px-4 py-2 font-semibold mt-2">
               <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                 <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Capacity + placement</div>
               </div>
            </li>
            <li className="px-4 py-2 font-semibold mt-2">
               <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                 <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Related services</div>
               </div>
            </li>
            <li className="px-4 py-2 font-semibold mt-2">
               <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                 <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Monitoring+Operations</div>
               </div>
            </li>
            <li className="px-4 py-2 font-semibold mt-2">
               <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                 <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Help</div>
               </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white flex flex-col min-w-0">
        <div className="px-6 pt-4 pb-2">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 mb-3 text-[13px] text-[#605E5C]">
            <span className="hover:underline cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
            <ChevronRight size={12} />
            <span className="hover:underline cursor-pointer">Compute infrastructure</span>
          </div>

          {/* Title Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-start gap-3">
              <div className="text-white bg-[#0078D4] p-1 mt-1 rounded-sm shadow-sm inline-flex">
                <Monitor size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold opacity-90 tracking-tight">Compute infrastructure | <span className="font-normal opacity-90">Virtual machines</span></h1>
                <div className="text-[12px] text-gray-500 tracking-wide mt-0.5">Microsoft</div>
              </div>
            </div>
            {/* AI Chips */}
            <div className="flex items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Copilot_Icon.svg/1024px-Copilot_Icon.svg.png" className="w-5 h-5 ml-2" alt="Copilot" />
              <div className="flex bg-white border border-[#EDEBE9] rounded-full px-3 py-1 text-[12px] hover:bg-[#F3F2F1] cursor-pointer shadow-sm">
                Check which VMs cannot access the internet
              </div>
              <div className="flex bg-white border border-[#EDEBE9] rounded-full px-3 py-1 text-[12px] hover:bg-[#F3F2F1] cursor-pointer shadow-sm">
                View virtual machines with critical alerts
              </div>
              <div className="flex bg-white border border-[#EDEBE9] rounded-full px-3 py-1 text-[12px] hover:bg-[#F3F2F1] cursor-pointer shadow-sm">
                Get workload templates for VMs
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#EDEBE9] mt-6">
            <div className="text-[13px] pb-3 text-[#0078D4] border-b-2 border-[#0078D4] font-semibold cursor-pointer">Virtual machines</div>
            <div className="text-[13px] pb-3 hover:text-[#0078D4] cursor-pointer text-[#605E5C]">Get started</div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#EDEBE9] py-2 outline-none w-full relative">
            <div className="flex items-center gap-4 text-[13px]">
              <button onClick={handleCreate} className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Plus size={14}/> Create <ChevronDown size={14}/></button>
              <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Play size={14} className="rotate-90 text-transparent border border-[#0078D4] rounded-sm bg-[#50E6FF]/20" style={{borderStyle: 'dashed'}}/> Reservations <ChevronDown size={14}/></button>
              <span className="w-px h-4 bg-gray-300"></span>
              <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Settings2 size={14} /> Manage view <ChevronDown size={14}/></button>
              <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><RotateCcw size={14}/> Refresh</button>
              <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Download size={14}/> Export to CSV</button>
              <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Search size={14}/> Open query</button>
              <span className="w-px h-4 bg-gray-300"></span>
              <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><Tag size={14}/> Assign tags</button>
              <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><Play size={14}/> Start</button>
              <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><RotateCcw size={14}/> Restart</button>
              <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><StopSquare size={14}/> Stop</button>
              <button className="flex items-center gap-0.5 text-gray-400 cursor-not-allowed whitespace-nowrap">...</button>
            </div>
            <div>
               <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline text-[13px]"><List size={14}/> Group by none <ChevronDown size={14}/></button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
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
               Type <span className="font-semibold">equals all</span>
             </div>
             <div className="flex items-center gap-1.5 bg-[#F3F2F1] text-[13px] rounded px-3 py-1 cursor-pointer hover:bg-[#EDEBE9] shrink-0 border border-transparent hover:border-gray-300">
               Resource Group <span className="font-semibold">equals all</span> <span className="ml-1 text-gray-500 hover:text-black">X</span>
             </div>
             <div className="flex items-center gap-1.5 bg-[#F3F2F1] text-[13px] rounded px-3 py-1 cursor-pointer hover:bg-[#EDEBE9] shrink-0 border border-transparent hover:border-gray-300">
               Location <span className="font-semibold">equals all</span> <span className="ml-1 text-gray-500 hover:text-black">X</span>
             </div>
             <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline text-[13px] shrink-0 ml-2"><Plus size={14}/> Add filter</button>
          </div>
        </div>

        {/* Dynamic Content or Empty State */}
        {vms.length > 0 ? (
          <div className="flex-1 w-full text-[13px] text-[#323130]">
             <div className="grid grid-cols-[3fr_2fr_2fr_1fr_1fr] font-semibold text-gray-600 border-b border-[#EDEBE9] py-2 px-6">
                <div>Name</div>
                <div>Status</div>
                <div>Provider</div>
                <div>Location</div>
                <div className="text-right">Actions</div>
             </div>
             {vms.map(vm => (
                <div key={vm.id} className="grid grid-cols-[3fr_2fr_2fr_1fr_1fr] border-b border-[#EDEBE9] py-3 px-6 hover:bg-[#F3F2F1] items-center cursor-pointer">
                   <div className="flex items-center gap-3 font-medium text-[#0078D4]">
                     <Monitor size={16} className="text-[#0078D4]" />
                     <span className="hover:underline">{vm.name}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${vm.status === 'Running' || vm.status === 'Active' ? 'bg-[#107C10]' : 'bg-gray-400'}`}></div>
                     {vm.status}
                   </div>
                   <div>{vm.provider}</div>
                   <div>East US</div>
                   <div className="flex justify-end space-x-3 text-gray-500">
                     <button
                       onClick={(e) => { e.stopPropagation(); toggleResource(vm.id); }}
                       className="hover:text-[#0078D4]"
                       title={vm.status === 'Running' || vm.status === 'Active' ? 'Stop' : 'Start'}
                     >
                       {vm.status === 'Running' || vm.status === 'Active' ? <StopSquare size={16} /> : <Play size={16} />}
                     </button>
                     <button
                       onClick={(e) => { e.stopPropagation(); setActiveVM(vm.id); }}
                       className="hover:text-emerald-500"
                       title="Connect/SSH"
                     >
                       <Terminal size={16} />
                     </button>
                     <button
                       onClick={(e) => { e.stopPropagation(); deleteResource(vm.id); }}
                       className="hover:text-red-600"
                       title="Delete"
                     >
                       <Trash2 size={16} />
                     </button>
                   </div>
                </div>
             ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
            <div className="mb-6 mt-[-60px]">
              <svg width="84" height="84" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 20H48V40H16V20Z" fill="#C8C6C4" />
                <path d="M28 40H36V48H28V40Z" fill="#A19F9D" />
                <path d="M20 48H44V52H20V48Z" fill="#797775" />
                <path d="M12 16H52V44H12V16Z" fill="#E1DFDD" />
                <rect x="28" y="24" width="8" height="8" fill="#FFFFFF" />
                <path d="M32 24L38 27V33L32 36L26 33V27L32 24Z" fill="#A19F9D" />
              </svg>
            </div>
            <h2 className="text-[20px] font-semibold text-[#323130] mb-3">No virtual machines to display</h2>
            <p className="text-[13px] text-[#605E5C] max-w-[600px] mb-8 leading-relaxed">
              Create a virtual machine that runs Linux or Windows. Select an image from the marketplace or use your own customized image.
            </p>
            <div className="flex justify-center mb-6">
               <button onClick={handleCreate} className="bg-[#0078D4] text-white hover:bg-[#106EBE] shadow-sm flex items-center justify-center gap-2 px-4 py-1.5 rounded-sm font-semibold text-[13px]">
                 <Plus size={16} /> Create <ChevronDown size={14} className="ml-1 opacity-80" />
               </button>
            </div>
            
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[#0078D4] hover:underline text-[13px]">Learn more about Windows virtual machines</a>
              <a href="#" className="text-[#0078D4] hover:underline text-[13px]">Learn more about Linux virtual machines</a>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#EDEBE9] p-2 mt-auto text-[12px] bg-white text-[#605E5C]">
          <div className="flex items-center gap-2">
            Showing 1 - {vms.length} of {vms.length}. Display count: 
            <select className="border border-gray-300 rounded px-1 min-w-[50px] outline-none bg-white">
              <option>auto</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5 text-[#0078D4] hover:underline cursor-pointer">
            <MessageSquare size={14} /> Give feedback
          </div>
        </div>
      </div>
    </div>
  )
}
