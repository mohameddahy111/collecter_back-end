import mongoose from "mongoose"


const connect = () => {
    mongoose.connect(process.env.MONGODB).then(() => {
        console.log("connect")
    })
}
export default connect