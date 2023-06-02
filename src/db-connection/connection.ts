import mongoose from "mongoose";
export const connect = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/Doctor-Booking-App').then(() => {
        console.log("Congratulations Successfully Connect With Database 🥰🥰🥰🥰🥰🥰🥰🥰")
    }).catch((err: Error) => {
        console.log(err.message)
    })

}

