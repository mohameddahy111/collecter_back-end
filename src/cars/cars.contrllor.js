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
  const cars = await Cars.find().populate({
    path: "Payload.create_by",
    select: "name"
  });
  res.send({cars}).status(200);
});
export const addProdect = errorHandler(async (req, res, next) => {
  const {id} = req.params;
  const {name, price} = req.body;
  const findtItem = await Cars.findOne({_id: id});
  const isExist = findtItem.Payload.filter((x) => x.name == name);
  if (isExist.length == 0) {
    findtItem.Payload.push(req.body); 
    findtItem.save();
    res.send({message: "تم اضافة منتج"}).status(201);
  } else {
    const samePrice = isExist?.find((ele) => ele.price == price);
    if (samePrice) {
      samePrice.width = samePrice.width + req.body.width;
      samePrice.count = samePrice.count + req.body.count;
      findtItem.save();
    } else {
      findtItem.Payload.push(req.body);
      findtItem.save();
    }
    res.send({message: "تم تعديل المنتح"}).status(200);
  }
});
