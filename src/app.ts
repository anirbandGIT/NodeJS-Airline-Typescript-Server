import * as express from "express";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express(); // const app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
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

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
