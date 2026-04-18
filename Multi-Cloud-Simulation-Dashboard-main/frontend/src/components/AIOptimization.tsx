import React from 'react'
import { Lightbulb, ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const AIOptimization: React.FC = () => {
  const suggestions = [
    { id: 1, title: 'Right-size Web Server', description: 'Switch ec2-web-server to t3.medium. Estimated savings: $14.20/mo', impact: 'High' },
    { id: 2, title: 'Idle Database', description: 'cloud-sql-main has had no traffic for 12 hours. Consider pausing.', impact: 'Medium' },
    { id: 3, title: 'Unused Storage', description: 's3-assets has 40% cold data. Move to Infrequent Access tier.', impact: 'Low' },
  ]

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Zap size={120} className="text-primary fill-primary" />
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
          <Lightbulb size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg">AI Cost Optimizer</h3>
          <p className="text-sm text-muted-foreground">Smart suggestions to reduce your cloud spend.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((s) => (
          <motion.div 
            key={s.id}
            whileHover={{ y: -5 }}
            className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
             <div className="flex justify-between items-start mb-2">
               <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                 s.impact === 'High' ? 'bg-emerald-500/10 text-emerald-600' : 
                 s.impact === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-blue-500/10 text-blue-600'
               }`}>
                 {s.impact} Impact
               </span>
             </div>
             <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{s.title}</h4>
             <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{s.description}</p>
             <div className="flex items-center text-xs font-bold text-primary group-hover:gap-2 transition-all">
               View Recommendation <ArrowRight size={14} className="ml-1" />
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AIOptimization
