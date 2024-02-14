import mongoose from "mongoose";
const carsSchema = new mongoose.Schema(
  {
    name: {type: String, required: true , unique:true  } ,
    drivier_name: {type: String, required: true},
    drive_mony: {type: Number},
  },
  {timestamps: true, toJSON:{virtuals: true}, toObject:{virtuals: true}}
);

carsSchema.virtual("items", {
  ref: "Product",
  localField: "_id",
  foreignField:"car_id"
})
carsSchema.virtual("costs", {
  ref: "Cost",
  localField: "_id",
  foreignField:"car_id"
})

const Cars = mongoose.model("Cars", carsSchema);
export default Cars;
