import * as express from "express";
import Airline from "./airline.interface";

class AirlineController {
  public path = "/airlines";
  public router = express.Router();

  private posts: Airline[] = [
    {
      company: "1AIR",
      flightId: "1A - 1211",
      PNR: "VAJB3Y",
      departureAirportCode: "ORD",
      departureTime: "15:00",
      arrivalAirportCode: "LGA",
      arrivalTime: "17:58",
      journeyDuration: "1h 58m",
    },
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllAirlines);
    this.router.post(this.path, this.createAirlineInfo);
  }

  public getAllAirlines = (
    request: express.Request,
    response: express.Response
  ) => {
    response.status(200);
    response.send(this.posts);
  };

  public createAirlineInfo = (
    request: express.Request,
    response: express.Response
  ) => {
    const post: Airline = request.body; // destructure
    this.posts.push(post);
    response.send(post);
  };
}

export default AirlineController;
