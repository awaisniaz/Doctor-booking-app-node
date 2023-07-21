import mongoose, { Schema } from "mongoose";
const Hospitals = new mongoose.Schema({
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

})

const Hospital = mongoose.model('Hospital', Hospitals)

export {
    Hospital
}