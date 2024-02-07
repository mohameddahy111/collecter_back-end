import {AppError} from "../utils/AppError.js";
import {errorHandler} from "../utils/errorHandel.js";
import Cars from "./cars.schema.js";

export const addCar = errorHandler(async (req, res, next) => {
  const {name} = req.body;
  const isExist = await Cars.findOne({name: name});
  if (isExist) {
    return next(new AppError({message:"الاسم مستخدم"}, 401));
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
    const { id } = req.params
    const {name} = req.body
    const fintItem = await Cars.findOne({ _id: id });
    fintItem.Payload.map(async(item) => {
        if (item.name != name) {
            const list = fintItem.Payload.push(req.body)
            await Cars.findByIdAndUpdate(id , {Payload : list} , {new: true})
        } else {
            
        }
    })

    
    res.send({fintItem}).status(200);
});

