import * as mongoose from "mongoose";
import IAirline from "../../interfaces/airlines/airline.interface";

const airlineSchema = new mongoose.Schema({
  company: String,
  flightId: String,
  PNR: String,
  departureAirportCode: String,
  departureTime: String,
  arrivalAirportCode: String,
  arrivalTime: String,
  journeyDuration: String,
});

const AirlineModel = mongoose.model<IAirline & mongoose.Document>(
  "airlines", // use plurals in lowercase
  airlineSchema
);

export default AirlineModel;
