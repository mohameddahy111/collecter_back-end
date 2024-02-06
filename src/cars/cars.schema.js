import mongoose from "mongoose";
const carsSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    drivier_name: {type: String, required: true},
    Payload: [
      {
        create_by: {type: mongoose.Types.ObjectId , ref :"User"},
        name: {type: String},
        width: {type: Number},
        price: {type: Number},
        count: {type: Number}
      }
    ],
    cost: [
        {
            create_by: {type: mongoose.Types.ObjectId , ref :"User"},
        name: {type: String},
        price: {type: Number}
      }
    ],
    drive_mony: {type: Number},
    totle_Price: {type: Number, default: 0},
    totle_width: {type: Number, default: 0}
  },
  {timestamps: true}
);

const Cars = mongoose.model("Cars", carsSchema);
export default Cars;
