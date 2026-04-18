import { useState, useRef, useEffect, FC } from 'react'
import { Terminal as TerminalIcon, Trash, X } from 'lucide-react'
import { useCloudStore } from '../store/useStore'

const VMTerminalModal: FC = () => {
  const { resources, activeVMId, vmLogs, executeVMCommand, clearVMLogs, setActiveVM } = useCloudStore()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const activeVM = resources.find(r => r.id === activeVMId)
  const logs = activeVMId ? (vmLogs[activeVMId] || []) : []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs, activeVMId])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() && activeVMId) {
      executeVMCommand(activeVMId, input.trim())
      setInput('')
    }
  }

  if (!activeVMId || !activeVM) return null

  const promptUser = `${activeVM.provider.toLowerCase()}-user`
  const promptHost = activeVM.name

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[600px] bg-[#0f111a] text-emerald-400 font-mono text-sm rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-800 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
         <div className="flex justify-between items-center bg-[#1a1d27] px-4 py-3 border-b border-gray-800 select-none shrink-0">
            <div className="flex items-center gap-3 font-sans text-gray-300 font-bold tracking-wide">
               <TerminalIcon size={16} className="text-emerald-500" />
               <span>SSH Session: {activeVM.name} ({activeVM.provider})</span>
            </div>
            <div className="flex gap-4">
              <button onClick={() => clearVMLogs(activeVMId)} className="text-gray-500 hover:text-rose-400 transition-colors flex items-center gap-1" title="Clear Terminal">
                 <Trash size={14} /> <span className="font-sans text-xs uppercase hidden sm:inline">Clear</span>
              </button>
              <button onClick={() => setActiveVM(null)} className="text-gray-500 hover:text-white transition-colors ml-2" title="Close Terminal">
                 <X size={18} />
              </button>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar flex flex-col">
            <div className="text-gray-500 mb-6">
              <span className="block mb-1 font-bold text-gray-400">=== Connected to {activeVM.name} ===</span>
              OS: Simulated Linux Environment <br/>
              Try standard commands like <code className="text-gray-400 bg-gray-800/50 px-1 py-0.5 rounded">ping</code>, <code className="text-gray-400 bg-gray-800/50 px-1 py-0.5 rounded">ls</code>, <code className="text-gray-400 bg-gray-800/50 px-1 py-0.5 rounded">whoami</code>, or <code className="text-gray-400 bg-gray-800/50 px-1 py-0.5 rounded">apt-get install</code>.
            </div>
            
            {logs.map(log => (
               <div key={log.id} className={log.isCommand ? "text-cyan-300 mt-4" : "text-gray-300 whitespace-pre-wrap ml-2 opacity-90 leading-relaxed font-light"}>
                  {log.isCommand && <span className="text-yellow-500 mr-2 font-bold">{promptUser}@{promptHost}:~$</span>}
                  {log.text}
               </div>
            ))}
            
            <div className="flex items-center mt-4 group">
              <span className="text-yellow-500 mr-2 shrink-0 font-bold">{promptUser}@{promptHost}:~$</span>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none flex-1 text-emerald-400 placeholder-gray-700/50 focus:ring-0 focus:outline-none"
                placeholder="type a command..."
                autoFocus
                spellCheck={false}
                autoComplete="off"
                disabled={activeVM.status !== 'Running' && activeVM.status !== 'Active'}
              />
            </div>
            {activeVM.status !== 'Running' && activeVM.status !== 'Active' && (
              <div className="text-rose-500 mt-2 text-xs italic">
                Cannot execute commands while VM is {activeVM.status}.
              </div>
            )}
            <div ref={bottomRef} />
         </div>
      </div>
    </div>
  )
}

export default VMTerminalModal
