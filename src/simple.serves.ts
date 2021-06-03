import * as express from "express"; // need @types/express as dev dependency

const app = express();
const router = express.Router();

// logger middleware
const loggerMiddleware = (
  request: express.Request,
  response: express.Response,
  next
) => {
  console.log(
    `-> hostname: ${request.hostname}, path:${request.path}, method: ${request.method}`
  );
  next();
};
app.use(loggerMiddleware);
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello world!");
});

app.use("/api/v1", router);

app.listen(5000);
