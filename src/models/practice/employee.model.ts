import * as mongoose from "mongoose";
import { PracticeMongooseConnection } from "../../helpers/mongoose.connection";
interface IEmployee {
  name: string;
  type: string;
}
// const practiceConnection: mongoose.Mongoose = new PracticeMongooseConnection()
//   .connection;

// permitted -> String | Number | Date | Buffer | Boolean | Mixed | ObjectId | Array | Decimal128 | Map
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const EmployeeModel = mongoose.model<IEmployee & mongoose.Document>(
  "employees", // use plurals in lowercase
  employeeSchema
);

export default EmployeeModel;
