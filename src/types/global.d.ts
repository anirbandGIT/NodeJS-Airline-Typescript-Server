import * as mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface Global {
      __DEFAULT_CONNECTION__: mongoose.Connection;
    }
  }
}
