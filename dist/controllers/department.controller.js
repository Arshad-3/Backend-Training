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
Object.defineProperty(exports, "__esModule", { value: true });
class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    getAllDepartments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const departments = yield this.departmentService.getAllDepartments();
            res.status(200).send(departments);
        });
    }
    getEmployeesByDepartmentID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentService.getEmployeesByDepartmentID(Number(req.params.id));
            const employees = department.employees;
            res.status(200).send(employees);
        });
    }
}
//# sourceMappingURL=department.controller.js.map