from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class ResourceType(str, Enum):
    VM = "VM"
    STORAGE = "Storage"
    DATABASE = "Database"

class ResourceStatus(str, Enum):
    RUNNING = "Running"
    STOPPED = "Stopped"
    ACTIVE = "Active"
    PAUSED = "Paused"
    TERMINATED = "Terminated"

class ProviderBase(BaseModel):
    name: str
    regions: List[str]
    status: str = "Healthy"

class Provider(ProviderBase):
    id: str
    created_at: datetime

    class Config:
        orm_mode = True

class ResourceBase(BaseModel):
    name: str = "Unnamed Resource"
    provider_id: str
    type: ResourceType
    status: ResourceStatus = ResourceStatus.STOPPED
    attributes: Dict[str, Any] = {}
    cost_per_unit: float = 0.0

class ResourceCreate(ResourceBase):
    pass

class Resource(ResourceBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class LogBase(BaseModel):
    user_id: Optional[str]
    resource_id: Optional[str]
    action_type: str
    provider: str

class Log(LogBase):
    id: str
    timestamp: datetime

    class Config:
        orm_mode = True

class CostMetric(BaseModel):
    id: str
    resource_id: str
    date: str
    cost_amount: float
    cumulative_cost: float
    created_at: datetime

    class Config:
        orm_mode = True

class CostSummary(BaseModel):
    total_cost: float
    provider_breakdown: Dict[str, float]
    trend: List[Dict[str, Any]]
