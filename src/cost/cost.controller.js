import {errorHandler} from "../utils/errorHandel.js";
import Cost from "./cost.schema.js";

export const addCost = errorHandler(async (req, res, next) => {
  const {id} = req.params;
  const {name, price} = req.body;
  const allCosts = await Cost.findOne({car_id: id});

  if (!allCosts) {
    const cost = new Cost({
      car_id: id,
      costs: req.body
    });
    cost.save();
    res.send({message: "تم اضافة تكلفة"}).status(200);
  } else {
    const isExist = allCosts.costs.find((x) => x.name == name);
    // const findItem = isExist.find(x=> x.price == price)
    if (isExist) {
      isExist.price = isExist.price + price;
      allCosts.save();
      res.send({message: "تم تعديل تكلفة"}).status(200);
    } else {
      allCosts.costs.push(req.body);
      allCosts.save();
      res.send({message: "تم اضافة تكلفة"}).status(200);
    }
  }
});
