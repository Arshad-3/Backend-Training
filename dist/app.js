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
const express_1 = __importDefault(require("express"));
const employee_route_1 = __importDefault(require("./routes/employee.route"));
const loggerMiddleware_1 = __importDefault(require("./loggerMiddleware"));
const data_source_1 = __importDefault(require("./db/data-source"));
const processTimeMiddleware_1 = __importDefault(require("./processTimeMiddleware"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(loggerMiddleware_1.default);
server.use(processTimeMiddleware_1.default);
server.use("/employees", employee_route_1.default);
server.use(error_middleware_1.default);
server.get("/", (req, res) => {
    res.status(200).send("hi");
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.default.initialize();
        console.log("connected to database training");
    }
    catch (_a) {
        console.error("Failed to connect");
        process.exit(1);
    }
    server.listen(3000, () => {
        console.log("server listening to 3000");
    });
});
init();
//# sourceMappingURL=app.js.map