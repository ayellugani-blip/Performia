from fastapi import APIRouter, HTTPException
from app.database import supabase

router = APIRouter()


def _verify_employee_exists(employee_id: str):
    """Helper to check if an employee exists, raising 404 if missing."""
    try:
        emp_res = supabase.table("employees").select("id").eq("id", employee_id).execute()
        if not emp_res.data:
            raise HTTPException(
                status_code=404,
                detail=f"Employee with ID '{employee_id}' not found"
            )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Database error checking employee existence: {str(exc)}"
        )


@router.get("/employees", tags=["Employees"])
async def get_employees():
    """
    Fetch all employees from the Supabase `employees` table.
    Returns: id, name, department, role, manager, created_at
    """
    try:
        response = (
            supabase.table("employees")
            .select("id, name, department, role, manager, created_at")
            .execute()
        )
        return response.data
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching employees: {str(exc)}"
        )


@router.get("/employees/{employee_id}/performance", tags=["Employees"])
async def get_employee_performance(employee_id: str):
    """
    Fetch performance review records for a specific employee.
    Queries `performance_reviews` table.
    Returns: id, employee_id, q1, q2, q3, q4, pattern, created_at
    """
    _verify_employee_exists(employee_id)
    try:
        response = (
            supabase.table("performance_reviews")
            .select("id, employee_id, q1, q2, q3, q4, pattern, created_at")
            .eq("employee_id", employee_id)
            .execute()
        )
        return response.data
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching performance records: {str(exc)}"
        )


@router.get("/employees/{employee_id}/skills", tags=["Employees"])
async def get_employee_skills(employee_id: str):
    """
    Fetch skill records for a specific employee.
    Queries `employee_skills` table.
    """
    _verify_employee_exists(employee_id)
    try:
        response = (
            supabase.table("employee_skills")
            .select("*")
            .eq("employee_id", employee_id)
            .execute()
        )
        return response.data
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching skill records: {str(exc)}"
        )


@router.get("/employees/{employee_id}/goals", tags=["Employees"])
async def get_employee_goals(employee_id: str):
    """
    Fetch goal records for a specific employee.
    Queries `goals` table.
    """
    _verify_employee_exists(employee_id)
    try:
        response = (
            supabase.table("goals")
            .select("*")
            .eq("employee_id", employee_id)
            .execute()
        )
        return response.data
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching goal records: {str(exc)}"
        )


@router.get("/employees/{employee_id}/feedback", tags=["Employees"])
async def get_employee_feedback(employee_id: str):
    """
    Fetch feedback records for a specific employee.
    Queries `feedback` table.
    """
    _verify_employee_exists(employee_id)
    try:
        response = (
            supabase.table("feedback")
            .select("*")
            .eq("employee_id", employee_id)
            .execute()
        )
        return response.data
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching feedback records: {str(exc)}"
        )
