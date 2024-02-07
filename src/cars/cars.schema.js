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
        add_date: {type: String, default: new Date()}
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
  this.totle_Prodect_value = this.Payload.reduce((a, c) => a + c.price, 0);
  this.totle_cost_value = this.cost.reduce((a, c) => a + c.price, 0);
  this.totle_width = this.Payload.reduce((a, c) => a + c.width, 0);
  this.totle_Price =this.totle_Prodect_value+ this.totle_cost_value 
});

const Cars = mongoose.model("Cars", carsSchema);
export default Cars;
