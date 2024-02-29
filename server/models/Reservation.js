import mongoose from "mongoose";

// this is the model for the reservation 

const reservationSchema = mongoose.Schema({
    //urId:{type:String, required:true},
    resId:{type: String,required: false},
    rName:{type: String,required: false},
    rPhoto:{type: String,default: ''},
    ugearId:{type:String, default:false},
    gearId:{type:String, required: true},
    startDate:{type: String,required: true},
    endDate:{type: String,required: true},
    totalPrice:{type:Number,required:true},
    phone:{type: String,required: true},
    purpose: {type: String,required: true},
    addinfo:{type: String,required: true},
   // totalPrice:{type: Number,min:0, max:10000, default:0}
},
{timestamps:true}
)

// creating the model
const Reservation = mongoose.model('reservations', reservationSchema) // named colledction to reservations and passing shcema 

export default Reservation;