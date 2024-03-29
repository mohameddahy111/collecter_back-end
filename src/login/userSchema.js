import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, },
    name: { type: String, required: true },
    password: { type: String, required: true },
    _isActive: { type: Boolean, default: false },
    
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
export default User