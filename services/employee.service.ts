import { InsertResult } from "typeorm";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import Address from "../entities/address.entity";
import { CreateAddressDto } from "../dto/create-address.dto";
import bcrypt from "bcrypt";
import httpException from "../exceptions/http.exception";
import { LoggerService } from "./logger.service";

class EmployeeService {
    private logger = LoggerService.getInstance(EmployeeService.name)

    constructor(private employeeRepository: EmployeeRepository) {}

    async getEmployeeByEmail(email: string): Promise<Employee | null> {
        this.logger.info("employee array returned")
        return this.employeeRepository.findOneByEmail(email);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findAll();
    }

    async getEmployeeByID(id: number): Promise<Employee> {
        let employee = await this.employeeRepository.findOneByID(id);
        if (!employee) {
            throw new httpException(400,"Employee not found");
        }
        return employee;
    }

    async createEmployee(
        name: string,
        email: string,
        age: number,
        address: CreateAddressDto,
        password: string,
        role: EmployeeRole
    ): Promise<Employee> {
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        const e = new Employee();
        e.name = name;
        e.email = email;
        e.age = age;
        e.address = newAddress;
        e.password = await bcrypt.hash(password, 10);
        e.role = role;

        return this.employeeRepository.create(e);
    }

    async deleteEmployeeByID(id: number): Promise<void> {
        //await this.employeeRepository.delete(id)
        const e = await this.employeeRepository.findOneByID(id);
        await this.employeeRepository.remove(e);
    }

    async updateEmployee(
        id: number,
        name: string,
        email: string,
        age: number,
        address: CreateAddressDto,
        password: string,
        role: EmployeeRole
    ): Promise<void> {
        const existingEmployee = await this.employeeRepository.findOneByID(id);
        if (existingEmployee) {
            const newAddress = new Address();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            const e = new Employee();
            e.name = name;
            e.email = email;
            e.age = age;
            e.address = newAddress;
            e.password = await bcrypt.hash(password, 10);
            e.role = role;
            await this.employeeRepository.update(id, e);
        }
    }
}

export default EmployeeService;
