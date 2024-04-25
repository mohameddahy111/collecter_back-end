import Product from "../producte/product.schema.js";
import { AppError } from "../utils/AppError.js";
import {errorHandler} from "../utils/errorHandel.js";
import Sell from "./sell.schema.js";

 export const addSell = errorHandler(async (req, res, next) => {
  const {id} = req.params;
    const { product_id, price_sell, count_of_sell } = req.body;
    const carProductList = await Product.findOne({car_id:id})
    const item = carProductList.items.find((prodect) => prodect._id == product_id);

     const findSellList = await Sell.findOne({ car_id: id });
  if (!findSellList) {
    const newSell = new Sell({
      car_id: id,
      sells:req.body
    });
  await newSell.save()
    res.send({message: " تم اضافة عملية البيع" }).status(200);
  }
  else {
    const isExist = findSellList.sells.find((sell) => sell.producte_id == product_id);
      if (isExist) {
        if (item.count < isExist.count_of_sell+count_of_sell) {
          return  next(new AppError(`${item.count - isExist.count_of_sell}المتبقي `))
        }
        if (isExist.price_sell === price_sell) {
        isExist.count_of_sell = isExist.count_of_sell + count_of_sell;
        findSellList.save();
        res.send({message: " تم تعديل عملية البيع"}).status(200);
      } else {
        isExist.sells.push(req.body);
        findSellList.save();
        res.send({message: " تم اضافة عملية البيع"}).status(200);
      }
    } else {
        isExist.sells.push(req.body);
        findSellList.save();
        res.send({message: " تم اضافة عملية البيع"}).status(200);

    }
  }
});
