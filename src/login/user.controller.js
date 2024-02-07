import {errorHandler} from "../utils/errorHandel.js";
import User from "./userSchema.js";
import {AppError} from "../utils/AppError.js";
import jwt from "jsonwebtoken";

export const login = errorHandler(async (req, res, next) => {
  const {email, password} = req.body;
  const findEmail = await User.findOne({email: email});
  if (!findEmail) {
    return next(new AppError("البريد الاكتروني غير صحيح", 402));
  }
  if (findEmail.password !== password) {
    return next(new AppError(" كلمة المرور غير صحيح", 401));
  }
  await User.findByIdAndUpdate({_id: findEmail._id}, {_isActive: true});
  const token = jwt.sign({id: findEmail._id}, process.env.TOKEN);
  res.send({message: `مرحبا ${findEmail.name}`,user_info :findEmail, token}).status(200);
});

// add user
export const sigin = errorHandler(async (req, res, next) => {
  const {email} = req.body;
  const isExist = await User.findOne({email: email});
  if (isExist) {
    return next(new AppError(`البريد  الالكتروني مستخدم`, 401));
  }
  await User.insertMany(req.body);
  res.send({message: `تم اضافة مستخدم جديد`}).status(201);
});
