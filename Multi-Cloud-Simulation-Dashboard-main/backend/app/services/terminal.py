import uuid
from typing import Dict, Any, Tuple
from datetime import datetime
from app.models import ResourceType, ResourceStatus
from app.services.simulation import simulation_service

class CommandInterpreter:
    async def execute(self, provider: str, command: str) -> Tuple[str, bool]:
        """
        Parses a command string, potentially creates a resource in the simulation,
        and returns a pair: (output_string, success_bool)
        """
        cmd_parts = command.strip().split()
        if not cmd_parts:
            return "No command provided.", False
        
        base_cmd = cmd_parts[0].lower()
        
        try:
            if provider.upper() == "AWS" and base_cmd == "aws":
                return await self._parse_aws(cmd_parts)
            elif provider.upper() == "AZURE" and base_cmd == "az":
                return await self._parse_azure(cmd_parts)
            elif provider.upper() == "GCP" and base_cmd == "gcloud":
                return await self._parse_gcp(cmd_parts)
            else:
                return f"Command '{base_cmd}' not recognized for provider {provider}.", False
        except Exception as e:
            return f"Error executing command: {str(e)}", False

    async def _create_simulated_resource(self, provider: str, r_type: ResourceType, name: str, cost: float, attrs: Dict[str, Any]) -> str:
        new_id = str(uuid.uuid4())[:8]
        new_resource = {
            "id": new_id,
            "provider_id": f"{provider.lower()}-pv-1",
            "type": r_type,
            "status": ResourceStatus.RUNNING,
            "name": name,
            "attributes": attrs,
            "cost_per_unit": cost,
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
        simulation_service.resources[new_id] = new_resource
        return f"Successfully created {r_type.value} '{name}' (ID: {new_id})."

    async def _parse_aws(self, parts: list[str]) -> Tuple[str, bool]:
        if len(parts) >= 3 and parts[1] == "ec2" and parts[2] == "run-instances":
            msg = await self._create_simulated_resource("AWS", ResourceType.VM, f"ec2-instance-{str(uuid.uuid4())[:4]}", 0.005, {"cpu": 2, "ram": 4})
            json_out = "{\n  'Instances': [\n    { 'InstanceId': 'i-0abcdef123', 'InstanceType': 't2.micro', 'State': {'Name': 'pending'} }\n  ]\n}\n"
            return json_out + msg, True
        
        elif len(parts) >= 3 and parts[1] == "dynamodb" and parts[2] == "create-table":
            msg = await self._create_simulated_resource("AWS", ResourceType.DATABASE, f"dynamo-table-{str(uuid.uuid4())[:4]}", 0.008, {"connections": 0})
            json_out = "{\n  'TableDescription': { 'TableName': 'NewTable', 'TableStatus': 'CREATING' }\n}\n"
            return json_out + msg, True
        
        return "Unknown AWS command. Try 'aws ec2 run-instances' or 'aws dynamodb create-table'.", False

    async def _parse_azure(self, parts: list[str]) -> Tuple[str, bool]:
        if len(parts) >= 3 and parts[1] == "vm" and parts[2] == "create":
            msg = await self._create_simulated_resource("Azure", ResourceType.VM, f"az-vm-{str(uuid.uuid4())[:4]}", 0.006, {"cpu": 2, "ram": 8})
            json_out = "{\n  'id': '/subscriptions/.../virtualMachines/newVM',\n  'provisioningState': 'Creating'\n}\n"
            return json_out + msg, True
        
        elif len(parts) >= 4 and parts[1] == "sql" and parts[2] == "db" and parts[3] == "create":
            msg = await self._create_simulated_resource("Azure", ResourceType.DATABASE, f"az-sqldb-{str(uuid.uuid4())[:4]}", 0.010, {"connections": 0})
            json_out = "{\n  'status': 'Accepted',\n  'name': 'newSqlDb'\n}\n"
            return json_out + msg, True
        
        return "Unknown Azure command. Try 'az vm create' or 'az sql db create'.", False

    async def _parse_gcp(self, parts: list[str]) -> Tuple[str, bool]:
        if len(parts) >= 4 and parts[1] == "compute" and parts[2] == "instances" and parts[3] == "create":
            msg = await self._create_simulated_resource("GCP", ResourceType.VM, f"gcp-vm-{str(uuid.uuid4())[:4]}", 0.005, {"cpu": 2, "ram": 4})
            return "Created [https://www.googleapis.com/compute/v1/projects/.../instances/new-vm].\n" + msg, True
        
        elif len(parts) >= 4 and parts[1] == "spanner" and parts[2] == "instances" and parts[3] == "create":
            msg = await self._create_simulated_resource("GCP", ResourceType.DATABASE, f"gcp-spanner-{str(uuid.uuid4())[:4]}", 0.012, {"connections": 0})
            return "Creating instance...done.\n" + msg, True
        
        return "Unknown GCP command. Try 'gcloud compute instances create' or 'gcloud spanner instances create'.", False

terminal_interpreter = CommandInterpreter()
