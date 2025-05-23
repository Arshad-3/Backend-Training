import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";
import DepartmentRepository from "../repositories/department.repository";

class DepartmentService {
    constructor(private departmentRepository : DepartmentRepository){}

    async createDepartment(name:string , employees:Employee[]) : Promise<Department> {
        const department = new Department()
        department.name = name
        department.employees = employees
        return this.departmentRepository.create(department)
    }

    async getAllDepartments() : Promise<Department[]> {
        return this.departmentRepository.findAll()
    }

    async getEmployeesByDepartmentID (id:number) : Promise<Department> {
        const existingDepartment = await this.departmentRepository.findOneByID(id)
        if(existingDepartment) {
            return this.departmentRepository.findOneByID(id)
        }

        
    }

    async addEmployeeToDepartmentByID (id:number , employee:Employee) : Promise<Department> {
        const department = await this.departmentRepository.findOneByID(id)
        department.employees.push(employee)
        return this.departmentRepository.findOneByID(id)
    }

    async deleteDepartment (id:number) {
        await this.departmentRepository.delete(id)
    }

    async updateDepartment (id:number , name: string , employees : Employee[]) {
        const existingDepartment = await this.departmentRepository.findOneByID(id)
        if(existingDepartment){
            const department = new Department()
            department.name = name
            department.employees = employees
            await this.departmentRepository.update(id,department)
        }
    }
}

export default DepartmentService