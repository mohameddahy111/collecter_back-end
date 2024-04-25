import Cars from "../cars/cars.schema.js";
import {errorHandler} from "../utils/errorHandel.js";
import Product from "./product.schema.js";

export const addProdect = errorHandler(async (req, res, next) => {
  const {id} = req.params;
  const {name, price} = req.body;
  const findCar = await Product.findOne({car_id: id});
  if (!findCar) {
    const newProdect = new Product({
      car_id: id,
      createBy: req.userId,
      items: req.body
    });
    await newProdect.save();
    res.send({message: "تم اضافة منتج"}).status(200);
  } else {
    const isExist = findCar.items.filter((ele) => ele.name === name);
    const findProdect = isExist.find((ele) => ele.price === price);
    if (findProdect) {
      findProdect.width = findProdect.width + req.body.width;
      findProdect.count = findProdect.count + req.body.count;
      findCar.save();
      res.send({message: "تم تعديل منتج"}).status(200);
    } else {
      findCar.items.push(req.body);
      findCar.save();
      res.send({message: "تم اضافة منتج"}).status(200);
    }
  }
});
export const getAllProdect = errorHandler(async (req, res, next) => {
  const Prodects = await Product.find().populate([
    {path: "items.createBy", select: ["name"]}
  ]);
  res.send(Prodects).status(200);
});
export const getAllProdectDetails = errorHandler(async (req, res, next) => {
  const {id} = req.params;
  const {prodect_id} = req.body;
  const prodect = await Product.findOne({car_id: id}).populate([
    {path: "items.createBy", select: ["name"]}
  ]);
  const item = prodect.items.find((prodect) => prodect._id == prodect_id);
//  item.populated([{path: "createBy" , select:["name"]}])
  res.send({item}).status(200);
});
