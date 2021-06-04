import * as express from "express";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express(); // const app = express();
    this.port = port;

    this.connectToTheDatabase();
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

  private connectToTheDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    // mongodb+srv://dev1:<password>@dev.eavd9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
      { useNewUrlParser: true, useUnifiedTopology: true } // resolve deprecations
    );
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is up, listening on port ${this.port}`);
    });
  }
}

export default App;
