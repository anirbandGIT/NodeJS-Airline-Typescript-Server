import * as mongoose from "mongoose";

export const createDefaultConnection = () => {
  // const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
  // global.__DEFAULT_CONNECTION__ = mongoose.createConnection(
  //   `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
  //   { useNewUrlParser: true, useUnifiedTopology: true } // resolve deprecations
  // );
  console.log(global.__DEFAULT_CONNECTION__);
};

// export const createPracticeConnection = () => {
//   const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
//   global.__DEFAULT_CONNECTION__ = mongoose.createConnection(
//     `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
//     { useNewUrlParser: true, useUnifiedTopology: true } // resolve deprecations
//   );
// };
