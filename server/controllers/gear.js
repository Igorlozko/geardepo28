import Gear from "../models/Gear.js";
import tryCatch from "./utils/tryCatch.js";
import { v4 as uuidv4 } from 'uuid';


export const createGear = tryCatch(async(req, res)=>{
    const {id: uid, name: uName, photoURL: uPhoto} = req.user;
    const ugearId = uuidv4(); // Generate unique ID
    const newGear = Gear({
        ...req.body, 
        uid, 
        uName,
        uPhoto,
        ugearId
    });
    await newGear.save();
    res.status(201).json({ success: true, result: { ...newGear.toObject(), ugearId } });
});

export const getGears = tryCatch(async (req, res) =>{
    const gears = await Gear.find().sort({_id: -1 });
    res.status(200).json({success: true, result: gears });
});

export const deleteGear = tryCatch(async(req, res) =>{
    const {_id} = await Gear.findByIdAndDelete(req.params.gearId);
    res.status(200).json({success: true, result: {_id}});
});

export const updateGear = tryCatch(async(req, res)=>{
    const updatedGear = await Gear.findByIdAndUpdate(req.params.gearId, req.body, {new:true})
    res.status(200).json({success: true, result: updatedGear})
})