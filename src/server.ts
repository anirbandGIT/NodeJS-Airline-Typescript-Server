import App from "./app";
// controllers
import AirlinesController from "./controllers/airlines/airline.controller";

const app = new App([new AirlinesController()], 5000); // see constructor of App

app.listen(); // this.app.listen(this.port)
