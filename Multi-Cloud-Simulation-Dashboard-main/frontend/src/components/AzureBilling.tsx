import { FC } from 'react'
import { CheckCircle2, ChevronRight, MessageSquare, Search } from 'lucide-react'

interface AzureViewProps {
  navigateTo: (tab: string) => void
}

export const AzureBilling: FC<AzureViewProps> = ({ navigateTo }) => {
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
            <li className="px-4 py-2 hover:bg-[#F3F2F1] cursor-pointer bg-[#F3F2F1] font-semibold border-l-2 border-[#0078D4]">Overview</li>
            <li className="px-4 py-2 hover:bg-[#F3F2F1] cursor-pointer">Access control (IAM)</li>
            <li className="px-4 py-2 hover:bg-[#F3F2F1] cursor-pointer">Billing scopes</li>
            <li className="px-4 py-2 hover:bg-[#F3F2F1] cursor-pointer">Diagnose and solve problems</li>
            
            <li className="px-4 py-2 mt-2 font-semibold">
              <div className="flex justify-between items-center group cursor-pointer">
                Cost management <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
              </div>
            </li>
            <li className="px-4 py-2 font-semibold">
              <div className="flex justify-between items-center group cursor-pointer">
                Billing <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
              </div>
            </li>
            <li className="px-4 py-2 font-semibold">
              <div className="flex justify-between items-center group cursor-pointer">
                Products + services <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
              </div>
            </li>
            <li className="px-4 py-2 mt-2 font-semibold">
              <div className="flex justify-between items-center group cursor-pointer">
                Settings <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
              </div>
            </li>
            <li className="px-4 py-2 font-semibold">
              <div className="flex justify-between items-center group cursor-pointer">
                Support + troubleshooting <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#FAF9F8] overflow-y-auto p-6">
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-4 text-[#0078D4] text-sm">
            <span className="hover:underline cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
            <ChevronRight size={14} className="text-gray-500" />
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#0078D4] text-white p-1 rounded-sm">
              <div className="border border-white/50 w-5 h-5 flex items-center justify-center font-bold text-xs">$</div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold opacity-90">Rishi Rayapureddi</h1>
              <span className="text-xs text-gray-500">Billing account</span>
            </div>
          </div>
        </div>

        <div className="flex gap-6 border-b border-[#EDEBE9] mb-6">
          <div className="text-[13px] pb-3 hover:text-[#0078D4] cursor-pointer">Get started</div>
          <div className="text-[13px] pb-3 text-[#0078D4] border-b-2 border-[#0078D4] font-semibold cursor-pointer">Summary</div>
          <div className="text-[13px] pb-3 hover:text-[#0078D4] cursor-pointer">Tutorials & What's new</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Amount Due Card */}
          <div className="bg-white border border-[#EDEBE9] p-5 shadow-sm col-span-1 rounded-sm flex flex-col justify-between">
            <div>
              <h3 className="text-[13px] font-semibold mb-6">Amount due</h3>
              <div className="text-[42px] font-light leading-none mb-4">₹0.00</div>
              <div className="flex items-center gap-1.5 text-sm text-[#107C10] font-medium">
                <CheckCircle2 size={16} className="fill-[#107C10] text-white" /> No payment needed
              </div>
            </div>
            <div className="mt-8">
              <button className="text-[13px] border border-gray-300 px-3 py-1 bg-[#F3F2F1] hover:bg-[#EDEBE9] transition-colors rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)]">View invoices</button>
            </div>
          </div>

          {/* Upcoming Invoices Card */}
          <div className="bg-white border border-[#EDEBE9] p-5 shadow-sm col-span-1 rounded-sm text-[13px]">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="font-semibold">Upcoming invoices</h3>
              <div className="w-3.5 h-3.5 rounded-full border border-gray-400 text-gray-400 flex items-center justify-center text-[10px]">i</div>
            </div>

            <div className="mb-6">
              <div className="text-gray-500 mb-2">Available on 4/9/2026</div>
              <div className="flex justify-between">
                <div>
                  <div className="text-gray-600">Billing period</div>
                  <div className="font-semibold">3/1/2026 - 3/31/2026</div>
                </div>
                <div>
                  <div className="text-gray-600 flex items-center gap-1">Pre-tax total so far <span className="w-3.5 h-3.5 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">i</span></div>
                  <div className="font-semibold">₹63.52</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-gray-500 mb-2">Available on 5/9/2026</div>
              <div className="flex justify-between">
                <div>
                  <div className="text-gray-600">Billing period</div>
                  <div className="font-semibold">4/1/2026 - 4/30/2026</div>
                </div>
                <div>
                  <div className="text-gray-600 flex items-center gap-1">Pre-tax total so far <span className="w-3.5 h-3.5 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">i</span></div>
                  <div className="font-semibold">₹0.00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoices Over Time */}
          <div className="bg-white border border-[#EDEBE9] p-5 shadow-sm col-span-1 rounded-sm text-[13px]">
            <h3 className="font-semibold mb-6">Invoices over time</h3>
            
            <div className="relative h-[120px] mb-4">
               {/* Y-axis labels */}
               <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[11px] text-gray-400 pb-5">
                 <span>100</span>
                 <span>80</span>
                 <span>60</span>
                 <span>40</span>
                 <span>20</span>
                 <span>0</span>
               </div>
               
               {/* Grid lines */}
               <div className="absolute left-6 right-0 top-1.5 bottom-5 flex flex-col justify-between">
                 <div className="border-t border-gray-200"></div>
                 <div className="border-t border-gray-200"></div>
                 <div className="border-t border-gray-200"></div>
                 <div className="border-t border-gray-200"></div>
                 <div className="border-t border-gray-200"></div>
                 <div className="border-t border-gray-200"></div>
               </div>
               
               {/* X-axis labels */}
               <div className="absolute left-6 right-0 bottom-0 flex justify-around text-[11px] text-gray-400">
                  <span>12/25</span>
                  <span>01/26</span>
                  <span>02/26</span>
               </div>
            </div>

            <div className="border-l-4 border-[#0078D4] pl-3 py-1">
              <div className="text-xs text-[#0078D4] font-semibold">Total amount</div>
              <div className="text-[28px] font-light leading-none mt-1">₹0.00</div>
            </div>
          </div>

          {/* Spending rate and forecast */}
          <div className="bg-white border border-[#EDEBE9] p-5 shadow-sm col-span-1 rounded-sm">
            <h3 className="text-[13px] font-semibold mb-6">Spending rate and forecast</h3>
            <div className="h-[120px] flex items-center justify-center">
              <div className="border border-gray-200 px-6 py-4 w-[90%] text-center text-[13px] text-gray-500 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                 No charges reported this month
              </div>
            </div>
          </div>

          {/* Top products by charges */}
          <div className="bg-white border border-[#EDEBE9] p-5 shadow-sm col-span-1 rounded-sm">
             <h3 className="text-[13px] font-semibold mb-6">This month's top products by charges</h3>
             <div className="relative h-[120px] flex items-center justify-center">
                 {/* Circle Chart Placeholder */}
                 <div className="absolute w-[180px] h-[180px] rounded-full border-[24px] border-[#F3F2F1] opacity-50 pointer-events-none" style={{ clipPath: 'circle(50% at 50% 50%)' }}></div>
                 <div className="border border-gray-200 bg-white/70 backdrop-blur-sm z-10 px-6 py-4 w-[90%] text-center text-[13px] text-gray-500 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                   No charges reported this month
                 </div>
             </div>
          </div>

          {/* Billing alerts */}
          <div className="bg-white border border-[#EDEBE9] p-5 shadow-sm col-span-1 rounded-sm">
             <h3 className="text-[13px] font-semibold mb-12">Billing alerts (0)</h3>
             <div className="flex flex-col items-center justify-center">
                 <div className="text-gray-400 flex items-center justify-center opacity-80 mb-6 drop-shadow-md">
                     <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50.6667 36L44 42.6667V50.6667H28L13.3333 36H50.6667Z" fill="#A19F9D" />
                        <path d="M12 24.0001V49.3334L26.6667 34.6667H49.3333V9.33337H12V24.0001Z" fill="#797775" />
                        <rect x="20" y="17.3334" width="20" height="2.66667" fill="white" />
                        <rect x="20" y="24" width="24" height="2.66667" fill="white" />
                     </svg>
                 </div>
                 <div className="text-[13px] text-gray-500">No billing alerts to display</div>
             </div>
          </div>
          
          <div className="bg-white border border-[#EDEBE9] p-5 shadow-sm col-span-1 rounded-sm">
             <h3 className="text-[13px] font-semibold">Shortcuts</h3>
          </div>
          <div className="bg-white border border-[#EDEBE9] p-5 shadow-sm col-span-2 rounded-sm">
             <h3 className="text-[13px] font-semibold">Credits remaining</h3>
          </div>

        </div>
      </div>
    </div>
  )
}
