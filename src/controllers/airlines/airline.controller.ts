import * as express from "express";
import IAirline from "../../interfaces/airlines/airline.interface";
import AirlineModel from "../../models/airlines/airline.model";

import HttpException from "../../helpers/exceptions/http.exception";

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
    this.router.get(this.path, this.getAirlineEntries);
    this.router.get(`${this.path}/paginated`, this.getPaginatedAirlineEntries);
    this.router.get(`${this.path}/:id`, this.getAirlineById);
    this.router.post(this.path, this.createAirlineEntry);
    this.router.patch(`${this.path}/:id`, this.modifyAirlineEntry);
    this.router.delete(`${this.path}/:id`, this.deleteAirlineEntry);
  }

  public getAirlineEntries = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    //  MOCK
    // response.status(200);
    // response.send(this.airlines);
    try {
      const fetchedAirlineData = await this.airline.find();
      if (fetchedAirlineData.length !== 0) {
        response.status(200);
        response.json({
          data: fetchedAirlineData,
        });
      } else {
        next(new HttpException(404, "Airline data was not found"));
      }
    } catch (error) {
      response.status(404);
      response.send(error);
    }
  };

  public getPaginatedAirlineEntries = async (
    request: express.Request,
    response: express.Response
  ) => {
    let page: number = request.query.page
      ? Number.parseInt(request.query.page.toString())
      : 1;
    let limit: number = request.query.limit
      ? Number.parseInt(request.query.limit.toString())
      : 10;
    let skip: number = (page - 1) * limit; // calculated

    try {
      const fetchedAirlineData = await this.airline.find();

      let paginatedAirlineData = [];
      paginatedAirlineData = fetchedAirlineData;
      paginatedAirlineData = paginatedAirlineData.slice(skip, skip + limit);
      const totalPages: number = Math.ceil(fetchedAirlineData.length / limit);

      // send paginated data
      response.status(200);
      response.json({
        page: page,
        limit: limit,
        skip: skip,
        totalPages: totalPages,
        data: paginatedAirlineData,
      });
    } catch (error) {
      response.status(404);
      response.send(error);
    }
  };

  private getAirlineById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const fetchedAirlineDataById = await this.airline.findById(id);
    if (fetchedAirlineDataById) {
      response.status(200);
      response.send(fetchedAirlineDataById);
    } else {
      next(new HttpException(404, "Airline data was not found"));
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
