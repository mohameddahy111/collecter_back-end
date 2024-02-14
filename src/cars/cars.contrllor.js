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
    {path: "items", populate: {path: "items.createBy", select: "name"}},
    {path: "costs", populate: {path: "costs.createBy", select: "name"}},
  ]);
  res.send({cars}).status(200);
});


