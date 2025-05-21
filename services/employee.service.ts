import { InsertResult } from "typeorm";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import Address from "../entities/address.entity";
import { CreateAddressDto } from "../dto/create-address.dto";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {
    }

    async getAllEmployees() : Promise<Employee[]> {
        return this.employeeRepository.findAll()
    }

    async getEmployeeByID(id : number) : Promise<Employee> {
        return this.employeeRepository.findOneByID(id)
    }

    async createEmployee(name:string , email : string , age:number , address:CreateAddressDto) : Promise<Employee> {
        const newAddress = new Address()
        newAddress.line1 = address.line1
        newAddress.pincode = address.pincode

        const e = new Employee()
        e.name = name
        e.email = email
        e.age = age
        e.address = newAddress
        return this.employeeRepository.create(e)
    }

    async deleteEmployeeByID(id:number) : Promise<void> {
        //await this.employeeRepository.delete(id)
        const e = await this.employeeRepository.findOneByID(id)
        await this.employeeRepository.remove(e)
    }



    async updateEmployee(id:number , name : string , email : string , age:number, address : CreateAddressDto) : Promise<void> {
        const existingEmployee = await this.employeeRepository.findOneByID(id)
        if (existingEmployee) {
            const newAddress = new Address()
            newAddress.line1 = address.line1
            newAddress.pincode = address.pincode
            const e = new Employee()
            e.name = name
            e.email = email
            e.age = age
            e.address = newAddress
            await this.employeeRepository.update(id, e)
        }
    }

}

export default EmployeeService
