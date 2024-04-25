import mongoose from "mongoose";

const sellSchema = new mongoose.Schema(
  {
    car_id: {type: mongoose.Types.ObjectId, ref: "Cars"},
    sells: [
      {
        producte_id: {type: mongoose.Types.ObjectId, ref: "Product"},
        count_of_sell: {type: Number},
        price_sell: {type: Number},
        // who_sell: { type: mongoose.Types.ObjectId, ref: "User" },
        total_price_sell: {type: Number}
      }
    ],
    total_sells: {type: Number}
  },
  {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}}
);

sellSchema.pre("save", function () {
  const tatal = 0;
  this.sells.forEach((items) => {
    items.total_price_sell = items.count_of_sell * items.price_sell;
    tatal = tatal + items.total_price_sell;
  });
  this.total_sells = tatal;
});
const Sell = mongoose.model("Sell", sellSchema);
export default Sell;
