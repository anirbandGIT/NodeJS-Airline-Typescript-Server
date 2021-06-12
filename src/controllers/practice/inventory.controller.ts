import * as express from "express";
import * as mongoose from "mongoose";
import InventoryModel from "../../models/practice/inventory.model";

class InventoryController {
  private inventory = InventoryModel;

  public path = "/practice";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    // ! INSERT
    this.router.post(`${this.path}/inventory/insert`, this.insert); // * Model.insert()
    this.router.post(`${this.path}/inventory/insertone`, this.insertOne); // * Model.insertOne()
    this.router.post(`${this.path}/inventory/insertmany`, this.insertMany); // * Model.insertMany()

    // ! QUERY
    // this.router.get(`${this.path}/inventory`, this.find); // * Model.find()
    // this.router.get(`${this.path}/inventory`, this.findOne); // * Model.findOne()
    this.router.get(`${this.path}/inventory/:id`, this.findById); // * Model.findById()
    // ! UPDATE
    // ! DELETE
  }

  // * Model.find()
  public find = async (
    request: express.Request,
    response: express.Response
  ) => {};

  // * Model.findOne()
  public findOne = async (
    request: express.Request,
    response: express.Response
  ) => {};

  //* Model.findById()
  public findById = async (
    request: express.Request,
    response: express.Response
  ) => {
    const employeeId = request.params.id;
  };

  // * Model.insert()
  // ! http://localhost:5000/api/practice/inventory/insert
  public insert = async (
    request: express.Request,
    response: express.Response
  ) => {
    const data = request.body;
    try {
      // * USING Model.create()
      // ! shortcut for saving one or more documents to the database.
      // ! MyModel.create(docs) does new MyModel(doc).save() for every doc in docs
      // const insertedInventory = await this.inventory.create({
      //   item: "canvas",
      //   qty: 100,
      //   tags: ["cotton"],
      //   size: { h: 28, w: 35.5, uom: "cm" },
      // });

      // ! during the insert, mongod will create the _id field and assign it a unique ObjectId()
      // ? db.inventory.insert( {
      // ? item: "canvas",
      // ? qty: 100,
      // ? tags: ["cotton"],
      // ? size: { h: 28, w: 35.5, uom: "cm" }} )

      // * USING Model.save()
      // const inventoryDataToSave = new InventoryModel({
      //   item: "canvas",
      //   qty: 100,
      //   tags: ["cotton"],
      //   size: { h: 28, w: 35.5, uom: "cm" },
      // });
      // const insertedInventory = await inventoryDataToSave.save();

      // * if not breaking it down in multiple lines
      const insertedInventory = await new InventoryModel({
        item: "canvas",
        qty: 100,
        tags: ["cotton"],
        size: { h: 28, w: 35.5, uom: "cm" },
      }).save();

      // TODO: CREATING A SEQUENCIAL ID
      // const id = mongoose.Types.ObjectId("1");
      // console.log("VALID", mongoose.Types.ObjectId.isValid(id));
      // const inventoryDataToSave = new InventoryModel({
      //   _id: "1",
      //   item: "canvas",
      //   qty: 100,
      //   tags: ["cotton"],
      //   size: { h: 28, w: 35.5, uom: "cm" },
      // });
      // const insertedInventory = await inventoryDataToSave.save();

      response.send(insertedInventory);
    } catch (error) {
      console.log(error);
    }
  };

  // * Model.insertOne()
  // ! http://localhost:5000/api/practice/inventory/insertone
  public insertOne = async (
    request: express.Request,
    response: express.Response
  ) => {
    const data = request.body;
    try {
      // * insertOne, updateOne, updateMany, deleteOne, deleteMany, replaceOne
      // ! bulkWrite(writes: any[], options?: CollectionBulkWriteOptions): Promise<BulkWriteOpResultObject>
      // ! send an Array
      const invertoryData = await this.inventory.bulkWrite([
        {
          insertOne: {
            document: {
              item: "canvas",
              qty: 100,
              tags: ["cotton"],
              size: { h: 28, w: 35.5, uom: "cm" },
            },
          },
        },
      ]);
      // ? db.inventory.insertOne(
      // ?{ item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } })

      // * now fetch and respond
      const insertedInventoryEntry = await this.inventory.find({
        item: "canvas",
      });
      // ? db.inventory.find( { item: "canvas" } )
      // response.send(invertoryData);
      response.send(insertedInventoryEntry);
    } catch (error) {
      console.log(error);
    }
  };

  // * Model.insertMany()
  // ! http://localhost:5000/api/practice/inventory/insertmany
  public insertMany = async (
    request: express.Request,
    response: express.Response
  ) => {
    const data = request.body;
    try {
      const fakeData = [
        {
          item: "journal",
          qty: 25,
          tags: ["blank", "red"],
          size: { h: 14, w: 21, uom: "cm" },
        },
        {
          item: "mat",
          qty: 85,
          tags: ["gray"],
          size: { h: 27.9, w: 35.5, uom: "cm" },
        },
        {
          item: "mousepad",
          qty: 25,
          tags: ["gel", "blue"],
          size: { h: 19, w: 22.85, uom: "cm" },
        },
      ];

      const insertedDataEntries = await this.inventory.insertMany(fakeData);
      // ? db.inventory.insertMany([
      // ? { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
      // ? { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
      // ? { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
      // ? ])
      response.send(insertedDataEntries);
    } catch (error) {
      console.log(error);
    }
  };
}

export default InventoryController;
