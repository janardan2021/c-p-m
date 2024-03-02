import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phone: {type:String},
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
}, {timestamps: true})

const Client = mongoose.model("Client", ClientSchema)
export {Client}