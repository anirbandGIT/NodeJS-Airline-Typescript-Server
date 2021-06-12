import * as mongoose from "mongoose";

export default class DefaultMongooseConnection {
  constructor() {
    this.createDefaultConnection();
  }

  createDefaultConnection() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    // mongodb+srv://dev1:<password>@dev.eavd9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
      { useNewUrlParser: true, useUnifiedTopology: true } // resolve deprecations
    );
  }
}

export class PracticeMongooseConnection {
  connection: any;

  constructor() {
    this.createPracticeConnection();
  }

  createPracticeConnection() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    // mongodb+srv://dev1:<password>@dev.eavd9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    this.connection = mongoose.createConnection(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
      { useNewUrlParser: true, useUnifiedTopology: true } // resolve deprecations
    );
  }
}
