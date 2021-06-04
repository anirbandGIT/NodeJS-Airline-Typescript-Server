import * as express from "express";
import IAirline from "../../interfaces/airlines/airline.interface";
import AirlineModel from "../../models/airlines/airline.model";

class AirlineController {
  private airline = AirlineModel;

  public path = "/airlines";
  public router = express.Router();

  //  MOCK
  // private airlines: IAirline[] = [
  //   {
  //     company: "1AIR",
  //     flightId: "1A - 1211",
  //     PNR: "VAJB3Y",
  //     departureAirportCode: "ORD",
  //     departureTime: "15:00",
  //     arrivalAirportCode: "LGA",
  //     arrivalTime: "17:58",
  //     journeyDuration: "1h 58m",
  //   },
  // ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllAirlines);
    this.router.get(`${this.path}/:id`, this.getAirlineById);
    this.router.post(this.path, this.createAirlineEntry);
    this.router.patch(`${this.path}/:id`, this.modifyAirlineEntry);
    this.router.delete(`${this.path}/:id`, this.deleteAirlineEntry);
  }

  public getAllAirlines = async (
    request: express.Request,
    response: express.Response
  ) => {
    //  MOCK
    // response.status(200);
    // response.send(this.airlines);

    try {
      const fetchedAirlineData = await this.airline.find();
      response.status(200);
      response.send(fetchedAirlineData);
    } catch (error) {
      response.status(404);
      response.send(error);
    }
  };

  private getAirlineById = async (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id;
    const fetchedAirlineDataById = await this.airline.findById(id);
    if (fetchedAirlineDataById) {
      response.status(200);
      response.send(fetchedAirlineDataById);
    }
  };

  public createAirlineEntry = async (
    request: express.Request,
    response: express.Response
  ) => {
    //  MOCK
    // const airline: IAirline = request.body; // destructure
    // this.airlines.push(airline);
    // response.send(airline);

    const airlineData: IAirline = request.body;

    const createdAirlineEntry = new this.airline(airlineData);
    const savedAirlineEntry = await createdAirlineEntry.save();
    // await savedAirlineEntry.populate('author', '-password').execPopulate();

    response.status(200);
    response.send(savedAirlineEntry);
  };

  private modifyAirlineEntry = async (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id;
    const updatedAirlineEntryData: IAirline = request.body;

    const updatedAirlineEntry = await this.airline.findByIdAndUpdate(
      id,
      updatedAirlineEntryData,
      { new: true }
    );
    if (updatedAirlineEntry) {
      response.status(200);
      response.send(updatedAirlineEntry);
    }
  };

  private deleteAirlineEntry = async (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id;

    const airlineEntryDelSuccessRes = await this.airline.findByIdAndDelete(id);

    if (airlineEntryDelSuccessRes) {
      response.send(200);
    } else {
      response.send(404);
    }
  };
}

export default AirlineController;
