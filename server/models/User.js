import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = Schema({
    name: { type: String, min: 2, max: 50, required: true },
    email: { type: String, min: 5, max: 50, required: true, unique: true, trim:true },
    password: { type: String, required: true },
    photoURL: { type: String, default: '' },
    role:{
        type:'String',
        default:'basic',
        enum:['basic', 'editor', 'admin']
    },
    active:{type: Boolean, default:true},
    renter:{type:Boolean, default:false}, // a renter field to assign only to people who have been manually verified
},
{timestamps: true}
);

const User = mongoose.model('users', userSchema);

export default User;
