import mongoose, { Schema } from "mongoose";
const client = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"],
        immutable: true
    },
    password: {
        type: String,
        require: true
    },
    phone_no: {
        type: String,
        default: null
    }, city: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'user'
    },
    hospital: {
        type: String,
        default: null
    },
    hospital_phone_no: {
        type: String,
        default: null
    },
    treatment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialization'
    }]

})

const specalization = new mongoose.Schema({
    name: String,
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
})

const Client = mongoose.model('Client', client)
const Specialization = mongoose.model('Specialization', specalization)

export {
    Client, Specialization
}