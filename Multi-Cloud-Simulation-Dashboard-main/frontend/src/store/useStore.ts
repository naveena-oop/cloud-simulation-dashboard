import { create } from 'zustand'

export type ResourceType = 'VM' | 'Storage' | 'Database'
export type ResourceStatus = 'Running' | 'Stopped' | 'Active' | 'Paused' | 'Terminated'

export interface Resource {
  id: string
  provider: 'AWS' | 'Azure' | 'GCP'
  type: ResourceType
  status: ResourceStatus
  name: string
  cpu?: number
  ram?: number
  size_gb?: number
  connections?: number
  cost_per_minute: number
  total_cost: number
}

export interface TerminalLog {
  id: string
  text: string
  isCommand: boolean
}

interface CloudStore {
  resources: Resource[]
  activeProvider: 'AWS' | 'Azure' | 'GCP' | 'All'
  terminalLogs: TerminalLog[]
  vmLogs: Record<string, TerminalLog[]>
  isTerminalOpen: boolean
  activeVMId: string | null
  setProvider: (provider: 'AWS' | 'Azure' | 'GCP' | 'All') => void
  setTerminalOpen: (isOpen: boolean) => void
  setActiveVM: (id: string | null) => void
  fetchResources: () => Promise<void>
  toggleResource: (id: string) => Promise<void>
  executeCommand: (provider: string, command: string) => Promise<void>
  executeVMCommand: (id: string, command: string) => Promise<void>
  clearTerminal: () => void
  clearVMLogs: (id: string) => void
  updateCosts: () => void
  createResource: (provider: 'AWS' | 'Azure' | 'GCP', name: string, type: ResourceType) => Promise<void>
  deleteResource: (id: string) => Promise<void>
}

const API_URL = 'http://localhost:8001'

export const useCloudStore = create<CloudStore>((set, get) => ({
  activeProvider: 'All',
  resources: [],
  terminalLogs: [],
  vmLogs: {},
  isTerminalOpen: false,
  activeVMId: null,
  setProvider: (provider: 'AWS' | 'Azure' | 'GCP' | 'All') => set({ activeProvider: provider }),
  setTerminalOpen: (isOpen: boolean) => set({ isTerminalOpen: isOpen }),
  setActiveVM: (id: string | null) => set({ activeVMId: id }),
  clearTerminal: () => set({ terminalLogs: [] }),
  clearVMLogs: (id: string) => set(state => ({ vmLogs: { ...state.vmLogs, [id]: [] } })),
  executeCommand: async (provider: string, command: string) => {
    const newCommandLog: TerminalLog = { id: crypto.randomUUID(), text: command, isCommand: true }
    set(state => ({ terminalLogs: [...state.terminalLogs, newCommandLog] }))
    try {
      const response = await fetch(`${API_URL}/resources/terminal/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, command })
      })
      const result = await response.json()
      const newResponseLog: TerminalLog = { id: crypto.randomUUID(), text: result.output, isCommand: false }
      set(state => ({ terminalLogs: [...state.terminalLogs, newResponseLog] }))
      if (result.success) {
        // refresh resources to reflect new mock-ups
        await get().fetchResources()
      }
    } catch (error) {
       const errorLog: TerminalLog = { id: crypto.randomUUID(), text: 'Connection to backend failed.', isCommand: false }
       set(state => ({ terminalLogs: [...state.terminalLogs, errorLog] }))
    }
  },
  executeVMCommand: async (id: string, command: string) => {
    const newCommandLog: TerminalLog = { id: crypto.randomUUID(), text: command, isCommand: true }
    set(state => ({ 
      vmLogs: { ...state.vmLogs, [id]: [...(state.vmLogs[id] || []), newCommandLog] } 
    }))
    try {
      const response = await fetch(`${API_URL}/resources/${id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      })
      const result = await response.json()
      const newResponseLog: TerminalLog = { id: crypto.randomUUID(), text: result.output || result.detail, isCommand: false }
      set(state => ({ 
        vmLogs: { ...state.vmLogs, [id]: [...(state.vmLogs[id] || []), newResponseLog] } 
      }))
    } catch (error) {
       const errorLog: TerminalLog = { id: crypto.randomUUID(), text: 'Connection to backend failed.', isCommand: false }
       set(state => ({ 
         vmLogs: { ...state.vmLogs, [id]: [...(state.vmLogs[id] || []), errorLog] } 
       }))
    }
  },
  fetchResources: async () => {
    try {
      const response = await fetch(`${API_URL}/resources/`)
      const data = await response.json()
      // Map backend data to frontend model
      const mappedResources = data.map((r: any): Resource => {
        const pIdStr = r.provider_id.split('-')[0].toLowerCase();
        const mappedProvider = pIdStr === 'aws' ? 'AWS' : pIdStr === 'gcp' ? 'GCP' : 'Azure';
        return {
          ...r,
          provider: mappedProvider,
          name: r.name,
          type: r.type as ResourceType,
          status: r.status as ResourceStatus,
          cost_per_minute: r.cost_per_unit,
          total_cost: 0 
        }
      })
      set({ resources: mappedResources })
    } catch (error) {
      console.error("Failed to fetch resources:", error)
    }
  },
  toggleResource: async (id: string) => {
    const resource = get().resources.find(r => r.id === id)
    if (!resource) return

    const action = resource.status === 'Running' || resource.status === 'Active' ? 'stop' : 'start'
    
    try {
      const response = await fetch(`${API_URL}/resources/${id}/${action}`, { method: 'POST' })
      if (response.ok) {
        const updatedResource = await response.json()
        set((state: CloudStore) => ({
          resources: state.resources.map(r => 
            r.id === id 
              ? { ...r, status: updatedResource.status } 
              : r
          )
        }))
      }
    } catch (error) {
      console.error(`Failed to ${action} resource:`, error)
    }
  },
  createResource: async (provider: 'AWS' | 'Azure' | 'GCP', name: string, type: ResourceType) => {
    try {
      const response = await fetch(`${API_URL}/resources/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider_id: `${provider.toLowerCase()}-pv-1`,
          name,
          type
        })
      })
      if (response.ok) {
        await get().fetchResources()
      }
    } catch (error) {
      console.error("Failed to create resource:", error)
    }
  },
  deleteResource: async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/resources/${id}`, { method: 'DELETE' })
      if (response.ok) {
        await get().fetchResources()
      }
    } catch (error) {
      console.error("Failed to delete resource:", error)
    }
  },
  updateCosts: () => set((state: CloudStore) => ({
    resources: state.resources.map(r => ({
      ...r,
      total_cost: (r.status === 'Running' || r.status === 'Active') 
        ? r.total_cost + r.cost_per_minute 
        : r.total_cost
    }))
  }))
}))
