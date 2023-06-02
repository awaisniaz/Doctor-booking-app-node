import mongoose, { Schema } from "mongoose";
const client = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phone_no: {
        type: String
    }, city: {
        type: String
    },
    type: {
        type: String,
        default: 'user'
    },
    hospital: {
        type: String
    },
    hospital_phone_no: {
        type: String
    }, specialization: {
        type: Schema.Types.ObjectId,
        ref: 'Specialization'
    }

})

const specalization = new mongoose.Schema({
    name: String,
    doctor_id: String
})

const Client = mongoose.model('Client', client)
const Specialization = mongoose.model('Specialization', specalization)

export {
    Client, Specialization
}