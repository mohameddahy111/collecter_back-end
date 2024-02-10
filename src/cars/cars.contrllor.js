import {AppError} from "../utils/AppError.js";
import {errorHandler} from "../utils/errorHandel.js";
import Cars from "./cars.schema.js";

export const addCar = errorHandler(async (req, res, next) => {
  const {name} = req.body;
  const isExist = await Cars.findOne({name: name});
  if (isExist) {
    return next(new AppError({message: "الاسم مستخدم"}, 401));
  }
  await Cars.insertMany(req.body);

  res.send({message: "تم اضافة براد جديد"}).status(201);
});

export const getAllCars = errorHandler(async (req, res, next) => {
  const cars = await Cars.find().populate([
    {path: "items", populate: {path: "items.createBy", select: "name"}}
  ]);
  res.send({cars}).status(200);
});
export const addCost = errorHandler(async (req, res, next) => {
  const {id} = req.params;
  const {name, price} = req.body;
  const findItem = await Cars.findById(id);
  const isExist = findItem.cost.find((ele) => ele.name === name);
  if (isExist) {
    isExist.price = isExist.price + price;
    findItem.save();
    res.send({message: "تم تعديل التكلفة"}).status(200);
  } else {
    findItem.cost.push(req.body);
    findItem.save();
    res.send({message: "تم اضافة التكلفة"}).status(200);
  }
});
