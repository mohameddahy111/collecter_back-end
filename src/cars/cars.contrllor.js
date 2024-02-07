import {AppError} from "../utils/AppError.js";
import {errorHandler} from "../utils/errorHandel.js";
import Cars from "./cars.schema.js";

export const addCar = errorHandler(async (req, res, next) => {
  const {name} = req.body;
  const isExist = await Cars.findOne({name: name});
  if (isExist) {
    return next(new AppError("الاسم مستخدم", 401));
  }
  await Cars.insertMany(req.body);
  res.send("تم اضافة براد جديد").status(201);
});

export const getAllCars = errorHandler(async (req, res, next) => {
  const cars = await Cars.find().populate("Payload.create_by", {name: 1});
  res.send({cars}).status(200);
});
