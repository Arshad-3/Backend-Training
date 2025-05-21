import express from "express";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./loggerMiddleware";
import datasource from "./db/data-source";
import processTimeMiddleware from "./processTimeMiddleware";
import errorMiddleware from "./middlewares/error.middleware";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware)


server.use("/employees", employeeRouter);
server.use(errorMiddleware)

server.get("/" , (req,res) => {
  res.status(200).send("hi")
})

const init = async () => {
  try {
    await datasource.initialize();
    console.log("connected to database training");
  } catch {
    console.error("Failed to connect");
    process.exit(1);
  }

  server.listen(3000, () => {
    console.log("server listening to 3000");
  });
}

init();
