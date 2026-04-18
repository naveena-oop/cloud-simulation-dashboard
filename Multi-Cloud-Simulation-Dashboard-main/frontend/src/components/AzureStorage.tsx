import { FC } from 'react'
import { useCloudStore } from '../store/useStore'
import { 
  ChevronRight, Search, Plus, RotateCcw, Download, 
  Settings2, Tag, Trash2, FolderPlus, List, FileText, Database, Server, Move, MessageSquare
} from 'lucide-react'

interface AzureViewProps {
  navigateTo: (tab: string) => void
}

export const AzureStorage: FC<AzureViewProps> = ({ navigateTo }) => {
  const { resources, executeCommand, setTerminalOpen } = useCloudStore()
  const storageAccounts = resources.filter(r => r.provider === 'Azure' && (r.type === 'Storage' || r.type === 'Database'))

  const handleCreate = () => {
    setTerminalOpen(true)
    setTimeout(() => executeCommand('Azure', 'az storage account create --name newstorage --resource-group default'), 500)
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
            <li className="px-4 py-2 hover:bg-[#F3F2F1] cursor-pointer flex items-center gap-2 bg-[#F3F2F1] font-semibold border-l-2 border-[#0078D4]"><List size={16} className="text-[#50E6FF]" /> All storage resources</li>
            <li className="px-4 py-2 mt-2 font-semibold">
              <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Object storage</div>
              </div>
            </li>
            <li className="px-4 py-2 font-semibold">
              <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> File storage</div>
              </div>
            </li>
            <li className="px-4 py-2 font-semibold">
               <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                 <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Block storage</div>
               </div>
            </li>
            <li className="px-4 py-2 font-semibold mt-2">
               <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                 <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Data management</div>
               </div>
            </li>
            <li className="px-4 py-2 font-semibold mt-2">
               <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                 <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Migration</div>
               </div>
            </li>
            <li className="px-4 py-2 font-semibold mt-2">
               <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                 <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Partner solutions</div>
               </div>
            </li>
            <li className="px-4 py-2 font-semibold mt-2">
               <div className="flex justify-between items-center group cursor-pointer hover:bg-[#F3F2F1] p-1 -ml-1">
                 <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500" /> Management services</div>
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
            <span className="font-semibold text-[#323130]">Storage center</span>
          </div>

          {/* Title Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-start gap-3">
              <div className="text-[#0078D4] bg-[#50E6FF]/10 border border-[#0078D4]/20 p-2 mt-1 rounded-sm shadow-sm">
                <Database size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold opacity-90 tracking-tight">Storage center | <span className="font-normal opacity-90">Blob Storage</span></h1>
                <div className="text-[12px] text-gray-500 tracking-wide mt-0.5">Default Directory (rishi06rayapureddihotmail.onmicrosoft.com)</div>
              </div>
            </div>
            {/* AI Chips */}
            <div className="flex items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Copilot_Icon.svg/1024px-Copilot_Icon.svg.png" className="w-5 h-5 ml-2" alt="Copilot" />
              <div className="flex bg-white border border-[#EDEBE9] rounded-full px-3 py-1 text-[12px] hover:bg-[#F3F2F1] cursor-pointer shadow-sm">
                Which storage accounts have unused or inactive containers?
              </div>
              <div className="flex bg-white border border-[#EDEBE9] rounded-full px-3 py-1 text-[12px] hover:bg-[#F3F2F1] cursor-pointer shadow-sm">
                Generate a guide for using Azure storage accounts.
              </div>
              <div className="flex bg-white border border-[#EDEBE9] rounded-full px-3 py-1 text-[12px] hover:bg-[#F3F2F1] cursor-pointer shadow-sm">
                Identify vulnerabilities in storage accounts
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#EDEBE9] mt-6">
            <div className="text-[13px] pb-3 hover:text-[#0078D4] cursor-pointer text-[#605E5C]">Summary</div>
            <div className="text-[13px] pb-3 text-[#0078D4] border-b-2 border-[#0078D4] font-semibold cursor-pointer">Resources</div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-[#EDEBE9] py-2 outline-none w-full relative">
            <div className="flex items-center gap-4 text-[13px]">
              <button onClick={handleCreate} className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Plus size={14}/> Create</button>
              <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><RotateCcw size={14} className="rotate-180" /> Restore</button>
              <span className="w-px h-4 bg-gray-300"></span>
              <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Settings2 size={14} /> Manage view <ChevronRight size={12} className="rotate-90"/></button>
              <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><RotateCcw size={14}/> Refresh</button>
              <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Download size={14}/> Export to CSV</button>
              <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline whitespace-nowrap"><Search size={14}/> Open query</button>
              <span className="w-px h-4 bg-gray-300"></span>
              <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><Tag size={14}/> Assign tags</button>
              <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><Trash2 size={14}/> Delete</button>
              <button className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed whitespace-nowrap"><FolderPlus size={14}/> Add to service group</button>
            </div>
            <div>
               <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline text-[13px]"><List size={14}/> Group by none <ChevronRight size={12} className="rotate-90"/></button>
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
               Resource Group <span className="font-semibold">equals all</span> <span className="ml-1 text-gray-500 hover:text-black">X</span>
             </div>
             <div className="flex items-center gap-1.5 bg-[#F3F2F1] text-[13px] rounded px-3 py-1 cursor-pointer hover:bg-[#EDEBE9] shrink-0 border border-transparent hover:border-gray-300">
               Location <span className="font-semibold">equals all</span> <span className="ml-1 text-gray-500 hover:text-black">X</span>
             </div>
             <button className="flex items-center gap-1.5 text-[#0078D4] hover:underline text-[13px] shrink-0 ml-2"><Plus size={14}/> Add filter</button>
          </div>
        </div>

        {/* Dynamic Content or Empty State */}
        {storageAccounts.length > 0 ? (
          <div className="flex-1 w-full text-[13px] text-[#323130]">
             <div className="grid grid-cols-[3fr_2fr_2fr_1fr] font-semibold text-gray-600 border-b border-[#EDEBE9] py-2 px-6">
                <div>Name</div>
                <div>Status</div>
                <div>Provider</div>
                <div>Location</div>
             </div>
             {storageAccounts.map(account => (
                <div key={account.id} className="grid grid-cols-[3fr_2fr_2fr_1fr] border-b border-[#EDEBE9] py-3 px-6 hover:bg-[#F3F2F1] items-center cursor-pointer">
                   <div className="flex items-center gap-3 font-medium text-[#0078D4]">
                     <Database size={16} className="text-[#0078D4]" />
                     <span className="hover:underline">{account.name}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${account.status === 'Running' || account.status === 'Active' ? 'bg-[#107C10]' : 'bg-gray-400'}`}></div>
                     {account.status}
                   </div>
                   <div>{account.provider}</div>
                   <td>East US</td>
                </div>
             ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
            <div className="mb-6 opacity-80 mt-[-60px]">
              <svg width="84" height="84" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24V40H52V24H12Z" fill="#E1DFDD" />
                <path d="M12 24H52V30H12V24Z" fill="#C8C6C4" />
                <rect x="20" y="34" width="24" height="2" fill="white" />
              </svg>
            </div>
            <h2 className="text-[20px] font-semibold text-[#323130] mb-3">No storage accounts to display</h2>
            <p className="text-[13px] text-[#605E5C] max-w-[800px] mb-8 leading-relaxed">
              Create a storage account to store up to 500TB of data in the cloud. Use a general-purpose storage account to store object data, use a NoSQL data store, define and use queues for message processing, and set up file shares in the cloud. Use the Blob storage account and the hot or cool access tiers to optimize your costs based on how frequently your object data is accessed.
            </p>
            <button onClick={handleCreate} className="bg-[#0078D4] text-white hover:bg-[#106EBE] shadow-sm flex items-center gap-2 px-6 py-1.5 rounded-sm font-semibold text-[13px] mb-4">
               <Plus size={16} /> Create
            </button>
            <a href="#" className="text-[#0078D4] hover:underline text-[13px]">Learn more</a>
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#EDEBE9] p-2 mt-auto text-[12px] bg-white text-[#605E5C]">
          <div className="flex items-center gap-2">
            Showing 1 - {storageAccounts.length} of {storageAccounts.length}. Display count: 
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
