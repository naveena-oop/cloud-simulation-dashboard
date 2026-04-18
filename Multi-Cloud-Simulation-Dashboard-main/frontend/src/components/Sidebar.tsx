import React from 'react'
import { useCloudStore } from '../store/useStore'
import { Cloud, Server, Database, BarChart3, LayoutDashboard, Settings, Layers, Plus } from 'lucide-react'
import { cn } from '../lib/utils'
import CreateInstanceModal from './CreateInstanceModal'

const Sidebar: React.FC = () => {
  const { activeProvider, setProvider } = useCloudStore()
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const providers = [
    { id: 'All', icon: LayoutDashboard },
    { id: 'AWS', icon: Server },
    { id: 'Azure', icon: Layers },
    { id: 'GCP', icon: Cloud },
  ] as const

  return (
    <div className="w-64 border-r bg-card flex flex-col">
      <div className="p-6 border-b flex items-center gap-3">
        <Server className="text-primary w-8 h-8" />
        <h1 className="font-bold text-xl tracking-tight">CloudSim</h1>
      </div>
      
      <div className="flex-1 p-4 flex flex-col gap-2">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors mb-4 shadow-sm"
        >
          <Plus size={18} />
          Create Instance
        </button>

        <p className="text-xs font-semibold text-muted-foreground uppercase px-3 py-2">Providers</p>
        {providers.map((p) => (
          <button
            key={p.id}
            onClick={() => setProvider(p.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              activeProvider === p.id 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                : "hover:bg-accent text-muted-foreground hover:text-foreground"
            )}
          >
            <p.icon size={20} />
            <span className="font-medium">{p.id}</span>
          </button>
        ))}

        <p className="text-xs font-semibold text-muted-foreground uppercase px-3 py-2 mt-6">Overview</p>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground">
          <BarChart3 size={20} />
          <span className="font-medium">Analytics</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground">
          <Database size={20} />
          <span className="font-medium">Resources</span>
        </button>
      </div>

      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent w-full transition-colors">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>

      {isModalOpen && <CreateInstanceModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default Sidebar
