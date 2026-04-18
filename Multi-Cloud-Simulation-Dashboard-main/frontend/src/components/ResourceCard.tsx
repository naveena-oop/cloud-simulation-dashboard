import React from 'react'
import { Resource, useCloudStore } from '../store/useStore'
import { Play, Pause, Power, Cpu, Database, HardDrive, BadgeCheck, Circle } from 'lucide-react'
import { cn, formatCurrency } from '../lib/utils'
import { motion } from 'framer-motion'

interface Props {
  resource: Resource
}

const ResourceCard: React.FC<Props> = ({ resource }) => {
  const { toggleResource } = useCloudStore()
  
  const isRunning = resource.status === 'Running' || resource.status === 'Active'

  const getIcon = () => {
    switch (resource.type) {
      case 'VM': return <Cpu className="text-blue-500" />
      case 'Database': return <Database className="text-emerald-500" />
      case 'Storage': return <HardDrive className="text-amber-500" />
    }
  }

  const getProviderColor = () => {
    switch (resource.provider) {
      case 'AWS': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      case 'Azure': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'GCP': return 'bg-red-500/10 text-red-500 border-red-500/20'
    }
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-card border rounded-xl p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-muted p-2 rounded-lg">
            {getIcon()}
          </div>
          <div>
            <h4 className="font-bold leading-tight">{resource.name}</h4>
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full border border-solid mt-1 inline-block uppercase font-bold", getProviderColor())}>
              {resource.provider}
            </span>
          </div>
        </div>
        <div className={cn(
          "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
          isRunning ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
        )}>
          <Circle size={8} fill="currentColor" className={isRunning ? "animate-pulse" : ""} />
          {resource.status}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {resource.type === 'VM' && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Config</span>
            <span className="font-medium">{resource.cpu} vCPU, {resource.ram} GB</span>
          </div>
        )}
        {resource.type === 'Storage' && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Capacity</span>
            <span className="font-medium">{resource.size_gb} GB</span>
          </div>
        )}
        {resource.type === 'Database' && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Active Conn</span>
            <span className="font-medium">{resource.connections}</span>
          </div>
        )}
        <div className="flex justify-between text-sm pt-2 border-t border-dashed">
          <span className="text-muted-foreground">Current Cost</span>
          <span className="font-bold text-primary">{formatCurrency(resource.total_cost)}</span>
        </div>
      </div>

      <button
        onClick={() => toggleResource(resource.id)}
        className={cn(
          "w-full py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all",
          isRunning 
            ? "bg-destructive/10 text-destructive hover:bg-destructive hover:text-white" 
            : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
        )}
      >
        {isRunning ? (
          <>
            <Power size={18} />
            Stop Resource
          </>
        ) : (
          <>
            <Play size={18} />
            Start Resource
          </>
        )}
      </button>
    </motion.div>
  )
}

export default ResourceCard
