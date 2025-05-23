import jwt from "jsonwebtoken";
import JWTPayLoad from "../dto/jwt-payload.dto";
import httpException from "../exceptions/http.exception";
import EmployeeService from "./employee.service";
import bcrypt from "bcrypt";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";

class AuthService {
    constructor(private employeeService: EmployeeService) {}

    async login(email: string, password: string) {
        const employee = await this.employeeService.getEmployeeByEmail(email);
        if (!employee) {
            throw new httpException(404, "No such user");
        }
        const isPasswordValid = await bcrypt.compare(
            password,
            employee.password
        );
        if (!isPasswordValid) {
            throw new httpException(400, "Invalid Password");
        }

        const payload: JWTPayLoad = {
            id: employee.id,
            email: employee.email,
            role: employee.role,
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_VALIDITY,
        });
        return {
            tokenType: "Bearer",
            accessToken: token,
        };
    }
}

export default AuthService;
