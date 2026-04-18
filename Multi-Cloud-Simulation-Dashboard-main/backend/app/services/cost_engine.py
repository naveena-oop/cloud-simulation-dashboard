from typing import Dict, List, Any
from app.models import Resource, ResourceStatus, ResourceType

class CostEngine:
    # Simulated cost rates (per minute)
    RATES = {
        "VM": 0.005,      # $0.005 per minute (~$0.3/hr)
        "Storage": 0.0001, # $0.0001 per GB per minute
        "Database": 0.008  # $0.008 per minute
    }

    async def calculate_cost(self, resource_type: str, status: str, duration_minutes: int, attributes: Dict[str, Any]) -> float:
        if status not in [ResourceStatus.RUNNING, ResourceStatus.ACTIVE]:
            # For Storage, cost might still apply even if "Stopped"
            if resource_type != "Storage":
                return 0.0
        
        base_rate = self.RATES.get(resource_type, 0.0)
        
        if resource_type == "Storage":
            size_gb = attributes.get("size_gb", 0)
            return base_rate * size_gb * duration_minutes
        
        return base_rate * duration_minutes

    async def get_ai_suggestions(self, resources: List[Dict[str, Any]]) -> List[Dict[str, str]]:
        suggestions = []
        for r in resources:
            if r["type"] == "VM" and r["status"] == ResourceStatus.RUNNING:
                # Simulated AI check: if running for too long or low usage (simplified)
                suggestions.append({
                    "resource_id": r["id"],
                    "title": f"Right-size {r['name']}",
                    "description": "This instance has consistently low CPU utilization. Switching to a t3.medium could save you $15/month.",
                    "impact": "High"
                })
            elif r["type"] == "Database" and r["status"] == ResourceStatus.ACTIVE:
                suggestions.append({
                    "resource_id": r["id"],
                    "title": "Enable Idle Shutdown",
                    "description": "Your database is active but has zero connections for the last 6 hours.",
                    "impact": "Medium"
                })
        return suggestions

cost_engine = CostEngine()
