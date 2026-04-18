from typing import List, Dict, Any
from app.models import Resource, ResourceStatus, ResourceType
from datetime import datetime

class SimulationService:
    def __init__(self):
        # Initial mock resources for demonstration
        self.resources = {
            "1": {
                "id": "1", "provider_id": "aws-pv-1", "type": ResourceType.VM, 
                "status": ResourceStatus.RUNNING, "name": "ec2-web-server",
                "attributes": {"cpu": 2, "ram": 4}, "cost_per_unit": 0.005,
                "created_at": datetime.now(), "updated_at": datetime.now()
            },
            "2": {
                "id": "2", "provider_id": "aws-pv-1", "type": ResourceType.STORAGE, 
                "status": ResourceStatus.ACTIVE, "name": "s3-assets",
                "attributes": {"size_gb": 500}, "cost_per_unit": 0.0001,
                "created_at": datetime.now(), "updated_at": datetime.now()
            },
            "3": {
                "id": "3", "provider_id": "azure-pv-1", "type": ResourceType.VM, 
                "status": ResourceStatus.STOPPED, "name": "vm-worker-01",
                "attributes": {"cpu": 4, "ram": 8}, "cost_per_unit": 0.01,
                "created_at": datetime.now(), "updated_at": datetime.now()
            },
            "4": {
                "id": "4", "provider_id": "gcp-pv-1", "type": ResourceType.DATABASE, 
                "status": ResourceStatus.ACTIVE, "name": "cloud-sql-main",
                "attributes": {"connections": 120}, "cost_per_unit": 0.008,
                "created_at": datetime.now(), "updated_at": datetime.now()
            }
        }

    async def get_all_resources(self) -> List[Dict[str, Any]]:
        return list(self.resources.values())

    async def start_resource(self, resource_id: str) -> Dict[str, Any]:
        if resource_id in self.resources:
            self.resources[resource_id]["status"] = ResourceStatus.RUNNING
            self.resources[resource_id]["updated_at"] = datetime.now()
            return self.resources[resource_id]
        return {"id": resource_id, "status": ResourceStatus.RUNNING}

    async def stop_resource(self, resource_id: str) -> Dict[str, Any]:
        if resource_id in self.resources:
            self.resources[resource_id]["status"] = ResourceStatus.STOPPED
            self.resources[resource_id]["updated_at"] = datetime.now()
            return self.resources[resource_id]
        return {"id": resource_id, "status": ResourceStatus.STOPPED}

    async def update_usage_metrics(self, resource_id: str):
        pass

    async def create_resource(self, resource_data) -> Dict[str, Any]:
        import uuid
        new_id = str(uuid.uuid4())[:12]
        cost_per_unit = resource_data.cost_per_unit
        if cost_per_unit == 0.0:
            if resource_data.type == ResourceType.VM:
                cost_per_unit = 0.01
            elif resource_data.type == ResourceType.DATABASE:
                cost_per_unit = 0.015
            else:
                cost_per_unit = 0.005
                
        new_resource = {
            "id": new_id,
            "provider_id": resource_data.provider_id,
            "type": resource_data.type,
            "status": ResourceStatus.RUNNING,
            "name": resource_data.name,
            "attributes": resource_data.attributes,
            "cost_per_unit": cost_per_unit,
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
        self.resources[new_id] = new_resource
        return new_resource

    async def delete_resource(self, resource_id: str) -> bool:
        if resource_id in self.resources:
            del self.resources[resource_id]
            return True
        return False

    async def execute_vm_command(self, resource_id: str, command: str) -> str:
        if resource_id not in self.resources:
            return f"Error: Resource {resource_id} not found."
            
        res = self.resources[resource_id]
        if res.get("status") != ResourceStatus.RUNNING:
            return f"Error: Cannot execute command. Resource '{res.get('name')}' is currently {res.get('status')}."

        if res.get("type") != ResourceType.VM:
            return f"Error: Commands can only be executed on Virtual Machines. This is a {res.get('type')}."

        user = "root" if "aws" in res.get("provider_id", "").lower() else "azureuser" if "azure" in res.get("provider_id", "").lower() else "gcp-user"
        cmd = command.strip()

        if cmd.startswith("ping"):
            target = cmd.split(" ")[1] if len(cmd.split(" ")) > 1 else "8.8.8.8"
            return f"PING {target} (142.250.72.14) 56(84) bytes of data.\n64 bytes from {target}: icmp_seq=1 ttl=115 time=14.2 ms\n64 bytes from {target}: icmp_seq=2 ttl=115 time=12.1 ms\n64 bytes from {target}: icmp_seq=3 ttl=115 time=13.5 ms"
            
        elif cmd.startswith("ls"):
            return "bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var"
            
        elif cmd.startswith("whoami"):
            return user
            
        elif cmd.startswith("apt-get install") or cmd.startswith("yum install"):
            pkg = cmd.split(" ")[-1]
            return f"Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  {pkg}\n0 upgraded, 1 newly installed, 0 to remove and 4 not upgraded.\nSetting up {pkg} (1.0-1) ..."
            
        elif cmd.startswith("pwd"):
            return f"/home/{user}"
            
        elif cmd == "clear":
            return ""

        return f"bash: {cmd.split(' ')[0]}: command not found"

simulation_service = SimulationService()
