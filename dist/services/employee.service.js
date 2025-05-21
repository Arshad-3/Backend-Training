"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const address_entity_1 = __importDefault(require("../entities/address.entity"));
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findAll();
        });
    }
    getEmployeeByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findOneByID(id);
        });
    }
    createEmployee(name, email, age, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAddress = new address_entity_1.default();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            const e = new employee_entity_1.default();
            e.name = name;
            e.email = email;
            e.age = age;
            e.address = newAddress;
            return this.employeeRepository.create(e);
        });
    }
    deleteEmployeeByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //await this.employeeRepository.delete(id)
            const e = yield this.employeeRepository.findOneByID(id);
            yield this.employeeRepository.remove(e);
        });
    }
    updateEmployee(id, name, email, age, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findOneByID(id);
            if (existingEmployee) {
                const newAddress = new address_entity_1.default();
                newAddress.line1 = address.line1;
                newAddress.pincode = address.pincode;
                const e = new employee_entity_1.default();
                e.name = name;
                e.email = email;
                e.age = age;
                e.address = newAddress;
                yield this.employeeRepository.update(id, e);
            }
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map