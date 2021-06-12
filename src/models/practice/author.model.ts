import * as mongoose from "mongoose";

interface IAuthor {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  age: number;
  books: Array<mongoose.Schema.Types.ObjectId>;
}

// permitted -> String | Number | Date | Buffer | Boolean | Mixed | ObjectId | Array | Decimal128 | Map
const authorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "books" }],
});

const AuthorModel = mongoose.model<IAuthor & mongoose.Document>(
  "authors", // use plurals in lowercase
  authorSchema
);

export default AuthorModel;
