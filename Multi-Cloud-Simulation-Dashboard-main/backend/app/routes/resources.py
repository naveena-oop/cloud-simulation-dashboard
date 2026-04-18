from fastapi import APIRouter, HTTPException, Depends
from typing import List
from pydantic import BaseModel
from app.models import Resource, ResourceStatus, ResourceCreate
from app.services.simulation import simulation_service

router = APIRouter(prefix="/resources", tags=["Resources"])

@router.get("/", response_model=List[Resource])
async def get_resources():
    return await simulation_service.get_all_resources()

@router.post("/", response_model=Resource)
async def create_resource(resource: ResourceCreate):
    try:
        return await simulation_service.create_resource(resource)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{resource_id}")
async def delete_resource(resource_id: str):
    success = await simulation_service.delete_resource(resource_id)
    if not success:
        raise HTTPException(status_code=404, detail="Resource not found")
    return {"message": "Resource deleted successfully"}

@router.post("/{resource_id}/start")
async def start_resource(resource_id: str):
    try:
        return await simulation_service.start_resource(resource_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{resource_id}/stop")
async def stop_resource(resource_id: str):
    try:
        return await simulation_service.stop_resource(resource_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

class VMCommand(BaseModel):
    command: str

@router.post("/{resource_id}/execute")
async def execute_vm_command(resource_id: str, cmd_req: VMCommand):
    try:
        output = await simulation_service.execute_vm_command(resource_id, cmd_req.command)
        return {"output": output}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

class TerminalCommand(BaseModel):
    provider: str
    command: str

from app.services.terminal import terminal_interpreter

@router.post("/terminal/execute")
async def execute_terminal_command(command_req: TerminalCommand):
    try:
        output, success = await terminal_interpreter.execute(command_req.provider, command_req.command)
        return {"output": output, "success": success}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
