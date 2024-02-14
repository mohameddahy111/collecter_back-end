import {AppError} from "../utils/AppError.js";
import {errorHandler} from "../utils/errorHandel.js";
import Cars from "./cars.schema.js";

export const addCar = errorHandler(async (req, res, next) => {
  const {name} = req.body;
  const isExist = await Cars.findOne({name: name});
  if (isExist) {
    return next(new AppError( "الاسم مستخدم", 401));
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
export const getAllCarDetails = errorHandler(async (req, res, next) => {
  const {id} =req.params
  const car = await Cars.findOne({_id : id}).populate([
    {path: "items", populate: {path: "items.createBy", select: "name"}},
    {path: "costs", populate: {path: "costs.createBy", select: "name"}},
  ]);
  res.send({car}).status(200);
});
export const updateCarInfo = errorHandler(async (req, res, next) => {
  const { id } = req.params
  const {name , drive_mony , drivier_name} = req.body
  const car = await Cars.findOne({ _id: id })
  if (car.name !== name ) {
    const find = await Cars.findOne({ name })
    if (find) {
    return  next(new AppError(  " الاسم مستخدم",401))
    }
  }
  car.name = name
  car.drive_mony = drive_mony
  car.drivier_name = drivier_name
  car.save()
res.send(car).status(200);

});


