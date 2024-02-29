import Reservation from '../models/Reservation.js'
import tryCatch from "./utils/tryCatch.js";
import { v4 as uuidv4 } from 'uuid';

// add the start nd end date 

export const createReservation  = tryCatch(async(req, res) =>{
    const { name:rName, photo:rPhoto,} = req.user // extracting info from the request 
    const resId = uuidv4(); // Generate UUID for reservation ID

    const newReservation = Reservation ({...req.body,resId,rName,rPhoto,})
    console.log("inside the cretaeReservation", req.user)
    console.log("inside the cretaeReservation", req.body)
    
    await newReservation.save() // save to the database 
    res.status(201).json({success:true, result: newReservation })
    console.log("printing the saved data", newReservation)
});

export const getReservedDates = async (req, res) => {
    try {
        const reservedDates = await Reservation.find({}, 'startDate endDate');
        res.json(reservedDates);
    } catch (error) {
        console.error('Error fetching reserved dates:', error);
        res.status(500).json({ message: 'Failed to fetch reserved dates.' });
    }
};

// when i remove the try catch it comes back as running server side but does not pass the authorization 




// issue here with id or user auth 
