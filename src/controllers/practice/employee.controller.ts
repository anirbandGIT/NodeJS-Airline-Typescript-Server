import * as express from "express";
import { QueryOptions } from "mongoose";
import EmployeeModel from "../../models/practice/employee.model";

class EmployeeController {
  private employee = EmployeeModel;

  public path = "/practice";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    // ! QUERY
    // this.router.get(`${this.path}/employee`, this.getEmployees); // * UNDERSTANDING QUERY
    // this.router.get(`${this.path}/employee`, this.find); // * Model.find()
    // this.router.get(`${this.path}/employee`, this.findOne); // * Model.findOne()
    this.router.get(`${this.path}/employee/:id`, this.findById); // * Model.findById()
  }

  // * UNDERSTANDING QUERY
  public getEmployees = async (
    request: express.Request,
    response: express.Response
  ) => {
    // * callback
    // this.employee.findOne(
    //   { name: "Jane Doe" }, // search by name === "Jane Doe"
    //   "name type", // select only the name and type properties, send "" for all
    //   {},
    //   (error, employee): any => {
    //     // error first callback
    //     if (error) {
    //       console.log(error);
    //       return;
    //     }
    //     response.send(employee);
    //   }
    // );

    // * another callback approach
    // const employeeDataQuery = this.employee.findOne({ name: "Jane Doe" });
    // employeeDataQuery.select("name type");

    // employeeDataQuery.exec((error, employee) => {
    //   if (error) {
    //     console.log(error);
    //     return;
    //   }
    //   response.send(employee);
    // });

    // // async-await
    // try {
    //   const employeeDataQuery = await this.employee.findOne({
    //     name: "Jane Doe",
    //   });
    //   response.send(employeeDataQuery);
    // } catch (error) {
    //   console.log(error);
    // }

    const employeeCallback = (error, employee): void => {
      if (error) {
        console.log(error);
        return;
      }
      response.send(employee);
    };

    // * querying with a JSON as before
    // this.employee
    //   .find({
    //     // occupation: /host/,
    //     // name: "Jane Doe",
    //     age: { $gt: 17, $lt: 60 },
    //     tag: { $in: ["RCM", "TTH"] },
    //   })
    //   .limit(2)
    //   .sort({ name: 1 }) // -1 for descending and 1 for ascending
    //   .select({ name: 1, type: 1, age: 1}) // { field : 1 } for selecting the field
    //   .exec(employeeCallback);

    // * the better querybuilder approach
    // ! USE THIS
    this.employee
      // .find({ occupation: /host/ })
      .where("name")
      .equals("Jane Doe") // name: "Jane Doe"
      .where("age") // age: {$gt: 17, $lt: 60}
      .gt(17)
      .lt(60)
      .where("tag") // tag: {$lt: ["TTH, "RCM]}
      .in(["TTH", "RCM"])
      .limit(2) // .limit(2)
      .sort("-name") // .sort({name: -1})
      .select("name type age") // select({name: 1, type: 1, age: 1})
      .exec(employeeCallback);
  };

  // * Model.find()
  public find = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      // ! USE THIS
      const employees = await this.employee
        .find()
        .where("age")
        .equals(18)
        .gt(18)
        .limit(10)
        .sort("-name")
        .select("name age");

      response.send(employees);
    } catch (error) {
      console.log(error);
    }
  };

  // * Model.findOne()
  public findOne = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const employee = await this.employee
        .findOne() // .findOne({nationality: {$eq: "USA"}}, "name nationality", {})
        .where("nationality")
        .equals("USA")
        .select("name nationality");

      response.send(employee);
    } catch (error) {
      console.log(error);
    }
  };

  //* Model.findById()
  public findById = async (
    request: express.Request,
    response: express.Response
  ) => {
    const employeeId = request.params.id;
    try {
      // ? If you use findOne(), you'll see that findOne(undefined) and
      // ? findOne({ _id: undefined }) are equivalent to findOne({}) and
      // ? return arbitrary documents.
      // ? However, mongoose translates findById(undefined) into findOne({ _id: null }).

      // ! here id is cast based on the Schema before sending the command.
      const employee = await this.employee
        .findById(employeeId) // equivalent to findOne({ _id: employeeId })
        .select("name nationality");

      response.send(employee);
    } catch (error) {
      console.log(error);
    }
  };
}

export default EmployeeController;
