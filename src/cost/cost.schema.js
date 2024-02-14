import mongoose from "mongoose";

const costSchema = new mongoose.Schema({
  car_id: {type: mongoose.Types.ObjectId, ref: "Cars"},
  costs: [
    {
      createBy: {type: mongoose.Types.ObjectId, ref: "User"},
      name: {type: String, required: true},
      price: {type: Number, required: true},
      add_date: {type: String, default: new Date().toDateString()}
    }
  ],
  total_cost: {type: Number}
},{timestamps: true , toJSON:{virtuals : true}, toObject:{virtuals :true}});

const Cost = mongoose.model("Cost", costSchema);
export default Cost;
