import * as mongoose from "mongoose";

interface IInventory {
  item: string;
  qty: number;
  tags: Array<any>;
  size: { h: number; w: number; uom: string };
}

// permitted -> String | Number | Date | Buffer | Boolean | Mixed | ObjectId | Array | Decimal128 | Map
const inventorySchema = new mongoose.Schema({
  item: String,
  qty: Number,
  tags: Array,
  size: { h: Number, w: Number, uom: String },
});

const InventoryModel = mongoose.model<IInventory & mongoose.Document>(
  "inventories", // use plurals in lowercase
  inventorySchema
);

export default InventoryModel;
