import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";
import DepartmentService from "../services/department.service";

class DepartmentController {
    constructor(private departmentService : DepartmentService){}

    async getAllDepartments(req,res) {
        const departments : Department[] = await this.departmentService.getAllDepartments()

        res.status(200).send(departments)
    }

    async getEmployeesByDepartmentID (req,res) {
        const department = await this.departmentService.getEmployeesByDepartmentID(Number(req.params.id))
        
        const employees:Employee[] = department.employees
        res.status(200).send(employees)
    }
}