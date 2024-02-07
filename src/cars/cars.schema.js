import mongoose from "mongoose";
const carsSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    drivier_name: {type: String, required: true},
    Payload: [
      {
        create_by: {type: mongoose.Types.ObjectId, ref: "User"},
        name: {type: String},
        width: {type: Number},
        price: {type: Number},
        count: {type: Number},
        totle: {type: Number},
        add_date: {type: String, default: new Date().toDateString()}
      }
    ],
    cost: [
      {
        create_by: {type: mongoose.Types.ObjectId, ref: "User"},
        name: {type: String},
        price: {type: Number}
      }
    ],
    drive_mony: {type: Number},
    totle_Price: {type: Number, default: 0},
    totle_Prodect_value: {type: Number, default: 0},
    totle_cost_value: {type: Number, default: 0},
    totle_width: {type: Number, default: 0}
  },
  {timestamps: true}
);

carsSchema.pre("save", function () {
  let price = 0;
  let count = 0;
  let width = 0;
    let cost = 0;
  this.Payload.forEach((ele) => {
    price = price + (ele.price * ele.width || ele.count);
    width = width + ele.width;
      count = count + ele.count;
    
  });
  this.cost.forEach((ele) => {
    cost = cost + ele.price;
  });

  this.totle_Prodect_value = price;
  this.totle_width = width;
  this.totle_Price = price + cost;
});

const Cars = mongoose.model("Cars", carsSchema);
export default Cars;
