import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';
import Gear from '../models/Gear.js';


export const register = tryCatch(async(req, res) =>{
        const {name, email, password} = req.body;
        if(password.lenght < 6) return res.status(400).json({success:false, message:"Password must be longer"})
        const emailLowerCase = email.toLowerCase();
        const existedUser = await User.findOne({email: emailLowerCase})
        if(existedUser) return res.status(400).json({success: false, message:'User already exists'})
        const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
        name,
        email:emailLowerCase,
        password:hashedPassword
    })
    const {_id:id, photoURL, role, active} = user // update the register and log in function 
    const token = jwt.sign({id, name, photoURL, role}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.status(201).json({success:true, result:{id, name, email:user.email, photoURL, token, role, active}});
});


export const login = tryCatch(async(req, res)=>{
    const { email, password,} = req.body;
        const emailLowerCase = email.toLowerCase();
        const existedUser = await User.findOne({email: emailLowerCase});

        if(!existedUser) 
        return res
            .status(404)
            .json({success: false, message:'User does not exist'})
        const correctPassword = await bcrypt.compare(password, existedUser.password); // check if the password is correct
        if(!correctPassword) return res.status(400).json({success:false, message:'Invalid credentails'})

    const {_id:id,name,photoURL, role, active} = existedUser;
    if(!active) return res.status(400).json({success:false, message:'Account suspended ! Contact Admin'})
    const token = jwt.sign({id, name, photoURL,role}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({success:true, result:{id, name, email:emailLowerCase, photoURL, token, role, active}});
});

export const updateProfile = tryCatch(async(req,res) =>{
    const fields = req.body?.photoURL ? {name:req.body.name, photoURL: req.body.photoURL} : {name:req.body.name}
    const updatedUser = await User.findByIdAndUpdate(req.user.id, fields, {new:true})
    const {_id:id, name, photoURL, role} = updatedUser

    // to update the gear records

    await Gear.updateMany({uid: id}, {uName: name, uPhoto: photoURL})

    const token = jwt.sign({id, name, photoURL, role}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({success:true, result:{name,photoURL,token}});
});

export const getUsers = tryCatch(async (req, res) =>{
    const users = await User.find().sort({_id: -1 });
    res.status(200).json({success: true, result: users });
});

export const updateStatus = tryCatch(async(req, res)=>{
    const {role, active,renter} = req.body // extract the role, active, and the renter from the req body
    await User.findByIdAndUpdate(req.params.userId, {role, active,renter}); // this updates the user model passing the new valuues
    res.status(200).json({success:true, result:{_id:req.params.userId}}) // send a response to the client side
});
