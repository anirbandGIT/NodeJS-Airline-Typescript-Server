import * as express from "express";
import errorMiddleware from "./middlewares/exceptions/error.middleware";
import DefaultMongooseConnection, {
  PracticeMongooseConnection,
} from "./helpers/mongoose.connection";
import { createDefaultConnection } from "./helpers/connection";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express(); // const app = express();
    // console.log(".env PORT", port);
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    // ! Express runs all the middleware from the first -> last,
    // ! error handlers should be at the end of your app stack
    // ! passing the error to the next function, middleware in the chain will skip
    // ! go straight to the error handling middleware
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(this.loggerMiddleware);
  }

  private loggerMiddleware(
    request: express.Request,
    response: express.Response,
    next
  ) {
    console.log(
      `-> hostname: ${request.hostname}, path:${request.path}, method: ${request.method}`
    );
    next();
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  private connectToTheDatabase() {
    new DefaultMongooseConnection();
    // new PracticeMongooseConnection();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is up, listening on port ${this.port}`);
      console.log(`Visit: http://localhost:${this.port}/`);
    });
  }
}

export default App;
