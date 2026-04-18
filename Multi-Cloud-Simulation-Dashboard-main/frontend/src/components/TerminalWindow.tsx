import { useState, useRef, useEffect, FC, KeyboardEvent } from 'react'
import { Terminal as TerminalIcon, Trash, X } from 'lucide-react'
import { useCloudStore } from '../store/useStore'

const TerminalWindow: FC = () => {
  const { activeProvider, terminalLogs, executeCommand, clearTerminal, isTerminalOpen, setTerminalOpen } = useCloudStore()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLogs, isTerminalOpen])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(activeProvider, input.trim())
      setInput('')
    }
  }

  if (activeProvider === 'All' || !isTerminalOpen) return null

  // Determine starting hint based on provider
  let hintCmd = 'aws ec2 run-instances'
  if (activeProvider === 'Azure') hintCmd = 'az vm create'
  if (activeProvider === 'GCP') hintCmd = 'gcloud compute instances create'

  return (
      <div className="fixed bottom-0 right-10 w-[600px] h-[350px] bg-[#0f111a] text-emerald-400 font-mono text-sm p-4 rounded-t-xl shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-gray-800 border-b-0 flex flex-col z-50 transition-transform">
         <div className="flex justify-between items-center pb-3 border-b border-gray-800 mb-3 select-none">
            <div className="flex items-center gap-2 text-gray-400 font-sans text-xs uppercase tracking-wider font-bold">
               <TerminalIcon size={14} />
               <span>{activeProvider} Virtual Shell</span>
            </div>
            <div className="flex gap-4">
              <button onClick={clearTerminal} className="text-gray-500 hover:text-rose-400 transition-colors" title="Clear Terminal">
                 <Trash size={14} />
              </button>
              <button onClick={() => setTerminalOpen(false)} className="text-gray-500 hover:text-white transition-colors" title="Close Terminal">
                 <X size={16} />
              </button>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar flex flex-col">
            <div className="text-gray-500 mb-4">
              <span className="block mb-1">=== CloudSim Interactive Environment ===</span>
              Type commands to provision mock resources. <br/>
              Try: <code className="text-gray-400 bg-gray-800/50 px-1 py-0.5 rounded">{hintCmd}</code>
            </div>
            
            {terminalLogs.map(log => (
               <div key={log.id} className={log.isCommand ? "text-cyan-300 font-semibold mt-4" : "text-gray-300 whitespace-pre-wrap ml-4 opacity-90"}>
                  {log.isCommand && <span className="text-yellow-500 mr-2">{activeProvider.toLowerCase()}@cloudsim ~$</span>}
                  {log.text}
               </div>
            ))}
            
            <div className="flex items-center mt-4 group">
              <span className="text-yellow-500 mr-2 shrink-0">{activeProvider.toLowerCase()}@cloudsim ~$</span>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none flex-1 text-emerald-400 placeholder-gray-700 focus:ring-0 focus:outline-none"
                placeholder="execute..."
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} />
         </div>
      </div>
  )
}
export default TerminalWindow
