import React, { useEffect, FC } from 'react'
import { useCloudStore } from './store/useStore'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import AWSConsole from './components/AWSConsole'
import AzurePortal from './components/AzurePortal'
import GCPConsole from './components/GCPConsole'
import TerminalWindow from './components/TerminalWindow'
import VMTerminalModal from './components/VMTerminalModal'
import { motion } from 'framer-motion'

const App: FC = () => {
  const { updateCosts, fetchResources, activeProvider } = useCloudStore()

  useEffect(() => {
    fetchResources()
    
    const interval = setInterval(() => {
      updateCosts()
    }, 60000) // Update costs every minute
    return () => clearInterval(interval)
  }, [updateCosts, fetchResources])

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans relative">
      {/* We keep the Sidebar so users can still transition between generic and specific views */}
      <Sidebar />
      
      <main className={`flex-1 overflow-y-auto ${activeProvider === 'All' ? 'p-8' : 'p-0'}`}>
        {activeProvider === 'AWS' && <AWSConsole />}
        {activeProvider === 'Azure' && <AzurePortal />}
        {activeProvider === 'GCP' && <GCPConsole />}
        {activeProvider === 'All' && (
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}>
            <Dashboard />
          </motion.div>
        )}
      </main>

      <TerminalWindow />
      <VMTerminalModal />
    </div>
  )
}

export default App
