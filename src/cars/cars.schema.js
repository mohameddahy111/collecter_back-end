import mongoose from "mongoose";
const carsSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    drivier_name: {type: String, required: true},
    // Payload: {type: mongoose.Types.ObjectId, ref: "Product"},
    cost: {type: String},
    drive_mony: {type: Number},
    totle_Price: {type: Number, default: 0},
    totle_Prodect_value: {type: Number, default: 0},
    totle_cost_value: {type: Number, default: 0},
    totle_width: {type: Number, default: 0}
  },
  {timestamps: true, toJSON:{virtuals: true}, toObject:{virtuals: true}}
);

carsSchema.virtual("items", {
  ref: "Product",
  localField: "_id",
  foreignField:"car_id"
})

const Cars = mongoose.model("Cars", carsSchema);
export default Cars;
