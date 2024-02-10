import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    car_id: {type: mongoose.Types.ObjectId, ref:"Cars"},
    items: [
      {
        createBy: {type: mongoose.Types.ObjectId, ref: "User"},
        name: {type: String, required: true},
        price: {type: Number, required: true},
        width: {type: Number},
        count: {type: Number},
        total: {type: Number},
        add_date: {type: String, default: new Date().toDateString()}
      }
    ],
    total_produce_value: {type: Number},
    total_produce_width: {type: Number}
  },
  {timestamps: true , toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.pre("save", function () {
  let price = 0;
  let width = 0;
  this.items.forEach((ele) => {
      ele.total = ele.width == 0 ? ele.price * ele.count : ele.price * ele.width;
      width = width + ele.width 
      price = price +ele.total
  });
    this.total_produce_value = price;
    this.total_produce_width = width
});

const Product = mongoose.model("Product", productSchema);
export default Product;
