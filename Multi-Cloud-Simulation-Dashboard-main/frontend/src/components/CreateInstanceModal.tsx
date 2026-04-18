import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useCloudStore, ResourceType } from '../store/useStore'

interface CreateInstanceModalProps {
  onClose: () => void
}

const CreateInstanceModal: React.FC<CreateInstanceModalProps> = ({ onClose }) => {
  const { createResource } = useCloudStore()
  
  const [provider, setProvider] = useState<'AWS' | 'Azure' | 'GCP'>('AWS')
  const [name, setName] = useState('')
  const [type, setType] = useState<ResourceType>('VM')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)
    await createResource(provider, name.trim(), type)
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card w-full max-w-md rounded-xl shadow-xl overflow-hidden border border-border">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-bold tracking-tight">Create Instance</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold block">Cloud Provider</label>
            <select 
              value={provider} 
              onChange={(e) => setProvider(e.target.value as any)}
              className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="AWS">Amazon Web Services (AWS)</option>
              <option value="Azure">Microsoft Azure</option>
              <option value="GCP">Google Cloud Platform (GCP)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold block">Instance Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., prod-web-server-01"
              required
              className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold block">Resource Type</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as any)}
              className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="VM">Virtual Machine (Compute)</option>
              <option value="Database">Database</option>
              <option value="Storage">Storage Bucket</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-input rounded-lg text-sm font-medium hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || !name.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Instance'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateInstanceModal
