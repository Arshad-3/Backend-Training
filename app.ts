import express from "express";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./loggerMiddleware";
import datasource from "./db/data-source";
import processTimeMiddleware from "./processTimeMiddleware";
import errorMiddleware from "./middlewares/error.middleware";
import authRouter from "./routes/auth.route";
import authMiddleware from "./middlewares/auth.middleware";
import { LoggerService } from "./services/logger.service";
import departmentRouter from "./routes/department.route";
import cors from 'cors'

const server = express();
const logger = LoggerService.getInstance("app()");


server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);
server.use(cors())
server.use("/employees",authMiddleware, employeeRouter);
server.use("/department",authMiddleware,departmentRouter)
server.use("/auth", authRouter);
server.use(errorMiddleware);



server.get("/", (req, res) => {
    res.status(200).send("hi");
});

const init = async () => {
    console.log("starting app.ts");
    try {
        await datasource.initialize();
        logger.info("connected to database training");

        server.listen(3000, () => {
            logger.info("server listening to 3000");
        });
    } catch {
        logger.error("Failed to connect");
        process.exit(1);
    }
};

init();
